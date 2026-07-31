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

        contentOrderOptions() {
            return [
                { value: 'text-button', label: this.$tc('mw-cms.elements.mwCtaBanner.config.contentOrderTextButton') },
                { value: 'button-text', label: this.$tc('mw-cms.elements.mwCtaBanner.config.contentOrderButtonText') },
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

        onIconUploadSuccess({ targetId }) {
            this.element.config.iconMediaId.value = targetId;
            this.$emit('element-update', this.element);
        },

        onRemoveIcon() {
            this.element.config.iconMediaId.value = null;
            this.$emit('element-update', this.element);
        },
    },
};
