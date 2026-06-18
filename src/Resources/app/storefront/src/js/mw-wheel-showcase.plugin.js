import Plugin from 'src/plugin-system/plugin.class';

export default class MwWheelShowcasePlugin extends Plugin {
    init() {
        console.log('[MwWheelShowcasePlugin] Initializing...');

        // Only run if we are on a page containing the wheel grid
        if (!document.querySelector('.cms-element-mainhattan-listing-heading-image')) {
            console.log('[MwWheelShowcasePlugin] Grid element not found on page, skipping initialization.');
            return;
        }

        this.wheelData = null;
        this.modalElement = null;

        this._loadWheelData();
    }

    _getAssetUrl(path) {
        const pathname = window.location.pathname;
        const publicIndex = pathname.indexOf('/public/');
        if (publicIndex !== -1) {
            const basePath = pathname.substring(0, publicIndex + 8); // e.g. "/sw66101/public/"
            return basePath + path;
        }
        return '/' + path;
    }

    _loadWheelData() {
        const jsonUrl = this._getAssetUrl('bundles/mainhattanwheels/wheel-data.json');
        console.log('[MwWheelShowcasePlugin] Fetching wheel data from:', jsonUrl);

        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load wheel data JSON, status: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                this.wheelData = data;
                console.log('[MwWheelShowcasePlugin] Wheel data loaded successfully. Total items:', Object.keys(data).length);
                this._setupListingListeners();
                this._createModalContainer();
            })
            .catch(error => {
                console.error('[MwWheelShowcasePlugin] Error loading wheel data:', error);
            });
    }

    _setupListingListeners() {
        const links = document.querySelectorAll('.cms-element-mainhattan-listing-heading-image a');
        console.log('[MwWheelShowcasePlugin] Setting up click listeners for listing items. Found links:', links.length);
        
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href) return;

                const slug = this._getSlugFromUrl(href);
                if (slug && this.wheelData[slug]) {
                    console.log('[MwWheelShowcasePlugin] Grid item clicked. Slug:', slug);
                    event.preventDefault();
                    this._openShowcaseModal(slug);
                }
            });
        });
    }

    _getSlugFromUrl(url) {
        try {
            const parsed = new URL(url, window.location.origin);
            const path = parsed.pathname;
            const segments = path.split('/').filter(Boolean);
            return segments[segments.length - 1] || null;
        } catch (e) {
            return null;
        }
    }

    _createModalContainer() {
        if (document.getElementById('mw-wheel-showcase-modal')) {
            this.modalElement = document.getElementById('mw-wheel-showcase-modal');
            return;
        }

        const modalHtml = `
            <div class="mw-wheel-showcase-modal" id="mw-wheel-showcase-modal">
                <div class="mw-wheel-showcase-modal__content">
                    <span class="mw-wheel-showcase-modal__close">&times;</span>
                    <div class="mw-wheel-showcase">
                        <!-- Big Box containing details for the selected wheel -->
                        <div class="mw-wheel-showcase__detail-container">
                            <div class="mw-wheel-showcase__detail-box is--active" id="modal-detail-box">
                                <!-- Filled dynamically -->
                            </div>
                        </div>
                        <!-- Horizontal scrollable row of all wheels -->
                        <div class="mw-wheel-showcase__list-row" id="modal-list-row">
                            <!-- Filled dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHtml.trim();
        this.modalElement = tempDiv.firstChild;
        document.body.appendChild(this.modalElement);

        const closeBtn = this.modalElement.querySelector('.mw-wheel-showcase-modal__close');
        closeBtn.addEventListener('click', () => this._closeShowcaseModal());

        this.modalElement.addEventListener('click', (event) => {
            if (event.target === this.modalElement) {
                this._closeShowcaseModal();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modalElement.classList.contains('is--open')) {
                this._closeShowcaseModal();
            }
        });
        
        console.log('[MwWheelShowcasePlugin] Modal container created and appended.');
    }

    _openShowcaseModal(slug) {
        if (!this.wheelData || !this.wheelData[slug]) return;

        this._renderWheelDetails(slug);
        this._renderWheelList(slug);

        this.modalElement.classList.add('is--open');
        document.body.style.overflow = 'hidden';
        
        const activeThumb = this.modalElement.querySelector('.mw-wheel-showcase__list-item.is--active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    _closeShowcaseModal() {
        this.modalElement.classList.remove('is--open');
        document.body.style.overflow = '';
    }

    _renderWheelDetails(slug) {
        const wheel = this.wheelData[slug];
        const detailBox = this.modalElement.querySelector('#modal-detail-box');
        if (!detailBox || !wheel) return;

        detailBox.innerHTML = this._buildDetailBoxHtml(slug, wheel);
        this._registerDetailBoxEvents(detailBox);
    }

    _renderWheelList(activeSlug) {
        const listRow = this.modalElement.querySelector('#modal-list-row');
        if (!listRow) return;

        listRow.innerHTML = this._buildListRowHtml(activeSlug);

        const listItems = listRow.querySelectorAll('.mw-wheel-showcase__list-item');
        listItems.forEach(item => {
            item.addEventListener('click', () => {
                const slug = item.getAttribute('data-target-slug');
                if (slug && this.wheelData[slug]) {
                    this._renderWheelDetails(slug);
                    listItems.forEach(li => li.classList.remove('is--active'));
                    item.classList.add('is--active');
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        });
    }

    _registerDetailBoxEvents(detailBox) {
        const galleryThumbs = detailBox.querySelectorAll('.mw-wheel-showcase__gallery-thumb');
        const bigImg = detailBox.querySelector('.js-showcase-big-img');

        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                galleryThumbs.forEach(t => t.classList.remove('is--active'));
                thumb.classList.add('is--active');

                const newSrc = thumb.getAttribute('data-img-src');
                if (bigImg && newSrc) {
                    bigImg.setAttribute('src', newSrc);
                }
            });
        });
    }

    _buildDetailBoxHtml(slug, wheel) {
        const title = wheel.title || '';
        const themenbereich = wheel.themenbereich || '';
        const farbkategorie = wheel.farbkategorie || '';
        const oberflaechenaufbau = wheel.oberflaechenaufbau || '';
        const bearbeitungsschritte = wheel.bearbeitungsschritte || [];
        const images = wheel.images || [];

        const bigImgUrl = images.length > 0 ? images[0] : '';

        let thumbsHtml = '';
        if (images.length > 1) {
            thumbsHtml = '<div class="mw-wheel-showcase__gallery-thumbs">';
            images.forEach((img, index) => {
                const activeClass = index === 0 ? 'is--active' : '';
                thumbsHtml += `
                    <div class="mw-wheel-showcase__gallery-thumb ${activeClass}" data-img-src="${img}">
                        <img src="${img}" alt="${title}" />
                    </div>
                `;
            });
            thumbsHtml += '</div>';
        }

        let attrHtml = '';
        if (themenbereich) {
            attrHtml += `
                <div class="mw-wheel-showcase__attr-row">
                    <span class="mw-wheel-showcase__attr-label">Themenbereich:</span>
                    <span class="mw-wheel-showcase__attr-value">${themenbereich}</span>
                </div>
            `;
        }
        if (farbkategorie) {
            attrHtml += `
                <div class="mw-wheel-showcase__attr-row">
                    <span class="mw-wheel-showcase__attr-label">Farbkategorie:</span>
                    <span class="mw-wheel-showcase__attr-value">${farbkategorie}</span>
                </div>
            `;
        }
        if (oberflaechenaufbau) {
            attrHtml += `
                <div class="mw-wheel-showcase__attr-row">
                    <span class="mw-wheel-showcase__attr-label">Oberflächenaufbau:</span>
                    <span class="mw-wheel-showcase__attr-value">${oberflaechenaufbau}</span>
                </div>
            `;
        }

        let stepsHtml = '';
        if (bearbeitungsschritte.length > 0) {
            stepsHtml += `
                <div class="mw-wheel-showcase__steps-section">
                    <div class="mw-wheel-showcase__steps-title">Bearbeitungsschritte</div>
                    <ul class="mw-wheel-showcase__steps-list">
            `;
            bearbeitungsschritte.forEach(step => {
                stepsHtml += `<li>${step}</li>`;
            });
            stepsHtml += `
                    </ul>
                </div>
            `;
        }

        return `
            <div class="mw-wheel-showcase__media-area">
                <div class="mw-wheel-showcase__big-image">
                    ${bigImgUrl ? `<img src="${bigImgUrl}" alt="${title}" class="js-showcase-big-img" />` : '<div class="mw-wheel-showcase__placeholder-img">No Image</div>'}
                </div>
                ${thumbsHtml}
            </div>
            <div class="mw-wheel-showcase__info-area">
                <div class="mw-wheel-showcase__header">
                    <h3 class="mw-wheel-showcase__product-name">${title}</h3>
                    <div class="mw-wheel-showcase__subtitle">
                        Felgen Pulver + Lack: ${title}
                    </div>
                </div>
                <div class="mw-wheel-showcase__attributes">
                    ${attrHtml}
                </div>
                ${stepsHtml}
                <div class="mw-wheel-showcase__footer-actions">
                    <div class="mw-wheel-showcase__price-info">
                        Je Felge ab EUR 450,- inkl. MwSt.
                    </div>
                    <div class="mw-wheel-showcase__buttons">
                        <a href="/anfrage-felgenbearbeitung" class="btn btn-primary mw-wheel-showcase__action-btn">
                            Jetzt Angebot anfordern!
                        </a>
                    </div>
                    <div class="mw-wheel-showcase__360-badge">
                        <span class="mw-wheel-showcase__360-label">zur 360° Ansicht wechseln</span>
                        <div class="mw-wheel-showcase__360-graphic">
                            <svg viewBox="0 0 100 60" class="mw-wheel-showcase__360-svg">
                                <path d="M 10 30 C 10 45, 90 45, 90 30 C 90 15, 10 15, 10 30" fill="none" stroke="#ff6600" stroke-width="3" stroke-dasharray="8 4" />
                                <polygon points="50,40 60,45 50,50" fill="#ff6600" />
                                <text x="50" y="35" font-size="16" font-weight="bold" text-anchor="middle" fill="#1a1a1a">360°</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    _buildListRowHtml(activeSlug) {
        let html = '';
        Object.keys(this.wheelData).forEach(slug => {
            const wheel = this.wheelData[slug];
            const isActive = slug === activeSlug ? 'is--active' : '';
            const imgUrl = wheel.images.length > 0 ? wheel.images[0] : '';
            html += `
                <div class="mw-wheel-showcase__list-item ${isActive}" data-target-slug="${slug}">
                    <div class="mw-wheel-showcase__list-item-media">
                        ${imgUrl ? `<img src="${imgUrl}" alt="${wheel.title}" />` : '<div class="mw-wheel-showcase__list-item-placeholder">No Image</div>'}
                    </div>
                    <div class="mw-wheel-showcase__list-item-name">
                        ${wheel.title}
                    </div>
                </div>
            `;
        });
        return html;
    }
}
