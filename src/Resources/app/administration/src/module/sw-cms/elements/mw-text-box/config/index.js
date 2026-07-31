import template from './sw-cms-el-config-mw-text-box.html.twig';
import './sw-cms-el-config-mw-text-box.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.initElementConfig('mw-text-box');
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
