# Maintenance & Logs

## Viewing Logs

### View All Service Logs

```bash
./scripts/logs.sh
```

Exit with `Ctrl+C`.

## Common Commands

### Stop Services

```bash
./scripts/stop.sh
```

### Restart Services

```bash
./scripts/restart.sh
```

### Clean Up Data

⚠️ **Warning:** This removes monitoring data but preserves configs.

```bash
./scripts/clean.sh
```

### Start Services

```bash
./scripts/start.sh
```

## Data Management

### Data Locations

```
./speedtest/config/        # Speedtest Tracker database and config
./smokeping/config/        # SmokePing configuration
./smokeping/data/          # SmokePing RRD database (grows over time)
./uptime-kuma/             # Uptime Kuma database
```

### Backup Your Data

```bash
# Backup everything
tar -czf network-diagnostics-backup-$(date +%Y%m%d).tar.gz \
  ./speedtest ./smokeping ./uptime-kuma

# Restore from backup
tar -xzf network-diagnostics-backup-20250314.tar.gz
```

### Database File Sizes

Typical database growth (per month):

| Service | Size | Notes |
|---------|------|-------|
| Speedtest Tracker | 1-5 MB | Depends on test frequency |
| SmokePing | 10-50 MB | Grows more; stores detailed metrics |
| Uptime Kuma | 1-2 MB | Depends on number of monitors |

## Resource Usage

### Typical Resource Consumption

| Service | CPU | Memory | Disk |
|---------|-----|--------|------|
| Dashboard (Nginx) | <1% | 5-10 MB | < 1 MB |
| Speedtest Tracker | 1-2% (during tests) | 50-100 MB | 1-5 MB/month |
| SmokePing | <1% | 20-50 MB | 10-50 MB/month |
| Uptime Kuma | <1% | 30-60 MB | 1-2 MB/month |

Total typical usage: **50-100 MB RAM at idle**, spikes during tests.

### Optimization Tips

**If running on limited hardware:**

1. Reduce SmokePing ping frequency:
   ```bash
   nano ./smokeping/config/Targets
   # Change: step = 180s (3 minutes, instead of default)
   ```

2. Reduce Speedtest Tracker schedule:
   ```env
   SPEEDTEST_SCHEDULE="0 * * * *"  # Once per hour instead of every 30 min
   ```

3. Limit Uptime Kuma monitors (fewer = less memory)

## Troubleshooting

### Services Won't Start

Check logs:
```bash
./scripts/logs.sh
```

Common issues:
- Port already in use: Change port in `docker-compose.yaml`
- Out of disk space: Run `docker system prune`
- Permission issues: Ensure Docker socket has correct permissions

### High Memory Usage

1. Check logs to see which service is using memory:
   ```bash
   ./scripts/logs.sh
   ```

2. Restart the stack:
   ```bash
   ./scripts/restart.sh
   ```

3. If recurring, consider reducing data retention or checking for leaks

### Disk Space Growing Too Fast

SmokePing data can grow quickly. Options:

1. **Reduce ping frequency** (increase time between pings)
2. **Reduce data retention:**
   ```bash
   # Delete old SmokePing data
   rm ./smokeping/data/*.rrd  # Caution: deletes all SmokePing history
   ```

3. **Archive and clean old Speedtest data** in the web UI

### Can't Access Services

Check that services are running with logs:

```bash
./scripts/logs.sh
```

If services aren't running, start them:

```bash
./scripts/start.sh
```

Check for error messages in the logs.

## Health Checks

### Verify All Services Are Running

```bash
curl -I http://localhost:9010  # Dashboard
curl -I http://localhost:9020  # Speedtest Tracker
curl -I http://localhost:9030  # SmokePing
curl -I http://localhost:9040  # Uptime Kuma
```

All should return `HTTP/1.1 200 OK` or `HTTP/1.1 302 Found` (redirect).

---

← [Back to README.md](../README.md)
