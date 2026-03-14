# Using Your Data for ISP Support

When ISP support denies there's a problem, you need evidence. Here's how to use your collected data effectively.

## Preparing Your Case

### 1. Collect 1-2 Weeks of Data

Before contacting ISP support:
- Let SmokePing run for at least 1-2 weeks
- Let Speedtest Tracker run scheduled tests for at least 1 week
- Have Uptime Kuma capture real-time incidents

Longer baseline data = stronger evidence.

### 2. Identify the Pattern

Look for consistent issues:

| Issue | What to Look For |
|-------|------------------|
| **Peak-hour congestion** | Speed drops consistently between 7-11 PM |
| **Unstable line** | Jitter spikes or packet loss every evening |
| **Random disconnects** | Uptime Kuma shows correlated down events |
| **Upstream problems** | SmokePing shows loss at ISP gateway (Hop 2) |

### 3. Export Your Evidence

#### From Speedtest Tracker

1. Go to http://localhost:9020
2. Select date range showing the problem
3. Take screenshots or use "Export" feature
4. Save as PDF or image

**What to highlight:**
- Consistent speed drops during specific hours
- Comparison to your subscribed speed tier
- Multiple tests showing the pattern

#### From SmokePing

1. Go to http://localhost:9030
2. Select time range showing packet loss
3. Take screenshot showing "smoke" (packet loss clouds)
4. Screenshot the latency spikes

**What to highlight:**
- Packet loss visible as "smoke"
- Time correlation with Speedtest drops
- Jitter spikes during problem hours

#### From Uptime Kuma

1. Go to http://localhost:9040
2. View status page or monitor details
3. Take screenshot showing outage timeline
4. Export alert history if available

## ISP Support Conversation

### What Evidence to Present

**For bandwidth problems:**
- Speedtest Tracker results showing consistent drops
- Graph overlay showing it happens at the same time daily
- Comparison to subscribed speed tier

**For latency/packet loss:**
- SmokePing graph showing packet loss at ISP gateway
- Uptime Kuma alert history confirming timing
- Latency spikes during problem windows

**For connection drops:**
- Uptime Kuma timeline showing down events
- Correlation with other metrics if applicable
- Time and duration of each incident

### Red Flags When They Claim

| ISP Claim | Your Counter |
|-----------|--------------|
| _"You must have a WiFi issue"_ | Show hardwired SmokePing results to ISP gateway |
| _"Peak hours always have issues"_ | Show historical data from multiple weeks proving theirs are worse |
| _"We can't see a problem on our end"_ | Your SmokePing targets their gateway; you're monitoring directly |
| _"The problem is on your router"_ | Show Uptime Kuma monitoring your router is fine; problem is to ISP gateway |

### What to Ask For

1. **"Can you check your gateway at [IP] for packet loss?"**
2. **"Here's my SpeedTest data from [date range]—what's your throughput SLA?"**
3. **"My SmokePing shows packet loss at Hop 2 (your gateway). Can you investigate?"**

## Example Scenarios

### Scenario 1: "We're only getting 300 Mbps instead of 500 Mbps"

**Your evidence:**
1. Speedtest Tracker historical graph showing consistent ~300 Mbps over 2 weeks
2. Highlighted time range showing it's consistent (not temporary)
3. Request escalation based on SLA violation

**What to say:**
> "I've been monitoring my speed for 2 weeks and consistently get 300 Mbps, far below our 500 Mbps plan. Here's historical data I've collected. Can you check your line metrics?"

### Scenario 2: "Zoom meetings become 'Unstable' at 8 PM every day"

**Your evidence:**
1. SmokePing showing packet loss spike starting at 8 PM
2. Uptime Kuma alert log showing latency > 100ms at same time
3. Speedtest showing speed drop at same time

**What to say:**
> "My connection becomes unstable at predictable times (8 PM daily), visible here in my monitoring data. I'm losing packets at your gateway (Hop 2). Here's packet loss data from [dates] at [times]."

### Scenario 3: "My connection drops randomly"

**Your evidence:**
1. Uptime Kuma timeline showing exact times of disconnections
2. SmokePing graph showing >90% packet loss during those windows
3. Multiple incidents captured over days

**What to say:**
> "I have documented [X] disconnections from [date] to [date]. Here are the exact times and durations. SmokePing shows packet loss at your gateway during these windows."

## Documentation Best Practices

### Screenshots

- **Use light background:** Easier to read, print-friendly
- **Include timestamps:** Show _when_ the problem occurs
- **Crop for clarity:** Focus on the relevant metric
- **Annotate:** Add arrows/notes highlighting the issue

### Exporting Data

**For ISP escalation:**
1. Export multi-week baseline
2. Export problem period with timestamps
3. Include your plan speed tier (e.g., "500 Mbps")
4. Include times when issue occurs

### Backup Your Data

Keep local backups of your evidence:

```bash
# Backup all monitoring data
cp -r ./speedtest ./speedtest.backup.$(date +%Y%m%d)
cp -r ./smokeping/data ./smokeping.data.backup.$(date +%Y%m%d)
cp -r ./uptime-kuma ./uptime-kuma.backup.$(date +%Y%m%d)
```

## Escalation Path

1. **First contact:** Chat or phone support with screenshot + brief explanation
2. **No resolution:** Escalate to technical team with full data set
3. **Still stuck:** File formal complaint with FCC (USA) or local telecom regulator
4. **Legal:** If high-value business, consult ISP performance SLA requirements

Your documented evidence makes each escalation stronger.

---

← [Back to README.md](../README.md)
