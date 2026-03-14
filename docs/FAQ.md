# Frequently Asked Questions

## Getting Started

**Q: What ports does this use?**

A: 9010, 9020, 9030, and 9040. If these are in use, edit `docker-compose.yaml` to change them.

**Q: Do I need an internet connection to run this?**

A: You need internet for the services to work properly (they monitor your connection), but Docker and the stack itself can start offline.

**Q: Can I run this on a Raspberry Pi?**

A: Yes! Use a 64-bit OS (Raspberry Pi OS 64-bit). Performance will be good for monitoring but Speedtest may timeout on slower connections.

**Q: How often should I run tests?**

A: Start with every 30 minutes. If you want faster trending, run every 15 minutes. If you want less data, run hourly.

---

## Data & Privacy

**Q: Where is my data stored?**

A: Locally on your machine in Docker volumes. Nothing is sent to external services (except Speedtest Tracker sends to Ookla's servers during tests, which is expected).

**Q: Is this safe to run?**

A: Yes. All services are containerized and run locally. No tracking, no analytics, no cloud send.

**Q: Can I see what data is being collected?**

A: Yes. Check the files in `./speedtest/config/`, `./smokeping/data/`, and `./uptime-kuma/`.

**Q: How do I know my ISP isn't throttling the monitoring tools?**

A: SmokePing uses ICMP (ping), which ISPs rarely throttle. Speedtest uses Ookla's official servers. If ISP is throttling monitoring tools, that's fraud.

---

## Troubleshooting

**Q: Why aren't tests running on schedule?**

A: Check the cron syntax in `SPEEDTEST_SCHEDULE`. Test with: `*/30 * * * *` (valid). View logs with `./scripts/logs.sh`.

**Q: SmokePing shows "Offline" for my ISP gateway?**

A: The IP might be wrong or your firewall blocks ICMP. Run `traceroute 8.8.8.8` again and verify Hop 2.

**Q: Can't access dashboard at localhost:9010?**

A: Check logs with `./scripts/logs.sh`. If services aren't running: `./scripts/start.sh`.

**Q: Speedtest Tracker won't initialize?**

A: First launch takes 30+ seconds. Wait a minute and refresh. Check logs: `./scripts/logs.sh speedtest-tracker`.

**Q: Memory/disk usage seems high?**

A: SmokePing data grows over time. Typical: 50 MB/month. See [MAINTENANCE.md](MAINTENANCE.md#optimization-tips) for optimization.

---

## Using the Data

**Q: How do I export data for ISP support?**

A: See [HOW_TO_USE.md](HOW_TO_USE.md#exporting-data) for detailed export instructions.

**Q: What if ISP says "We're not seeing this on our end"?**

A: SmokePing directly measures your line to their gateway. If you have packet loss and they don't, either: (1) it's intermittent, or (2) their monitoring is inadequate. Present the data anyway.

**Q: Should I send ISP the raw data files?**

A: No. Send screenshots with timestamps, or export summaries from the web interface. ISP support won't know how to read RRD files.

---

## Configuration & Customization

**Q: Can I customize card content?**

A: Yes. Edit `public/data/data.yaml` to change card titles, descriptions, and links. No HTML editing needed.

**Q: How do I add a new monitoring tool to the dashboard?**

A: Add a new service to `docker-compose.yaml`, then create a card in `public/data/data.yaml`.

**Q: Can I monitor multiple ISP gateways?**

A: Yes. SmokePing supports multiple targets. Edit `./smokeping/config/Targets` and add more entries.

---

## Advanced

**Q: Can I use this behind a proxy?**

A: Yes, but you'll need to configure Speedtest Tracker and SmokePing to use the proxy. See their respective docs.

**Q: Can I enable guest/public access to the dashboard?**

A: Dashboard is local-only by default. For Speedtest Tracker guest dashboard, set `PUBLIC_DASHBOARD=true` in `.env`.

**Q: How do I back up everything before major changes?**

A: Run: `tar -czf backup-$(date +%Y%m%d).tar.gz ./speedtest ./smokeping ./uptime-kuma public/`

**Q: Can I integrate this with other tools (Grafana, Prometheus)?**

A: Not out of the box, but each tool has APIs. This is a future enhancement opportunity.

---

## Getting Help

**Q: Where can I report bugs?**

A: Check the project repository or documentation first. Ensure you've read the relevant tool docs.

**Q: How do I request a new feature?**

A: File an issue on the project repository with details about what you need.

**Q: The docs don't answer my question?**

A: Check the individual tool docs:
- [docs/tools/SPEEDTEST_TRACKER.md](tools/SPEEDTEST_TRACKER.md)
- [docs/tools/SMOKEPING.md](tools/SMOKEPING.md)
- [docs/tools/UPTIME_KUMA.md](tools/UPTIME_KUMA.md)

---

← [Back to README.md](../README.md)
