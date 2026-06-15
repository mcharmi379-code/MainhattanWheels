import template from './sw-cms-el-config-mw-category-showcase.html.twig';
import './sw-cms-el-config-mw-category-showcase.scss';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    mixins: [Mixin.getByName('cms-element')],

    inject: ['repositoryFactory'],

    emits: ['element-update'],

    computed: {
        mainCategoryCriteria() {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('active', true));
            return criteria;
        },

        subCategories() {
            if (!Array.isArray(this.element.config.subCategories.value)) {
                this.element.config.subCategories.value = [];
            }

            return this.element.config.subCategories.value;
        },

        visibleCardsOptions() {
            return [2, 3, 4, 5].map((n) => ({
                value: n,
                label: String(n),
            }));
        },
    },

    created() {
        this.initElementConfig('mw-category-showcase');
    },

    methods: {
        emitUpdate() {
            this.$emit('element-update', this.element);
        },

        addSubCategory() {
            this.subCategories.push(null);
            this.emitUpdate();
        },

        removeSubCategory(index) {
            this.subCategories.splice(index, 1);
            this.emitUpdate();
        },

        onSubCategoryChange(value, index) {
            this.subCategories[index] = value || null;
            this.emitUpdate();
        },
    },
};
