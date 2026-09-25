#!/usr/bin/env bash
# Apply an Off Route image update to an EXISTING deployment.
#
# Ships inside offroute-update-*.tar.gz as ./apply-release.sh. It loads the packaged
# backend/frontend images and recreates ONLY those two containers. It never
# creates or modifies .env, never restarts MongoDB, and never re-seeds the admin.
#
# Usage: sudo ./apply-release.sh [--deploy-dir DIR] [--dry-run] [-y]
set -euo pipefail

pkg_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR=""
DRY_RUN=0
ASSUME_YES=0

c_blue=$'\033[1;34m'; c_green=$'\033[1;32m'; c_yellow=$'\033[1;33m'; c_red=$'\033[1;31m'; c_off=$'\033[0m'
log()  { printf '%s==>%s %s\n' "$c_blue" "$c_off" "$*"; }
info() { printf '    %s\n' "$*"; }
good() { printf '%s  OK%s %s\n' "$c_green" "$c_off" "$*"; }
warn() { printf '%swarn%s %s\n' "$c_yellow" "$c_off" "$*" >&2; }
die()  { printf '%serr %s %s\n' "$c_red" "$c_off" "$*" >&2; exit 1; }

run() {
  if (( DRY_RUN )); then printf '    [dry-run] %s\n' "$*"; return 0; fi
  "$@"
}

usage() {
  cat <<'EOF'
Apply an Off Route update package to an existing deployment.

Usage: apply-release.sh [options]

Options:
  --deploy-dir DIR   Directory holding the running stack (.env + docker-compose.yml).
                     Default: auto-detect.
  --dry-run          Show what would happen; change nothing.
  -y, --yes          Do not prompt.
  -h, --help         Show this help.

The .env is never created or modified. MongoDB is never restarted.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --deploy-dir)   DEPLOY_DIR="${2:?--deploy-dir needs a value}"; shift 2 ;;
    --deploy-dir=*) DEPLOY_DIR="${1#*=}"; shift ;;
    --dry-run)      DRY_RUN=1; shift ;;
    -y|--yes)       ASSUME_YES=1; shift ;;
    -h|--help)      usage; exit 0 ;;
    *) die "unknown option: $1 (try --help)" ;;
  esac
done

# ---- locate the deployment directory --------------------------------------
if [[ -z "$DEPLOY_DIR" ]]; then
  for cand in "$PWD" /home/ubuntu/kathmandu-night-run /home/ubuntu "$pkg_dir/.."; do
    if [[ -f "$cand/.env" && -f "$cand/docker-compose.yml" ]]; then DEPLOY_DIR="$cand"; break; fi
  done
fi
[[ -n "$DEPLOY_DIR" ]] || die "could not find a deployment directory (needs .env + docker-compose.yml). Pass --deploy-dir DIR."
DEPLOY_DIR="$(cd "$DEPLOY_DIR" && pwd)"
log "Deployment directory: $DEPLOY_DIR"

for f in .env docker-compose.yml; do
  [[ -f "$DEPLOY_DIR/$f" ]] || die "$DEPLOY_DIR/$f is missing — refusing to run (this is an update, not a fresh install)"
done

shopt -s nullglob
images=("$pkg_dir"/images/*.tar)
shopt -u nullglob
(( ${#images[@]} )) || die "no images/*.tar found next to apply-release.sh"
for i in "${images[@]}"; do [[ -s "$i" ]] || die "image archive is empty: $i"; done

command -v docker >/dev/null 2>&1 || die "docker not found in PATH"
docker compose version >/dev/null 2>&1 || die "docker compose v2 is not available"

compose=(docker compose -f "$DEPLOY_DIR/docker-compose.yml" --project-directory "$DEPLOY_DIR")

# ---- record state we promise not to change --------------------------------
env_before="$(sha256sum "$DEPLOY_DIR/.env" | awk '{print $1}')"
mongo_before="$("${compose[@]}" ps -q mongo 2>/dev/null || true)"

if (( ASSUME_YES == 0 )) && (( DRY_RUN == 0 )); then
  echo
  echo "About to load ${#images[@]} image archive(s) and recreate backend + frontend in:"
  echo "  $DEPLOY_DIR"
  printf 'Continue? [y/N] '
  read -r reply || reply=""
  [[ "$reply" == "y" || "$reply" == "Y" ]] || { echo "aborted."; exit 1; }
fi

# ---- load the new images --------------------------------------------------
log "Loading images"
for img in "${images[@]}"; do run docker load -i "$img"; done

# ---- recreate ONLY backend + frontend (mongo stays up) --------------------
log "Recreating backend + frontend (mongo untouched, no re-seed)"
run "${compose[@]}" up -d --no-build --no-deps backend frontend

# ---- wait for the API -----------------------------------------------------
if (( DRY_RUN == 0 )); then
  log "Waiting for the backend"
  ok=0
  for _ in $(seq 1 45); do
    if curl -fsS --max-time 3 http://127.0.0.1:5000/ >/dev/null 2>&1; then ok=1; break; fi
    sleep 2
  done
  (( ok )) && good "backend is responding" || warn "backend did not respond on 127.0.0.1:5000 within ~90s"
fi

# ---- verify ---------------------------------------------------------------
if (( DRY_RUN == 0 )); then
  log "Verifying"
  api="$(curl -fsS --max-time 5 http://127.0.0.1:5000/ 2>/dev/null || true)"
  [[ -n "$api" ]] && good "API: $api" || warn "API check failed"
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://127.0.0.1:5000/api/events 2>/dev/null || true)"
  [[ "$code" == "200" ]] && good "/api/events -> 200" || warn "/api/events -> ${code:-no response}"
  fe="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://127.0.0.1:8080/ 2>/dev/null || true)"
  [[ "$fe" == "200" ]] && good "frontend -> 200" || warn "frontend -> ${fe:-no response}"
fi

# ---- prove the promises ---------------------------------------------------
env_after="$(sha256sum "$DEPLOY_DIR/.env" | awk '{print $1}')"
if [[ "$env_before" == "$env_after" ]]; then
  good ".env unchanged (sha256 ${env_before:0:12}...)"
else
  die ".env changed unexpectedly — investigate immediately"
fi

if (( DRY_RUN == 0 )); then
  mongo_after="$("${compose[@]}" ps -q mongo 2>/dev/null || true)"
  if [[ -n "$mongo_before" && "$mongo_before" == "$mongo_after" ]]; then
    good "mongo container untouched"
  else
    warn "mongo container id changed (or could not be read) — verify manually"
  fi
fi

log "Done"
info "Package applied from: $pkg_dir"
info "Logs: cd $DEPLOY_DIR && docker compose logs -f backend frontend"
