#!/bin/zsh

echo "🧹 Scrubbing all generated directories and files..."

# 1. SmokePing: Keep config/httpd.conf, config/Targets, delete the data folder entirely
if [[ -d "smokeping" ]]; then
  # Delete everything in smokeping EXCEPT the config/httpd.conf and config/Targets paths
  find smokeping -mindepth 1 ! -path "smokeping/config" ! -path "smokeping/config/httpd.conf" ! -path "smokeping/config/Targets" -delete
  if [[ -d "smokeping/data" ]]; then
      # Delete the entire folder. It's not in git, so get rid of it.
      rm -rf smokeping/data
      echo "✅ Smokeping data folder deleted."
  fi
  echo "✅ Smokeping scrubbed (Targets preserved)."
fi

# 2. Speedtest: Preserve ONLY speedtest/.gitkeep
if [[ -d "speedtest" ]]; then
  # Delete everything in speedtest EXCEPT the root .gitkeep
  find speedtest -mindepth 1 ! -path "speedtest/.gitkeep" ! -path "speedtest/speedtest-servers.json" -delete
  echo "✅ Speedtest scrubbed (.gitkeep preserved)."
fi

# 3. Uptime Kuma: Preserve ONLY uptime-kuma/.gitkeep
if [[ -d "uptime-kuma" ]]; then
  find uptime-kuma -mindepth 1 ! -path "uptime-kuma/.gitkeep" -delete
  echo "✅ Uptime Kuma scrubbed (.gitkeep preserved)."
fi

# 4. Remove generated Speedtest Tracker app key (will be regenerated on next start.sh)
rm -f .speedtest-app-key
echo "✅ Speedtest Tracker application key (.speedtest-app-key) removed."

# 5. OS & Environment Junk
rm -f .DS_Store smokeping/.DS_Store .env 2>/dev/null

echo "------------------------------------------------"
echo "✨ Project is now 100% clean."
