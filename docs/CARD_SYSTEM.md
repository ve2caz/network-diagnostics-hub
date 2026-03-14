# Data-Driven Card System

This system uses a YAML-based configuration file to render sections and cards dynamically. No need to edit HTML anymore!

## Files

- **public/data/data.yaml** - Configuration file containing all sections, cards, and content
- **public/js/script.js** - JavaScript module that loads the YAML and renders the page
- **public/css/styles.css** - CSS styling (unchanged, reusable)
- **public/index.html** - Simplified HTML template

## Project Structure

```
public/
├── index.html           (simplified template)
├── css/
│   └── styles.css       (styling, unchanged)
├── js/
│   └── script.js        (CardRenderer class)
└── data/
    └── data.yaml        (content configuration)
```

## How It Works

1. `index.html` loads and executes `js/script.js`
2. `script.js` loads `data/data.yaml` via fetch
3. YAML is parsed using the js-yaml library from CDN
4. The page is dynamically rendered from the data

## Data Structure

### Header
```yaml
header:
  title: Your Title Here
  subtitle: Your subtitle here
```

### Sections
```yaml
sections:
  - id: section-id
    title: Section Title
    cards:
      - # card data here
```

### Cards
```yaml
card:
  id: unique-card-id
  title: Card Title
  badge: Badge Text
  color: green  # green, orange, blue, purple, red, cyan, yellow
  content:
    - label: "📊 Label:"
      text: "Card content text"
    - label: "🎯 Another:"
      text: "More text"
  buttons:
    - label: Button Text
      url: https://example.com
      type: primary  # or "secondary"
    - label: Link Text
      url: https://example.com
      type: secondary
```

## Usage Examples

### Add a New Card

Edit `public/data/data.yaml` and add to a section's cards:
```yaml
- id: new-card
  title: My New Tool
  badge: Port 5000
  content:
    - label: "📊 What it does:"
      text: "Description here"
  buttons:
    - label: Open
      url: http://localhost:5000
      type: primary
```

### Add a New Section

Add a new section to `public/data/data.yaml`:
```yaml
- id: new-section
  title: New Section Name
  cards:
    - id: card-in-new-section
      title: First Card
      badge: Info
      content:
        - label: "What:"
          text: "Some content"
      buttons:
        - label: Go
          url: https://example.com
          type: primary
```

### Modify a Card

Simply update the card properties in `public/data/data.yaml`:
```yaml
- id: speedtest-tracker
  title: Updated Title
  badge: Updated Badge
  content:
    - label: "Updated:"
      text: "New content"
```

### Remove a Card

Delete the entire card object from its section's cards list in `public/data/data.yaml`.

### Remove a Section

Delete the entire section from `public/data/data.yaml`.

## JavaScript API

The renderer is exposed globally as `window.cardRenderer` with a public facade for programmatic manipulation:

```javascript
// Add a section
window.cardRenderer.addSection({
  id: 'new-section',
  title: 'New Section',
  cards: [/* ... */]
});

// Add a card to a section
window.cardRenderer.addCard('section-id', {
  id: 'new-card',
  title: 'New Card',
  // ... card properties
});

// Remove a section
window.cardRenderer.removeSection('section-id');

// Remove a card
window.cardRenderer.removeCard('section-id', 'card-id');

// Update a section
window.cardRenderer.updateSection('section-id', {
  title: 'Updated Title'
});

// Update a card
window.cardRenderer.updateCard('section-id', 'card-id', {
  title: 'Updated Title',
  color: 'orange'
});

// Re-render after changes
window.cardRenderer.render();
```

## Tips

1. **Keep IDs unique** - Use clear, kebab-case IDs for sections and cards
2. **Color consistency** - Choose colors that match the tool's purpose
3. **Content structure** - Each content item should have a label and text
4. **Buttons** - Mix primary buttons for main CTAs with secondary for links
5. **XSS-safe** - The renderer automatically uses safe DOM APIs (no innerHTML)

## Notes

- Changes to `public/data/data.yaml` take effect immediately on page reload
- The js-yaml library handles full YAML spec compliance
- All text is set via `textContent` to prevent XSS vulnerabilities
- The public API validates card data before rendering

---

← [Back to README.md](../README.md)
