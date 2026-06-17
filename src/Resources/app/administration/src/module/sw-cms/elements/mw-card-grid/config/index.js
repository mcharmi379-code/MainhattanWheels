import template from './sw-cms-el-config-mw-card-grid.html.twig';
import './sw-cms-el-config-mw-card-grid.scss';

const { Mixin } = Shopware;

const createCard = () => ({
    iconId: null,
    iconUrl: null,
    iconMimeType: null,
    iconColor: '',
    heading: '',
    headingColor: '',
    subheading: '',
    subheadingColor: '',
    linkType: 'internal',
    linkUrl: '',
    linkNewTab: false,
    hoverColor: '#ff6600',
});

export default {
    template,
    emits: ['element-update'],
    inject: ['repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            mediaModalIndex: null,
            activeCardIndex: 0,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        cards() {
            return this.element.config.cards.value;
        },

        columnsOptions() {
            return [1, 2, 3, 4, 5].map((value) => ({ value, label: String(value) }));
        },

        linkTypeOptions() {
            return [
                { value: 'internal', label: this.$tc('mw-cms.elements.mwCardGrid.config.linkTypeInternal') },
                { value: 'external', label: this.$tc('mw-cms.elements.mwCardGrid.config.linkTypeExternal') },
            ];
        },
    },

    created() {
        this.initElementConfig('mw-card-grid');

        if (!Array.isArray(this.element.config.cards.value) || this.element.config.cards.value.length === 0) {
            this.element.config.cards.value = [createCard(), createCard(), createCard(), createCard()];
        }

        this.normalizeCards();
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        normalizeCards() {
            if (!Array.isArray(this.element.config.cards.value) || this.element.config.cards.value.length < 1) {
                this.element.config.cards.value = [createCard()];
                this.onInput();
            }
        },

        setCards(cards) {
            this.element.config.cards.value = cards.map((card) => ({ ...createCard(), ...card }));
            this.onInput();
        },

        addCard() {
            this.setCards([...this.cards, createCard()]);
            this.activeCardIndex = this.cards.length - 1;
        },

        removeCard(index) {
            const nextCards = this.cards.filter((_, cardIndex) => cardIndex !== index);
            this.setCards(nextCards.length ? nextCards : [createCard()]);
            this.activeCardIndex = Math.min(this.activeCardIndex, this.cards.length - 1);
        },

        openMediaModal(index) {
            this.mediaModalIndex = index;
        },

        async onMediaUpload(index, { targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.updateCard(index, 'iconId', media.id);
            this.updateCard(index, 'iconUrl', media.url);
            this.updateCard(index, 'iconMimeType', media.mimeType);
        },

        async onMediaSelect(index, mediaItems) {
            const media = mediaItems[0];
            this.updateCard(index, 'iconId', media.id);
            this.updateCard(index, 'iconUrl', media.url);
            this.updateCard(index, 'iconMimeType', media.mimeType);
            this.mediaModalIndex = null;
        },

        removeMedia(index) {
            this.updateCard(index, 'iconId', null);
            this.updateCard(index, 'iconUrl', null);
            this.updateCard(index, 'iconMimeType', null);
        },

        isSvg(index) {
            return this.cards[index]?.iconMimeType === 'image/svg+xml';
        },

        updateCard(index, field, value) {
            const nextCards = this.cards.map((card, cardIndex) => (
                cardIndex === index ? { ...card, [field]: value } : card
            ));
            this.setCards(nextCards);
        },
    },
};
