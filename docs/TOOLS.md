# Tools Overview

This project includes 4 integrated monitoring tools. Each one serves a specific purpose in diagnosing network issues.

## Dashboard (Nginx)
**Port:** 9010
**Purpose:** Central hub linking all tools with quick access to each service

- **Where:** http://localhost:9010
- **Config:** See [docs/tools/DASHBOARD.md](tools/DASHBOARD.md)

## Speedtest Tracker
**Port:** 9020
**Purpose:** Historical bandwidth trends and peak-hour congestion analysis

Track your internet speed over time with automated scheduled tests. Perfect for identifying when your ISP throttles bandwidth.

- **Where:** http://localhost:9020
- **Key Feature:** Stores history, searchable by date range
- **Setup:** See [docs/tools/SPEEDTEST_TRACKER.md](tools/SPEEDTEST_TRACKER.md)

## SmokePing
**Port:** 9030
**Purpose:** Latency, jitter, and packet loss visualization

Continuously monitors your ISP gateway with high-precision latency tracking. The "smoke" visualization makes packet loss obvious.

- **Where:** http://localhost:9030
- **Key Feature:** Long-term latency trends with visual packet loss
- **Setup:** See [docs/tools/SMOKEPING.md](tools/SMOKEPING.md)

## Uptime Kuma
**Port:** 9040
**Purpose:** Real-time health monitoring and lag alerts

Monitor your connection live with instant notifications when latency spikes or packet loss occurs.

- **Where:** http://localhost:9040
- **Key Feature:** Alerts and status history
- **Setup:** See [docs/tools/UPTIME_KUMA.md](tools/UPTIME_KUMA.md)

---

## Which Tool Should I Use?

| Question | Answer | Tool |
|----------|--------|------|
| _"My speeds drop at night"_ | Speedtest Tracker with scheduling |
| _"Internet randomly gets laggy"_ | SmokePing for latency trends |
| _"Zoom calls are unstable"_ | Uptime Kuma for real-time alerts |
| _"Packets are being dropped"_ | SmokePing packet loss graphs |
| _"Everything feels slow"_ | Use all 3 to correlate data |

---

← [Back to README.md](../README.md)
