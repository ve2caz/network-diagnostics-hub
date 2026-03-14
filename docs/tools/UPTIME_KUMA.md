# Uptime Kuma Configuration

Uptime Kuma provides real-time monitoring and alerts. Use it to catch network issues as they happen and correlate them with your Speedtest and SmokePing data.

**Port:** 9040
**URL:** http://localhost:9040

## First-Time Setup

### Create Admin Account

On first visit, Uptime Kuma will prompt you to create an admin account:

1. Navigate to http://localhost:9040
2. Enter your desired username and password
3. Click "Create Admin"

### Add Monitoring Targets

In Uptime Kuma, create monitors for your network:

1. Click **"Add New Monitor"**
2. Choose monitor type:
   - **HTTP(s)** — Test web services (e.g., your router admin interface)
   - **Ping** — Test ISP gateway latency
   - **DNS** — Test DNS resolution
   - **TCP** — Test port connectivity

### Useful Monitors to Add

**ISP Gateway Ping** (Real-time gateway latency)
- Type: Ping
- Hostname: _Your ISP gateway IP from traceroute_
- Interval: 60 seconds
- Timeout: 5000ms

**Internet Connectivity** (Test external connectivity)
- Type: HTTP(s)
- URL: `https://8.8.8.8:443`
- Interval: 60 seconds

**Local Router** (Monitor your own device)
- Type: Ping
- Hostname: `192.168.1.1` (or your router IP)
- Interval: 300 seconds

## Setting Up Alerts

### Notification Channels

1. Click **"Notifications"** in the sidebar
2. Add notification channel (email, webhook, Slack, etc.)
3. Test the notification

### Assign Alerts to Monitors

For each monitor:
1. Edit the monitor
2. Enable notifications
3. Set alert thresholds:
   - **Latency threshold** (e.g., alert if > 100ms)
   - **Heartbeat interval** (how often to check)

## Understanding the Status Page

Each monitor shows:

- **Status:** Up (green) or Down (red)
- **Uptime %:** Over selected time period
- **Average Response Time:** Latency data
- **Status History:** Timeline of outages

## Dashboard & Reports

### Status Page

Public read-only status page showing all monitors:
- Share with ISP support as evidence
- Enable via monitor settings

### Export Data

Uptime Kuma stores data locally:

```
./uptime-kuma/
```

To backup:

```bash
cp -r ./uptime-kuma ./uptime-kuma.backup
```

## Correlation with Other Tools

Use Uptime Kuma data alongside:

| Tool | Data | Correlation |
|------|------|-------------|
| **SmokePing** | Latency trends | Compare real-time vs historical |
| **Speedtest Tracker** | Bandwidth history | See if latency spikes correlate with speed drops |
| **Dashboard** | Overview | Central view of all system status |

**Example workflow:**
1. Uptime Kuka alerts on high latency
2. Check SmokePing to see if it's trending upward
3. Check Speedtest Tracker to see if speeds dropped simultaneously
4. Export all 3 data sources for ISP ticket

## Troubleshooting

**Monitors show "Unknown"?**
- Wait a few seconds for first check
- Verify the target IP/URL is correct and reachable
- Check firewall settings

**Alerts not triggering?**
- Verify notification channel is properly configured
- Test notification in settings
- Check alert thresholds are reasonable

**High false-alarm rate?**
- Increase alert threshold
- Increase check interval
- Use a less sensitive target

---

← [Back to TOOLS.md](../TOOLS.md) | [Back to README.md](../../README.md)
