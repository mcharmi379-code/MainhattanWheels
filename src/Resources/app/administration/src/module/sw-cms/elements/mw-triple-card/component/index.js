import template from './sw-cms-el-mw-triple-card.html.twig';
import './sw-cms-el-mw-triple-card.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [Mixin.getByName('cms-element')],

    computed: {
        c() {
            return this.element.config;
        },

        leftIcons() {
            return this.c.leftIcons?.value ?? [];
        },
    },

    created() {
        this.initElementConfig('mw-triple-card');
    },
};
