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
    computed: {
        linkTypeOptions() {
            return [
                { value: 'internal', label: this.$tc('mw-cms.elements.mwPortfolioGallery.config.linkTypeInternal') },
                { value: 'external', label: this.$tc('mw-cms.elements.mwPortfolioGallery.config.linkTypeExternal') },
            ];
        },
    },
    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
