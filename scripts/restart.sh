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

# 3. Load Speedtest Tracker APP_KEY
source "$(dirname "$0")/_load-speedtest-key.sh"

echo "🔄 Restarting Network Diagnostics Hub..."
echo "👤 User: $UID:$GID | 🕒 TZ: $TZ"

# 4. Restart services (graceful restart)
echo ""
echo "Stopping services..."
docker compose down

echo ""
echo "Starting services..."
docker compose up -d

echo "------------------------------------------------"
echo "✅ Stack restarted successfully."
echo "Dashboard: http://localhost:9010"
echo "Use './scripts/logs.sh' to monitor status."
echo "------------------------------------------------"
