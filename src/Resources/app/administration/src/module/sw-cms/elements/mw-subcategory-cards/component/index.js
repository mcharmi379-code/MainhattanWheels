import template from './sw-cms-el-mw-subcategory-cards.html.twig';
import './sw-cms-el-mw-subcategory-cards.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        cards() {
            return this.element?.config?.cards?.value || [];
        },
    },

    created() {
        this.initElementConfig('mw-subcategory-cards');
        this.initElementData('mw-subcategory-cards');
    },
};
