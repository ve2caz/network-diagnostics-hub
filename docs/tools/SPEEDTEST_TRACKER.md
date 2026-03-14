# Speedtest Tracker Configuration

Speedtest Tracker logs your internet speed over time with automated scheduled tests. Use it to document peak-hour congestion and speed degradation.

**Port:** 9020
**URL:** http://localhost:9020

## First-Time Setup

### Default Admin Account

Speedtest Tracker creates a default admin account on first launch:

| Credential | Value |
|------------|-------|
| **Username** | `admin@example.com` |
| **Password** | `password` |

⚠️ **Change the password immediately** after first login.

### Reset Credentials

If you need to reset credentials:

```bash
./scripts/restart.sh
```

This will recreate the default account.

## Scheduling

Configure how often Speedtest Tracker runs tests:

### Environment Variable: `SPEEDTEST_SCHEDULE`

Uses standard cron syntax. Default (every 30 minutes):

```
*/30 * * * *
```

**Other useful schedules:**

| Schedule | Meaning |
|----------|---------|
| `0 * * * *` | Every hour |
| `0 9,17,21 * * *` | At 9 AM, 5 PM, and 9 PM |
| `*/15 * * * *` | Every 15 minutes |
| `0 0 * * *` | Once per day at midnight |

### How to Change

Edit `.env` file in the project root:

```env
SPEEDTEST_SCHEDULE=0 * * * *
```

Then restart the stack:

```bash
./scripts/restart.sh
```

## Configuration

### Important Variables

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| `SPEEDTEST_SCHEDULE` | How often tests run | `*/30 * * * *` | `0 * * * *` |
| `SPEEDTEST_SERVERS` | Fixed Ookla server IDs | `68258` | `68258,68259` |
| `DEFAULT_CHART_RANGE` | Dashboard time range | `week` | `month`, `year` |
| `DISPLAY_TIMEZONE` | Local timezone | `America/Toronto` | `America/New_York` |
| `PRUNE_RESULTS_OLDER_THAN` | Data retention (days) | `365` | `730` (2 years) |
| `PUBLIC_DASHBOARD` | Guest dashboard access | `false` | `true` |

### Using a Single Server

For consistent trends, use one Ookla server:

```env
SPEEDTEST_SERVERS=68258
```

**Find your local server:**

1. Go to https://www.speedtest.net/partner/speedtest-tracker
2. Find a server near you
3. Use its ID in the configuration

### Blocking Unstable Servers

Exclude noisy servers with:

```env
SPEEDTEST_BLOCKED_SERVERS=68256,68257
```

## Database

Speedtest Tracker uses SQLite for local storage:

```
./speedtest/config/db.sqlite
```

Backup this file to preserve your speed test history.

## Viewing Results

**Dashboard view:** http://localhost:9020

Features:
- Filter by date range
- Export results
- View individual test details
- Compare speeds across days/weeks

## Troubleshooting

**Tests aren't running?**
- Check logs: `./scripts/logs.sh speedtest-tracker`
- Verify your internet connection
- Confirm the schedule is correct

**Data looks wrong?**
- Verify timezone setting matches your local time
- Check if tests are running: view the dashboard

**Authentication issues?**
- Reset to default credentials: `./scripts/restart.sh`

---

← [Back to TOOLS.md](../TOOLS.md) | [Back to README.md](../../README.md)
