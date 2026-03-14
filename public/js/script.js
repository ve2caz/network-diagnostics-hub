/**
 * Card Renderer - Renders YAML-based sections and cards dynamically
 */

// Constants for class names and button types
const CLASS_NAMES = {
  CARD_HEADER: 'card__header',
  CARD_TITLE: 'card__title',
  CARD_BADGE: 'card__badge',
  CARD_CONTENT: 'card__content',
  CARD_FOOTER: 'card__footer',
  BTN_PRIMARY: 'btn btn--primary',
  LINK_SECONDARY: 'link-secondary',
  SECTION: 'dashboard-section',
  SECTION_TITLE: 'section-title',
  GRID: 'grid',
  SUBTITLE: 'subtitle',
  CARD: 'card'
};

const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

// Color pool - sufficient color diversity for dynamic assignment
const COLOR_POOL = [
  'green',
  'orange',
  'blue',
  'purple',
  'red',
  'cyan',
  'lime',
  'indigo',
  'rose',
  'teal',
  'amber',
  'violet',
  'fuchsia',
  'yellow',
  'pink'
];

class CardRenderer {
  constructor(dataPath = 'data/data.yaml') {
    this.dataPath = dataPath;
    this.data = null;
    this.container = null;
    this.cardCounter = 0;
  }

  /**
   * Get next color from pool (cycles through based on card index)
   */
  getNextColor() {
    const color = COLOR_POOL[this.cardCounter % COLOR_POOL.length];
    this.cardCounter++;
    return color;
  }

  /**
   * Fetch and parse YAML data using js-yaml library
   */
  async loadData() {
    try {
      // Load js-yaml library from CDN if not already loaded
      if (!window.jsyaml) {
        await this.loadJsYamlLibrary();
      }

      const response = await fetch(this.dataPath);
      if (!response.ok) throw new Error(`Failed to load ${this.dataPath}`);

      const yamlText = await response.text();
      this.data = window.jsyaml.load(yamlText);
      return this.data;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }

  /**
   * Dynamically load js-yaml library from CDN
   */
  loadJsYamlLibrary() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load js-yaml library'));
      document.head.appendChild(script);
    });
  }

  /**
   * Render the page from loaded data
   */
  render(containerId = 'app') {
    if (!this.data) {
      console.error('No data loaded');
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.container = container;
    this.cardCounter = 0; // Reset color counter for each render
    container.innerHTML = '';

    // Render header
    if (this.data.header) {
      container.appendChild(this.renderHeader(this.data.header));
    }

    // Render sections
    if (this.data.sections) {
      for (const section of this.data.sections) {
        container.appendChild(this.renderSection(section));
      }
    }
  }

  /**
   * Render header element
   */
  renderHeader(headerData) {
    const header = document.createElement('header');

    const h1 = document.createElement('h1');
    h1.textContent = headerData.title;

    const p = document.createElement('p');
    p.className = CLASS_NAMES.SUBTITLE;
    p.textContent = headerData.subtitle;

    header.appendChild(h1);
    header.appendChild(p);
    return header;
  }

  /**
   * Render a section with cards
   */
  renderSection(sectionData) {
    const section = document.createElement('section');
    section.className = CLASS_NAMES.SECTION;
    section.id = sectionData.id;

    const title = document.createElement('h2');
    title.className = CLASS_NAMES.SECTION_TITLE;
    title.textContent = sectionData.title;

    const grid = document.createElement('div');
    grid.className = CLASS_NAMES.GRID;

    if (sectionData.cards) {
      for (const cardData of sectionData.cards) {
        grid.appendChild(this.renderCard(cardData));
      }
    }

    section.appendChild(title);
    section.appendChild(grid);
    return section;
  }

  /**
   * Render a single card
   */
  renderCard(cardData) {
    this.validateCard(cardData);

    // Use provided color or auto-assign from pool
    const color = cardData.color || this.getNextColor();

    const card = document.createElement('article');
    card.className = `${CLASS_NAMES.CARD} card--${color}`;
    card.id = cardData.id;

    // Header
    const header = document.createElement('div');
    header.className = CLASS_NAMES.CARD_HEADER;

    const title = document.createElement('h3');
    title.className = CLASS_NAMES.CARD_TITLE;
    title.textContent = cardData.title;

    const badge = document.createElement('span');
    badge.className = CLASS_NAMES.CARD_BADGE;
    badge.textContent = cardData.badge;

    header.appendChild(title);
    header.appendChild(badge);

    // Content
    const content = document.createElement('div');
    content.className = CLASS_NAMES.CARD_CONTENT;
    if (cardData.content) {
      for (const item of cardData.content) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = item.label;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(` ${item.text}`));
        content.appendChild(p);
      }
    }

    // Footer with buttons
    const footer = document.createElement('div');
    footer.className = CLASS_NAMES.CARD_FOOTER;
    if (cardData.buttons) {
      for (const button of cardData.buttons) {
        const link = document.createElement('a');
        link.href = button.url;
        link.target = '_blank';
        link.textContent = button.label;
        link.className = button.type === BUTTON_TYPES.PRIMARY
          ? CLASS_NAMES.BTN_PRIMARY
          : CLASS_NAMES.LINK_SECONDARY;
        footer.appendChild(link);
      }
    }

    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    return card;
  }

  /**
   * Validate card data has required fields
   */
  validateCard(cardData) {
    const required = ['id', 'title', 'badge'];
    for (const field of required) {
      if (!cardData[field]) {
        throw new Error(`Invalid card data: missing required field '${field}'`);
      }
    }
  }

  /**
   * Find an item in a collection by ID
   */
  findById(collection, id) {
    if (!collection) return null;
    return collection.find(item => item.id === id);
  }

  /**
   * Find item index in collection by ID
   */
  findIndexById(collection, id) {
    if (!collection) return -1;
    return collection.findIndex(item => item.id === id);
  }

  /**
   * Find a section by ID
   */
  findSection(sectionId) {
    return this.findById(this.data.sections, sectionId);
  }

  /**
   * Find a card in a section by ID
   */
  findCard(sectionId, cardId) {
    const section = this.findSection(sectionId);
    if (!section) return null;
    return this.findById(section.cards, cardId);
  }

  /**
   * Generic insert into collection (handles insertBeforeId)
   */
  insertIntoCollection(collection, item, insertBeforeId = null) {
    if (!collection) return false;
    if (insertBeforeId) {
      const index = this.findIndexById(collection, insertBeforeId);
      if (index !== -1) {
        collection.splice(index, 0, item);
        return true;
      }
    }
    collection.push(item);
    return true;
  }

  /**
   * Add a new section
   */
  addSection(sectionData, insertBeforeId = null) {
    if (!this.data.sections) this.data.sections = [];
    this.insertIntoCollection(this.data.sections, sectionData, insertBeforeId);
  }

  /**
   * Remove a section by ID
   */
  removeSection(sectionId) {
    if (!this.data.sections) return false;
    const index = this.findIndexById(this.data.sections, sectionId);
    if (index === -1) return false;
    this.data.sections.splice(index, 1);
    return true;
  }

  /**
   * Update a section
   */
  updateSection(sectionId, updates) {
    const section = this.findSection(sectionId);
    if (section) {
      Object.assign(section, updates);
      return true;
    }
    return false;
  }

  /**
   * Add a card to a section
   */
  addCard(sectionId, cardData, insertBeforeId = null) {
    const section = this.findSection(sectionId);
    if (!section) return false;
    if (!section.cards) section.cards = [];
    this.insertIntoCollection(section.cards, cardData, insertBeforeId);
    return true;
  }

  /**
   * Remove a card from a section
   */
  removeCard(sectionId, cardId) {
    const section = this.findSection(sectionId);
    if (!section || !section.cards) return false;
    const index = this.findIndexById(section.cards, cardId);
    if (index === -1) return false;
    section.cards.splice(index, 1);
    return true;
  }

  /**
   * Update a card in a section
   */
  updateCard(sectionId, cardId, updates) {
    const card = this.findCard(sectionId, cardId);
    if (card) {
      Object.assign(card, updates);
      return true;
    }
    return false;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  const renderer = new CardRenderer('data/data.yaml');
  await renderer.loadData();
  renderer.render('app');

  // Expose public API only (limit direct state access)
  window.cardRenderer = {
    render: () => renderer.render('app'),
    addSection: (data, beforeId) => { renderer.addSection(data, beforeId); renderer.render('app'); },
    removeSection: (id) => { if (renderer.removeSection(id)) renderer.render('app'); },
    updateSection: (id, updates) => { if (renderer.updateSection(id, updates)) renderer.render('app'); },
    addCard: (sectionId, data, beforeId) => { if (renderer.addCard(sectionId, data, beforeId)) renderer.render('app'); },
    removeCard: (sectionId, cardId) => { if (renderer.removeCard(sectionId, cardId)) renderer.render('app'); },
    updateCard: (sectionId, cardId, updates) => { if (renderer.updateCard(sectionId, cardId, updates)) renderer.render('app'); }
  };
});
