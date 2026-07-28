import template from './sw-cms-el-config-mw-tab-cards.html.twig';
import './sw-cms-el-config-mw-tab-cards.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [
        Mixin.getByName('cms-element'),
    ],
    inject: ['repositoryFactory'],

    data() {
        return {
            openAccordionIndex: 0,
            openProductLinkIndices: {},
            cardMediaModals: {},
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        cards() {
            if (!this.element?.config?.cards) {
                return [];
            }
            if (!Array.isArray(this.element.config.cards.value)) {
                this.element.config.cards.value = [];
            }
            return this.element.config.cards.value;
        },
    },

    created() {
        this.initElementConfig('mw-tab-cards');
        this.initElementData('mw-tab-cards');

        if (!this.element.config.cards) {
            this.element.config.cards = {
                source: 'static',
                value: [],
            };
        }
        if (!this.element.config.buttonText) {
            this.element.config.buttonText = { source: 'static', value: 'Sortiment im Shop ansehen →' };
        }
        if (!this.element.config.buttonUrl) {
            this.element.config.buttonUrl = { source: 'static', value: '' };
        }
        if (!this.element.config.buttonLinkType) {
            this.element.config.buttonLinkType = { source: 'static', value: 'internal' };
        }
        if (!this.element.config.buttonTarget) {
            this.element.config.buttonTarget = { source: 'static', value: '_self' };
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        toggleAccordion(index) {
            this.openAccordionIndex = this.openAccordionIndex === index ? null : index;
        },

        toggleLinkAccordion(cardIndex, linkIndex) {
            const key = `${cardIndex}`;
            const current = this.openProductLinkIndices[key];
            this.openProductLinkIndices = {
                ...this.openProductLinkIndices,
                [key]: current === linkIndex ? null : linkIndex,
            };
        },

        isLinkAccordionOpen(cardIndex, linkIndex) {
            const current = this.openProductLinkIndices[`${cardIndex}`];
            // By default, if current is undefined, open the first link (0)
            if (current === undefined && linkIndex === 0) {
                return true;
            }
            return current === linkIndex;
        },

        addCard() {
            const newIndex = this.cards.length + 1;
            this.cards.push({
                cardTitle: `Card Title ${newIndex}`,
                cardSubtitle: 'OEM FELGENLACKE',
                mediaId: null,
                tabHeadline: `Card Title ${newIndex}`,
                tabSubheadline: '',
                productLinks: [],
            });
            this.openAccordionIndex = this.cards.length - 1;
            this.onInput();
        },

        removeCard(index) {
            this.cards.splice(index, 1);
            if (this.openAccordionIndex >= this.cards.length) {
                this.openAccordionIndex = Math.max(0, this.cards.length - 1);
            }
            this.onInput();
        },

        addProductLink(cardIndex) {
            const card = this.cards[cardIndex];
            if (!card) {
                return;
            }
            if (!Array.isArray(card.productLinks)) {
                card.productLinks = [];
            }
            card.productLinks.push({
                label: '',
                productId: null,
            });
            const newLinkIndex = card.productLinks.length - 1;
            this.openProductLinkIndices = {
                ...this.openProductLinkIndices,
                [`${cardIndex}`]: newLinkIndex,
            };
            this.onInput();
        },

        removeProductLink(cardIndex, linkIndex) {
            const card = this.cards[cardIndex];
            if (card && Array.isArray(card.productLinks)) {
                card.productLinks.splice(linkIndex, 1);
                this.onInput();
            }
        },

        onImageUpload(cardIndex, { targetId }) {
            const card = this.cards[cardIndex];
            if (card) {
                card.mediaId = targetId;
                this.onInput();
            }
        },

        onImageRemove(cardIndex) {
            const card = this.cards[cardIndex];
            if (card) {
                card.mediaId = null;
                this.onInput();
            }
        },

        onSelectionChanges(cardIndex, mediaItems) {
            const media = mediaItems?.[0];
            if (media && this.cards[cardIndex]) {
                this.cards[cardIndex].mediaId = media.id;
                this.onInput();
            }
        },

        onOpenMediaModal(cardIndex) {
            this.cardMediaModals = {
                ...this.cardMediaModals,
                [cardIndex]: true,
            };
        },

        onCloseMediaModal(cardIndex) {
            this.cardMediaModals = {
                ...this.cardMediaModals,
                [cardIndex]: false,
            };
        },

        getMediaUploadTag(index) {
            return `mw-tab-card-media-${this.element.id}-${index}`;
        },
    },
};
