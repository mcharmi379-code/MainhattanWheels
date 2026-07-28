import Plugin from 'src/plugin-system/plugin.class';

export default class MwTabCardsPlugin extends Plugin {
    init() {
        this._cards = this.el.querySelectorAll('[data-mw-tab-card-index]');
        this._panels = this.el.querySelectorAll('[data-mw-tab-panel-index]');

        if (!this._cards.length || !this._panels.length) {
            return;
        }

        this._registerEvents();
    }

    _registerEvents() {
        this._cards.forEach((card) => {
            card.addEventListener('click', this._onCardClick.bind(this));
        });
    }

    _onCardClick(event) {
        event.preventDefault();
        const clickedCard = event.currentTarget || event.target.closest('[data-mw-tab-card-index]');
        if (!clickedCard) return;

        const index = String(clickedCard.getAttribute('data-mw-tab-card-index'));
        this._activateTab(index);
    }

    _activateTab(index) {
        const strIndex = String(index);

        this._cards.forEach((card) => {
            const cardIndex = String(card.getAttribute('data-mw-tab-card-index'));
            const isActive = cardIndex === strIndex;
            card.classList.toggle('is--active', isActive);
            card.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        this._panels.forEach((panel) => {
            const panelIndex = String(panel.getAttribute('data-mw-tab-panel-index'));
            const isActive = panelIndex === strIndex;
            panel.classList.toggle('is--active', isActive);
            if (isActive) {
                panel.removeAttribute('hidden');
                panel.style.display = 'block';
            } else {
                panel.setAttribute('hidden', 'hidden');
                panel.style.display = 'none';
            }
        });
    }
}
