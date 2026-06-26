import template from './sw-cms-el-ict-two-column.html.twig';
import './sw-cms-el-ict-two-column.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    mixins: [Mixin.getByName('cms-element')],
    inject: ['repositoryFactory'],

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        media() {
            return this.element.data?.media || null;
        },
        isPlaceholder() {
            return !this.media;
        },
    },

    created() {
        this.createdComponent();
    },

    mounted() {
        this.syncSlotState();
    },

    updated() {
        this.syncSlotState();
    },

    beforeDestroy() {
        this.clearSlotState();
    },

    methods: {
        createdComponent() {
            this.initElementData('ict-two-column');

            if (!this.element.data) {
                this.element.data = {};
            }
        },

        onInput() {
            this.$emit('element-update', this.element);
        },
        onPlaceholderActivate() {
            if (this.disabled || !this.isPlaceholder) {
                return;
            }

            let parent = this.$parent;

            while (parent) {
                if (typeof parent.onElementButtonClick === 'function') {
                    parent.onElementButtonClick();
                    return;
                }

                parent = parent.$parent;
            }
        },

        syncSlotState() {
            const slotElement = this.$el?.closest('.sw-cms-slot');

            if (!slotElement) {
                return;
            }

            slotElement.classList.add('sw-cms-slot--ict-two-column');
            slotElement.classList.toggle('sw-cms-slot--ict-two-column-placeholder', this.isPlaceholder);
        },

        clearSlotState() {
            const slotElement = this.$el?.closest('.sw-cms-slot');

            if (!slotElement) {
                return;
            }

            slotElement.classList.remove('sw-cms-slot--ict-two-column');
            slotElement.classList.remove('sw-cms-slot--ict-two-column-placeholder');
        },
    },
};
