import Plugin from 'src/plugin-system/plugin.class';

export default class MwTechnicalFeatureGallery extends Plugin {
    constructor(element, options = {}) {
        super(element, options, 'MwTechnicalFeatureGallery');
    }

    init() {
        this.items = Array.from(this.el.querySelectorAll('[data-mw-technical-feature-gallery-item]'));
        if (!this.items.length) {
            return;
        }

        this.currentIndex = 0;
        this.modal = null;
        this.boundHandleKeydown = this.handleKeydown.bind(this);

        this.items.forEach((item, index) => {
            item.addEventListener('click', () => this.open(index));
        });
    }

    open(index) {
        this.currentIndex = index;
        if (!this.modal) {
            this.buildModal();
        }

        this.renderCurrent();
        document.body.appendChild(this.modal);
        document.body.classList.add('is--mw-technical-feature-modal-open');
        window.addEventListener('keydown', this.boundHandleKeydown);

        requestAnimationFrame(() => {
            this.modal.classList.add('is--active');
        });
    }

    buildModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'mw-technical-feature-modal';
        this.modal.innerHTML = `
            <div class="mw-technical-feature-modal__dialog" role="dialog" aria-modal="true">
                <button type="button" class="mw-technical-feature-modal__close" aria-label="Close">×</button>
                <button type="button" class="mw-technical-feature-modal__nav mw-technical-feature-modal__nav--prev" aria-label="Previous image">‹</button>
                <button type="button" class="mw-technical-feature-modal__nav mw-technical-feature-modal__nav--next" aria-label="Next image">›</button>
                <img class="mw-technical-feature-modal__image" alt="">
                <div class="mw-technical-feature-modal__caption"></div>
            </div>
        `;

        this.modal.querySelector('.mw-technical-feature-modal__close').addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.close();
            }
        });

        this.modal.querySelector('.mw-technical-feature-modal__nav--prev').addEventListener('click', () => this.prev());
        this.modal.querySelector('.mw-technical-feature-modal__nav--next').addEventListener('click', () => this.next());
    }

    renderCurrent() {
        const item = this.items[this.currentIndex];
        const image = this.modal.querySelector('.mw-technical-feature-modal__image');
        const caption = this.modal.querySelector('.mw-technical-feature-modal__caption');

        image.src = item.dataset.fullSrc || '';
        image.alt = item.dataset.fullAlt || '';
        caption.textContent = item.dataset.fullAlt || '';
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.renderCurrent();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.renderCurrent();
    }

    close() {
        if (!this.modal) {
            return;
        }

        this.modal.classList.remove('is--active');
        document.body.classList.remove('is--mw-technical-feature-modal-open');
        window.removeEventListener('keydown', this.boundHandleKeydown);

        window.setTimeout(() => {
            if (this.modal && this.modal.parentNode) {
                this.modal.parentNode.removeChild(this.modal);
            }
        }, 200);
    }

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.close();
        }

        if (event.key === 'ArrowLeft') {
            this.prev();
        }

        if (event.key === 'ArrowRight') {
            this.next();
        }
    }
}
