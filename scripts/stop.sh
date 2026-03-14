#!/bin/zsh

# Navigate to project root
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

# 1. Discover context (for proper initialization)
export UID=$(id -u)
export GID=$(id -g)

if [[ "$OSTYPE" == "darwin"* ]]; then
    export TZ=$(readlink /etc/localtime | sed 's#.*zoneinfo/##')
else
    export TZ=$(cat /etc/timezone 2>/dev/null || echo "America/Toronto")
fi

# 2. Load Speedtest Tracker APP_KEY
source "$(dirname "$0")/_load-speedtest-key.sh"

echo "🛑 Stopping Network Diagnostics Hub..."

# 3. Stop services (variables are already exported to environment)
docker compose down

echo "------------------------------------------------"
echo "✅ All services stopped."
