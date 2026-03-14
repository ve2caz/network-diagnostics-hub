# Dashboard Configuration

The dashboard is a single-page app that links to all monitoring tools with a clean, card-based interface.

**Port:** 9010
**URL:** http://localhost:9010

## Features

- **Quick Access:** Direct links to all monitoring tools
- **Data-Driven:** Powered by YAML configuration (no HTML editing needed)
- **Extensible:** Add new cards and sections via configuration

## Configuration

The dashboard reads from `public/data/data.yaml`. To customize it:

1. Edit `public/data/data.yaml`
2. The changes appear immediately in the browser (refresh if needed)

See [docs/CARD_SYSTEM.md](../CARD_SYSTEM.md) for the complete card system documentation.

## Structure

```
public/
├── index.html          # Main page (no edits needed)
├── css/styles.css      # Styling
├── js/script.js        # Card rendering engine
└── data/data.yaml      # Configuration (edit this)
```

## Troubleshooting

**Changes not appearing?**
- Refresh your browser (Cmd+R or Ctrl+R)
- Clear browser cache if needed
- Check browser console for errors (F12 → Console)

**Cards rendering incorrectly?**
- Validate YAML syntax (indentation matters)
- Check the console for parser errors

---

← [Back to TOOLS.md](../TOOLS.md) | [Back to README.md](../../README.md)
