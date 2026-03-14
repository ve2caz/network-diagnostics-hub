#!/bin/zsh

# Navigate to project root
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

# 1. Discover current user context
export UID=$(id -u)
export GID=$(id -g)

# 2. Discover Timezone (macOS/Linux compatible)
if [[ "$OSTYPE" == "darwin"* ]]; then
    export TZ=$(readlink /etc/localtime | sed 's#.*zoneinfo/##')
else
    export TZ=$(cat /etc/timezone 2>/dev/null || echo "America/Toronto")
fi

# 3. Load Speedtest Tracker APP_KEY (generates once, reuses thereafter)
source "$(dirname "$0")/_load-speedtest-key.sh"

echo "🚀 Launching Network Diagnostics Hub..."
echo "👤 User: $UID:$GID | 🕒 TZ: $TZ"

# 4. Launch docker compose (variables are already exported to environment)
docker compose up -d

echo "------------------------------------------------"
echo "Stack is coming online."
echo "Dashboard: http://localhost:9010"
echo "Use './scripts/logs.sh' to monitor initialization."

echo "------------------------------------------------"
echo "✅ Verification: Run 'ls -l ./smokeping/config' to confirm your user owns the data."
