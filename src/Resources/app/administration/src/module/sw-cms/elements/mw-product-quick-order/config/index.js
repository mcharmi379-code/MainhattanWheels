import template from './sw-cms-el-config-mw-product-quick-order.html.twig';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    inject: ['repositoryFactory'],

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
    },

    created() {
        this.initElementConfig('mw-product-quick-order');
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        onProductChange(productId) {
            this.element.config.productId.value = productId;
            this.onInput();
        },
    },
};
