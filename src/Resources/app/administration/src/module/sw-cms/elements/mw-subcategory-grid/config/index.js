import template from './sw-cms-el-config-mw-subcategory-grid.html.twig';
import './sw-cms-el-config-mw-subcategory-grid.scss';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],
    inject: ['repositoryFactory'],
    emits: ['element-update'],

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('category');
        },
        categoryCriteria() {
            return new Criteria(1, 25);
        },
    },

    created() {
        this.initElementConfig('mw-subcategory-grid');
    },

    methods: {
        onUpdate() {
            this.$emit('element-update', this.element);
        },
    },
};
