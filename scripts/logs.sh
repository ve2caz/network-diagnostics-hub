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

echo "🚀 Showing Docker Compose Logs..."
echo "👤 User: $UID:$GID | 🕒 TZ: $TZ"
echo "CMD+C on macOS (or CTRL+C inside Windows shell) to exit logs and return to terminal."

# 4. Show logs (variables are already exported to environment)
docker compose logs -f
