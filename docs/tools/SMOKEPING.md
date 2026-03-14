# SmokePing Configuration

SmokePing monitors latency, jitter, and packet loss with beautiful visualizations. The "smoke" effect shows packet loss patterns over time.

**Port:** 9030
**URL:** http://localhost:9030

## Critical Setup: Configure Your ISP Gateway

For your data to be "court-admissible" in ISP disputes, SmokePing must monitor your **ISP gateway** (the first hop outside your home network).

### Step 1: Find Your ISP Gateway

Run a traceroute to Google's DNS:

```bash
# macOS/Linux
traceroute 8.8.8.8

# Windows (in CMD)
tracert 8.8.8.8
```

**Look for Hop 2** — this is your ISP gateway IP address.

Example output:
```
 1  192.168.1.1 (your router)
 2  203.45.67.89 (YOUR ISP GATEWAY) ← Use this IP
 3  10.100.1.1
 4  ...
```

### Step 2: Edit SmokePing Targets

Open the SmokePing targets file:

```bash
nano ./smokeping/config/Targets
```

Find the line with your ISP gateway and update it:

```
+ ISP
host = 203.45.67.89
```

### Step 3: Restart the Stack

Apply the changes:

```bash
./scripts/restart.sh
```

## Configuration

### Targets File Format

SmokePing targets are organized hierarchically. Example:

```
+ ISP
host = 203.45.67.89
+ DNS
host = 8.8.8.8
+ DNS
host = 1.1.1.1
```

**Common targets to monitor:**

| Target | Purpose | IP/Host |
|--------|---------|---------|
| ISP Gateway | Show line quality | _From traceroute Hop 2_ |
| Google DNS | Upstream quality | `8.8.8.8` |
| Cloudflare DNS | Alternative DNS | `1.1.1.1` |

### Ping Interval

Default: Tests every 180 seconds (3 minutes)

To change, edit `./smokeping/config/Targets` top section:

```
step    = 60s        # How often to ping
pings   = 20         # Number of packets per test
```

## Understanding the Display

### The Graph

- **X-axis:** Time (hours, days, weeks)
- **Y-axis:** Latency (milliseconds)
- **Colored lines:** Different packet arrival patterns
- **Smoke/clouds:** Packet loss (loss% = smoke thickness)

### What to Look For

| Pattern | Meaning |
|---------|---------|
| Thin, steady line | Good: stable connection |
| Wavy lines | Jitter: latency varies |
| Thick smoke/clouds | Packet loss: packets not arriving |
| Sudden spikes | Brief outages or congestion |
| Red/colored areas | High packet loss at that time |

## Viewing Results

**Dashboard view:** http://localhost:9030

- Hover over graphs for specific values
- Switch between different time ranges (day, week, month)
- View detailed statistics for each target

## Database Storage

```
./smokeping/data/
```

This is where SmokePing stores its RRD (Round-Robin Database) files. These files grow over time as data is collected.

## Troubleshooting

**No data appearing?**
- Wait a few minutes for first data points
- Check that your gateway IP is reachable: `ping 203.45.67.89`
- View logs: `./scripts/logs.sh smokeping`

**Targets are offline?**
- Verify the IP addresses are correct
- Ensure your firewall allows ICMP (ping) traffic
- Check if the ISP gateway has changed (run traceroute again)

**High packet loss to ISP gateway?**
- This is what you want to document!
- Save screenshots for ISP support
- Collect 1-2 weeks of data to show patterns

---

← [Back to TOOLS.md](../TOOLS.md) | [Back to README.md](../../README.md)
