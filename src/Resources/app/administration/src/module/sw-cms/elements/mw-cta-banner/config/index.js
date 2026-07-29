import template from './sw-cms-el-config-mw-cta-banner.html.twig';
import './sw-cms-el-config-mw-cta-banner.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        linkTypeOptions() {
            return [
                { value: 'internal', label: this.$tc('mw-cms.elements.mwCtaBanner.config.linkTypeInternal') },
                { value: 'external', label: this.$tc('mw-cms.elements.mwCtaBanner.config.linkTypeExternal') },
            ];
        },
    },

    created() {
        this.initElementConfig('mw-cta-banner');
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
