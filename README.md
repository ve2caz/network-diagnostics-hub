# Network Diagnostics Hub (The "ISP Evidence Kit")

A containerized monitoring stack designed to collect historical and real-time network data. This project provides a centralized dashboard to track bandwidth, jitter, packet loss, and path-hop diagnostics to hold ISPs accountable for service inconsistencies.

## The Stack

* **Diagnostic Hub (Nginx):** A central landing page linking all tools.
* **Speedtest Tracker:** Scheduled bandwidth logging to identify peak-hour congestion.
* **SmokePing:** High-precision latency and jitter visualization (The "Engineer's Proof").
* **Uptime Kuma:** Real-time health monitoring for instant lag confirmation during calls/streams.
* **MTR Web:** Live path-hop diagnostics to pinpoint exactly where data is being dropped (currently commented out in docker-compose.yaml).

## Prerequisites

* **Docker** and **Docker Compose** installed.
* **OpenSSL** installed.

## 📂 Project Structure

```text
.
├── docker-compose.yaml
├── index.html           # The landing page dashboard
├── start.sh             # Launch script with auto-detection
├── stop.sh              # Stop script
├── clean.sh             # Clean data while preserving configs
├── smokeping/           # Generated config/data for SmokePing
├── speedtest/           # Data for Speedtest Tracker
└── uptime-kuma/         # Database for Uptime Kuma

```

---

## Setup Instructions

### 1. Launch the Stack

Run the launch script to automatically detect your user context and timezone, then start the services:

```bash
./start.sh
```

This script handles UID/GID detection, timezone auto-detection, and launches all services in the background.

### 2. Access the Hub

Open your browser and navigate to:
**`http://localhost:9010`**

### 3. Speedtest Tracker First Login (Expected)

Speedtest Tracker is a self-hosted app with authentication enabled by default.
On first launch, sign in with the default admin credentials documented by the
project, then change the password immediately.

During the first start of the application a default admin account is created for you:

| Username            | Password.  |
| ------------------- | ---------- |
| `admin@example.com` | `password` |

- App URL in this stack: `http://localhost:9020`
- If needed, rotate credentials and review account settings in Speedtest Tracker after first login.

---

## 🔍 Critical Configuration: SmokePing Targets

To make the data "court-admissible" for your ISP, you must monitor your **ISP Gateway** (the first hop outside your home). The external DNS targets are organized by tiers for better benchmarking.

1. **Find your Gateway:** Run a traceroute in your terminal:

    ```zsh
    # macOS/Linux
    traceroute 8.8.8.8
    # Windows
    tracert 8.8.8.8
    ```

2. **Edit Targets:** Open `./smokeping/config/Targets` and replace the `host` for your ISP Gateway with the IP address found in **Hop 2** of your traceroute.

3. **Restart SmokePing:**

    ```zsh
    docker compose restart smokeping
    ```

---

## How to Use the Data for ISP Support

| Evidence Needed | Tool to Use | What to look for |
| --- | --- | --- |
| **Congestion** | Speedtest Tracker | Consistent speed drops during evening hours (7 PM – 11 PM). |
| **Unstable Line** | SmokePing | Thicker "smoke" (jitter) or vertical red/colored bars (packet loss). |
| **Live Stalls** | Uptime Kuma | Sudden red blocks in the ping graph that align with Zoom "Unstable" alerts. |
| **Node Failure** | MTR Web (when enabled) | Packet loss starting at Hop 2 or 3 and persisting through the rest of the trace. |

---

## Maintenance & Logs

* **View Logs:** `docker compose logs -f [service_name]`
* **Stop Services:** `./stop.sh` (or `docker compose down`)
* **Clean Data:** `./clean.sh` (resets all metrics while preserving configuration files)

---
