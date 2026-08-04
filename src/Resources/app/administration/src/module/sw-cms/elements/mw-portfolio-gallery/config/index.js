import template from './sw-cms-el-config-mw-portfolio-gallery.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    emits: ['element-update'],
    mixins: [Mixin.getByName('cms-element')],
    created() {
        this.initElementConfig('mw-portfolio-gallery');
    },
    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
