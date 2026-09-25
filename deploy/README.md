# Off Route — production release tooling

Scripts for building and rolling out application updates to the Off Route
production server (`https://offroute.run`).

This is an **update-only** workflow. The server is already provisioned (host
nginx + certbot, Docker, and the `offroute` compose stack).

## Files

- `scripts/build-release-package.sh` — run on your machine (needs Docker):
  builds the app images and packs a release tarball.
- `scripts/apply-release.sh` — ships inside the tarball; runs on the server to
  load the images and recreate the application containers.

Package contents: `images/backend.tar`, `images/frontend.tar`,
`apply-release.sh`, `README.md`, `MANIFEST`.

## Requirements

- **Build machine:** Docker running, and this branch (`release/prod-build`)
  checked out.
- **Server:** SSH access as `ubuntu` (e.g. `ubuntu@13.207.79.10`), Docker with
  the compose plugin, and the stack already running.
- **Architecture:** the server is `amd64` (AWS EC2), so the images must be built
  for `linux/amd64`. The build script targets this by default, so even an Apple
  silicon (M-series) laptop produces correct images.

## 1. Build the release package (local)

```bash
# from the repository root, on release/prod-build
./deploy/scripts/build-release-package.sh
```

Produces `offroute-release-<YYYYMMDD-HHMM>.tar.gz` in the repository root
(~100 MB). It does **not** include MongoDB, the source tree, or `.env`.

Flags:

- `--platform P` — target platform for the images (default `linux/amd64`, which
  is what the AMD64 server needs).
- `--skip-build` — package the existing `offroute-backend:latest` /
  `offroute-frontend:latest` images without rebuilding (fast iteration).
- `--out FILE` — choose the output path.
- `--keep` — keep the staging directory for inspection.

## 2. Copy it to the server

```bash
rsync -av offroute-release-*.tar.gz ubuntu@13.207.79.10:/home/ubuntu/kathmandu-night-run/
```

## 3. Extract and apply on the server

```bash
ssh ubuntu@13.207.79.10
cd ~/kathmandu-night-run
tar xzf offroute-release-*.tar.gz
cd offroute-release
sudo ./apply-release.sh --deploy-dir ~/kathmandu-night-run
```

- Preview without changing anything: `sudo ./apply-release.sh --dry-run`
- Skip the confirmation prompt: `sudo ./apply-release.sh -y`

## What apply-release.sh does

1. Verifies the deploy directory has `.env` and `docker-compose.yml` — it
   aborts otherwise. This is an update, never a fresh install.
2. `docker load` the packaged backend and frontend images.
3. `docker compose up -d --no-build --no-deps backend frontend` — recreates
   **only** those two services.
4. Waits for the API, then checks `/`, `/api/events`, and the frontend.
5. Confirms `.env` is byte-for-byte unchanged (sha256 before/after) and that
   the mongo container was not recreated.


> [!NOTE]
> - The production `.env` is **never** created or modified.
> - MongoDB is **never** restarted; its data volume is untouched.
> - The admin account is **never** re-seeded.

## Verify after a rollout

```bash
curl -fsS https://offroute.run/ >/dev/null && echo "site OK"
curl -fsS https://offroute.run/api/events >/dev/null && echo "api OK"
cd /home/ubuntu/kathmandu-night-run && docker compose ps
```

## Logs

```bash
cd /home/ubuntu/kathmandu-night-run
docker compose logs -f backend frontend
```
