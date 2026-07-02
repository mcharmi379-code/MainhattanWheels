import template from './sw-cms-el-mw-before-after.html.twig';
import './sw-cms-el-mw-before-after.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        columns() {
            return this.element?.config?.columns?.value ?? 3;
        },

        items() {
            return this.element?.config?.items?.value ?? [];
        },
    },

    created() {
        this.initElementConfig('mw-before-after');
    },
};
