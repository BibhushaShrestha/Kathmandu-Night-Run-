#!/usr/bin/env bash
# Build an UPDATE package for an already-running Off Route deployment.
#
# The package carries new application images plus a small apply-release.sh and a
# README.md. It deliberately does NOT contain mongo (unchanged on updates),
# does NOT contain .env, and its apply-release.sh never creates or modifies the
# production .env.
#
# Run on a machine with Docker (e.g. your work laptop):
#   ./deploy/scripts/build-release-package.sh
#
# Output: <repo>/offroute-release-<stamp>.tar.gz
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/../.." && pwd)"
compose_file="$repo_root/docker-compose.yml"

OUT_FILE=""
SKIP_BUILD=0
KEEP_STAGE=0
STAMP="$(date +%Y%m%d-%H%M)"
STAGE="$repo_root/.release-package"
PLATFORM="linux/amd64"

c_blue=$'\033[1;34m'; c_green=$'\033[1;32m'; c_yellow=$'\033[1;33m'; c_red=$'\033[1;31m'; c_off=$'\033[0m'
log()  { printf '%s==>%s %s\n' "$c_blue" "$c_off" "$*"; }
info() { printf '    %s\n' "$*"; }
good() { printf '%s  OK%s %s\n' "$c_green" "$c_off" "$*"; }
warn() { printf '%swarn%s %s\n' "$c_yellow" "$c_off" "$*" >&2; }
die()  { printf '%serr %s %s\n' "$c_red" "$c_off" "$*" >&2; exit 1; }

usage() {
  cat <<'EOF'
Build an Off Route UPDATE package (application images only).

Usage: build-release-package.sh [options]

Options:
  --out FILE      Output tarball path (default: <repo>/offroute-release-<stamp>.tar.gz)
  --skip-build    Package the existing offroute-*-:latest images (no rebuild)
  --platform P    Target platform for the images (default: linux/amd64)
  --keep          Keep the staging directory after packing
  -h, --help      Show this help

The package contains:
  images/backend.tar   images/frontend.tar   apply-release.sh   README.md   MANIFEST
It does NOT contain mongo, .env, or the source tree.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --out)          OUT_FILE="${2:?--out needs a value}"; shift 2 ;;
    --out=*)        OUT_FILE="${1#*=}"; shift ;;
    --skip-build)   SKIP_BUILD=1; shift ;;
    --platform)     PLATFORM="${2:?--platform needs a value}"; shift 2 ;;
    --platform=*)   PLATFORM="${1#*=}"; shift ;;
    --keep)         KEEP_STAGE=1; shift ;;
    -h|--help)      usage; exit 0 ;;
    *) die "unknown option: $1 (try --help)" ;;
  esac
done

[[ -f "$compose_file" ]] || die "docker-compose.yml not found at $compose_file (run from within the repo)"
command -v docker >/dev/null 2>&1 || die "docker not found in PATH"
docker compose version >/dev/null 2>&1 || die "docker compose v2 is not available"

commit="$(git -C "$repo_root" rev-parse --short HEAD 2>/dev/null || echo unknown)"
branch="$(git -C "$repo_root" rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
if [[ "$branch" != "release/prod-build" ]]; then
  warn "current branch is '$branch' (expected 'release/prod-build') — packaging anyway"
fi
if [[ -n "$(git -C "$repo_root" status --porcelain 2>/dev/null)" ]]; then
  warn "working tree has uncommitted changes — the images will include them"
fi

log "Building application images"
if (( SKIP_BUILD )); then
  info "--skip-build: using existing offroute-backend:latest / offroute-frontend:latest"
else
  ( cd "$repo_root" && DOCKER_DEFAULT_PLATFORM="$PLATFORM" docker compose build backend frontend )
fi
for img in offroute-backend:latest offroute-frontend:latest; do
  docker image inspect "$img" >/dev/null 2>&1 || die "image $img not found — run without --skip-build"
done

# the images must match the target platform (e.g. an M4 Mac must build linux/amd64 for the VM)
for img in offroute-backend:latest offroute-frontend:latest; do
  actual="$(docker image inspect -f '{{.Os}}/{{.Architecture}}' "$img" 2>/dev/null || echo unknown)"
  if [[ "$actual" == "$PLATFORM" ]]; then
    good "$img -> $actual"
  elif (( SKIP_BUILD )); then
    warn "$img is $actual, expected $PLATFORM — packaging the existing images anyway"
  else
    die "$img is $actual but --platform is $PLATFORM"
  fi
done

log "Staging the package"
rm -rf "$STAGE"
pkg="$STAGE/offroute-release"
mkdir -p "$pkg/images"

docker save offroute-backend:latest -o "$pkg/images/backend.tar"
good "images/backend.tar ($(du -h "$pkg/images/backend.tar" | cut -f1))"
docker save offroute-frontend:latest -o "$pkg/images/frontend.tar"
good "images/frontend.tar ($(du -h "$pkg/images/frontend.tar" | cut -f1))"

install -m 0755 "$repo_root/deploy/scripts/apply-release.sh" "$pkg/apply-release.sh"

arch="$(docker info --format '{{.Architecture}}' 2>/dev/null || echo unknown)"
be_id="$(docker image inspect -f '{{.Id}}' offroute-backend:latest 2>/dev/null || echo unknown)"
fe_id="$(docker image inspect -f '{{.Id}}' offroute-frontend:latest 2>/dev/null || echo unknown)"

cat > "$pkg/MANIFEST" <<EOF
package      : offroute-release
created      : $(date -u +%Y-%m-%dT%H:%M:%SZ)
git branch   : $branch
git commit   : $commit
build arch   : $arch
target plat  : $PLATFORM
backend image: offroute-backend:latest  $be_id
frontend img : offroute-frontend:latest $fe_id
EOF

cat > "$pkg/README.md" <<'EOF'
# Off Route — update package

Applies new application code to an **already-running** Off Route deployment.
It swaps the backend/frontend images and recreates those two containers.
It does **not** touch the production `.env`, does **not** restart MongoDB,
and does **not** re-seed the admin.

Built from branch `__BRANCH__` at commit `__COMMIT__` for `__PLATFORM__`.

## Apply on the server

```bash
# 1. copy the tarball into the deployment directory on the server:
#    rsync -av offroute-release-*.tar.gz ubuntu@13.207.79.10:~/kathmandu-night-run/

# 2. on the server, extract it in that same directory:
ssh ubuntu@13.207.79.10
cd ~/kathmandu-night-run
tar xzf offroute-release-*.tar.gz
cd offroute-release

# 3. apply (run with sudo if docker requires it)
sudo ./apply-release.sh --deploy-dir ~/kathmandu-night-run
```

`apply-release.sh` finds the running stack automatically — a directory containing
`.env` and `docker-compose.yml`, searched in the current directory,
`/home/ubuntu/kathmandu-night-run`, and `/home/ubuntu`. To point it explicitly:

```bash
sudo ./apply-release.sh --deploy-dir /home/ubuntu/kathmandu-night-run
```

Preview without changing anything:

```bash
./apply-release.sh --dry-run
```

## What it does

1. Verifies the deployment directory has a `.env` (aborts if not — this is an
   update, never a fresh install). The `.env` is never modified.
2. `docker load` the packaged `backend` and `frontend` images.
3. `docker compose up -d --no-build --no-deps backend frontend` — recreates only
   those two services; MongoDB and its data volume are left untouched.
4. Waits for the API and checks `/` and `/api/events`.
5. Confirms the `.env` is byte-for-byte unchanged and the mongo container was
   not recreated.

## Notes

- The images target **__PLATFORM__**; the server must match this architecture.
- If you change `docker-compose.yml` itself, update that file on the server
  separately — this package ships images only.
EOF

sed -i.bak \
  -e "s|__BRANCH__|$branch|g" \
  -e "s|__COMMIT__|$commit|g" \
  -e "s|__PLATFORM__|$PLATFORM|g" \
  "$pkg/README.md"
rm -f "$pkg/README.md.bak"

log "Packing the tarball"
[[ -n "$OUT_FILE" ]] || OUT_FILE="$repo_root/offroute-release-$STAMP.tar.gz"
( cd "$STAGE" && tar czf "$OUT_FILE" offroute-release )
(( KEEP_STAGE )) || rm -rf "$STAGE"

good "package written: $OUT_FILE ($(du -h "$OUT_FILE" | cut -f1))"
echo
echo "Transfer it to the server, then:"
echo "  tar xzf $(basename "$OUT_FILE") && cd offroute-release && sudo ./apply-release.sh"
