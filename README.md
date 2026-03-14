# Network Diagnostics Hub (The "ISP Evidence Kit")

<table>
<tr>
<td width="50%">

A containerized monitoring stack designed to collect historical and real-time network data.

**The goal**: Real-time visibility into your router and network performance

**This is NOT about spying on networks.**

This project helps you take control of your network by providing the tools to:

- Document bandwidth degradation during peak hours
- Prove packet loss and latency issues with historical data
- Present evidence to ISP support with technical credibility
- Monitor network health in real-time

**Security is built in from the start:**
- All services run locally in Docker with minimal exposure
- No system-level access allowed—containers run with your user's permissions (non-root)
- No external dependencies required for core functionality
- Single-page app with static files (no tracking, no analytics)
- Local-only by default; you control any external access

</td>
<td width="50%" valign="middle">

<div align="center">
  <img src="docs/images/01 - Network Diagnostics Hub.png" alt="Network Diagnostics Hub Dashboard" height="500px" />
</div>

</td>
</tr>
</table>

## What's Included

The stack provides 4 integrated tools that are locally hosted:

| Tool | Purpose | Port |
|------|---------|------|
| **Dashboard** | Central hub linking all tools | [9010](http://localhost:9010) |
| **Speedtest Tracker** | Historical bandwidth trends | [9020](http://localhost:9020) |
| **SmokePing** | Latency, jitter, and packet loss visualization | [9030](http://localhost:9030) |
| **Uptime Kuma** | Real-time health monitoring and alerts | [9040](http://localhost:9040) |

## Getting Started

👉 **[SETUP.md](docs/SETUP.md)** — How to launch the stack and access the dashboard

## Documentation

| Topic | Link |
|-------|------|
| **Tools Overview** | [TOOLS.md](docs/TOOLS.md) |
| **Tool Configuration** | [docs/tools/](docs/tools/) |
| **Using Data for ISP Support** | [HOW_TO_USE.md](docs/HOW_TO_USE.md) |
| **Card System (Dashboard)** | [CARD_SYSTEM.md](docs/CARD_SYSTEM.md) |
| **Maintenance & Logs** | [MAINTENANCE.md](docs/MAINTENANCE.md) |
| **Frequently Asked Questions** | [FAQ.md](docs/FAQ.md) |

## Quick Start

```bash
# Launch the stack
./scripts/start.sh

# Open the dashboard
# http://localhost:9010
```

On first launch, Speedtest Tracker will create a default admin account. See [SETUP.md](docs/SETUP.md#first-login) for details.

---

**Need help?** Check [FAQ.md](docs/FAQ.md) or see the tool-specific docs in [docs/tools/](docs/tools/).
