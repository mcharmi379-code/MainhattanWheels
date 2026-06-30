import template from './sw-cms-el-mw-subcategory-grid.html.twig';
import './sw-cms-el-mw-subcategory-grid.scss';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        title() {
            return this.element?.config?.title?.value || '';
        },
        subCategories() {
            return this.element?.data?.subCategories ?? [];
        },
    },

    created() {
        this.initElementConfig('mw-subcategory-grid');
        this.initElementData('mw-subcategory-grid');
    },
};
