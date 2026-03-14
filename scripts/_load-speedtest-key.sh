#!/bin/zsh

# Helper script to manage Speedtest Tracker APP_KEY
# Generates on first run, reuses on subsequent runs, cleaned by clean.sh

# Navigate to project root (scripts are in PROJECT_ROOT/scripts/)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

KEY_FILE=".speedtest-app-key"

if [[ ! -f "$KEY_FILE" ]]; then
    export APP_KEY="base64:$(openssl rand -base64 32)"
    echo "$APP_KEY" > "$KEY_FILE"
    echo "🔐 Generated new Speedtest Tracker key and stored in $KEY_FILE"
else
    export APP_KEY=$(cat "$KEY_FILE")
    echo "🔐 Using existing Speedtest Tracker key from $KEY_FILE"
fi
