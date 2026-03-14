# Setup & Getting Started

## Prerequisites

- **Docker** and **Docker Compose** installed
- **OpenSSL** installed

## 1. Launch the Stack

Run the launch script to automatically detect your user context and timezone:

```bash
./scripts/start.sh
```

This script handles:
- UID/GID detection
- Timezone auto-detection
- Service startup in the background

**Other helpful scripts:**
- `./scripts/restart.sh` — Graceful restart
- `./scripts/stop.sh` — Stop all services
- `./scripts/clean.sh` — Clean data while preserving configs
- `./scripts/logs.sh` — Monitor logs

## 2. Access the Dashboard

Open your browser and navigate to:
```
http://localhost:9010
```

You'll see links to all monitoring tools.

## 3. First Login: Speedtest Tracker

Speedtest Tracker requires authentication. On first launch, a default admin account is created:

| Credential | Value |
|------------|-------|
| **Username** | `admin@example.com` |
| **Password** | `password` |

**Access at:** `http://localhost:9020`

⚠️ **Important:** Change the password immediately after first login.

For more details, see [docs/tools/SPEEDTEST_TRACKER.md](tools/SPEEDTEST_TRACKER.md#first-time-setup).

## 4. Configure SmokePing Targets

SmokePing monitors your ISP gateway. To set this up correctly:

1. Run a traceroute to find your gateway:
   ```bash
   # macOS/Linux
   traceroute 8.8.8.8
   # Windows
   tracert 8.8.8.8
   ```

2. Note the IP address at **Hop 2** (your ISP gateway)

3. Edit SmokePing targets:
   ```bash
   nano ./smokeping/config/Targets
   ```

4. Restart the stack to apply changes:
   ```bash
   ./scripts/restart.sh
   ```

See [docs/tools/SMOKEPING.md](tools/SMOKEPING.md#configuration) for detailed SmokePing setup.

## Next Steps

- 📊 **[Configure Speedtest Scheduling](tools/SPEEDTEST_TRACKER.md#scheduling)**
- 🔍 **[Set Up SmokePing Monitoring](tools/SMOKEPING.md)**
- 📈 **[Start Uptime Kuka Monitoring](tools/UPTIME_KUMA.md)**
- 📋 **[Learn How to Use Your Data](HOW_TO_USE.md)**

---

← [Back to README.md](../README.md)
