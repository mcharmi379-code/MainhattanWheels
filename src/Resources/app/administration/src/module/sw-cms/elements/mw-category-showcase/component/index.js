import template from './sw-cms-el-mw-category-showcase.html.twig';
import './sw-cms-el-mw-category-showcase.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-category-showcase');
        },
    },
};
