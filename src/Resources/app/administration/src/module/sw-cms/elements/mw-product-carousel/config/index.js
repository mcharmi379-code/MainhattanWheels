import template from './sw-cms-el-config-mw-product-carousel.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    inject: ['repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('category');
        },

        categoryCriteria() {
            const { Criteria } = Shopware.Data;
            return new Criteria(1, 25);
        },
    },

    created() {
        this.initElementConfig('mw-product-carousel');
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
