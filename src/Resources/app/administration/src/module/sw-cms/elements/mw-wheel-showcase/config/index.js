import template from './sw-cms-el-config-mw-wheel-showcase.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    inject: ['repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        productRepository() {
            return this.repositoryFactory.create('product');
        },

        criteria() {
            const { Criteria } = Shopware.Data;
            const criteria = new Criteria(1, 25);
            criteria.addAssociation('cover.media');
            return criteria;
        },

        cards() {
            return this.element.config.cards.value;
        },
    },

    created() {
        this.initElementConfig('mw-wheel-showcase');

        if (!this.element.config.cards) {
            this.$set(this.element.config, 'cards', {
                source: 'static',
                value: [],
            });
        }

        if (!Array.isArray(this.element.config.cards.value) || this.element.config.cards.value.length === 0) {
            this.$set(this.element.config.cards, 'value', [
                { title: '', productId: null, open: true },
                { title: '', productId: null, open: false },
            ]);
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        addCard() {
            this.element.config.cards.value = [...this.cards, { title: '', productId: null, open: true }];
            this.onInput();
        },

        removeCard(index) {
            this.element.config.cards.value = this.cards.filter((_, cardIndex) => cardIndex !== index);
            this.onInput();
        },

        updateCard(index, field, value) {
            this.element.config.cards.value = this.cards.map((card, cardIndex) => (
                cardIndex === index ? { ...card, [field]: value } : card
            ));
            this.onInput();
        },
    },
};
