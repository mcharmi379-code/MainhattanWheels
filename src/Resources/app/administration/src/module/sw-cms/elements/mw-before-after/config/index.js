import template from './sw-cms-el-config-mw-before-after.html.twig';
import './sw-cms-el-config-mw-before-after.scss';

const { Mixin } = Shopware;

export default {
    template,

    emits: ['element-update'],

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            activeItemIndex: 0,
            beforeMediaModalOpen: false,
            afterMediaModalOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        columnsOptions() {
            return [2, 3, 4, 5].map((value) => ({ value, label: String(value) }));
        },

        items() {
            return this.element?.config?.items?.value ?? [];
        },

        activeItem() {
            return this.items[this.activeItemIndex] ?? null;
        },

        beforeUploadTag() {
            return `mw-before-after-before-${this.element?.id}-${this.activeItemIndex}`;
        },

        afterUploadTag() {
            return `mw-before-after-after-${this.element?.id}-${this.activeItemIndex}`;
        },

        beforePreview() {
            return this.activeItem?.beforeImageUrl ?? null;
        },

        afterPreview() {
            return this.activeItem?.afterImageUrl ?? null;
        },
    },

    created() {
        this.initElementConfig('mw-before-after');
        this.ensureItemsArray();
    },

    methods: {
        ensureItemsArray() {
            if (this.element?.config?.items && !Array.isArray(this.element.config.items.value)) {
                this.element.config.items.value = [];
            }
        },

        onInput() {
            this.$emit('element-update', this.element);
        },

        addItem() {
            this.element.config.items.value.push({
                heading: 'New Rim Section',
                headingColor: '#e06600',
                subHeading: '',
                beforeImage: null,
                beforeImageUrl: null,
                beforeText: 'Before: ',
                beforeTextColor: '#e06600',
                afterImage: null,
                afterImageUrl: null,
                afterText: 'Afterwards: ',
                afterTextColor: '#e06600',
            });
            this.activeItemIndex = this.items.length - 1;
            this.onInput();
        },

        removeItem(index) {
            this.element.config.items.value.splice(index, 1);
            if (this.activeItemIndex >= this.items.length) {
                this.activeItemIndex = Math.max(0, this.items.length - 1);
            }
            this.onInput();
        },

        selectItem(index) {
            this.activeItemIndex = index;
        },

        updateActiveField(field, value) {
            if (!this.activeItem) {
                return;
            }
            this.element.config.items.value[this.activeItemIndex][field] = value;
            this.onInput();
        },

        async onBeforeImageUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.element.config.items.value[this.activeItemIndex].beforeImage = media.id;
            this.element.config.items.value[this.activeItemIndex].beforeImageUrl = media.url;
            this.onInput();
        },

        onBeforeImageRemove() {
            this.element.config.items.value[this.activeItemIndex].beforeImage = null;
            this.element.config.items.value[this.activeItemIndex].beforeImageUrl = null;
            this.onInput();
        },

        onBeforeMediaSelection(mediaItems) {
            const media = mediaItems[0];
            this.element.config.items.value[this.activeItemIndex].beforeImage = media.id;
            this.element.config.items.value[this.activeItemIndex].beforeImageUrl = media.url;
            this.beforeMediaModalOpen = false;
            this.onInput();
        },

        async onAfterImageUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.element.config.items.value[this.activeItemIndex].afterImage = media.id;
            this.element.config.items.value[this.activeItemIndex].afterImageUrl = media.url;
            this.onInput();
        },

        onAfterImageRemove() {
            this.element.config.items.value[this.activeItemIndex].afterImage = null;
            this.element.config.items.value[this.activeItemIndex].afterImageUrl = null;
            this.onInput();
        },

        onAfterMediaSelection(mediaItems) {
            const media = mediaItems[0];
            this.element.config.items.value[this.activeItemIndex].afterImage = media.id;
            this.element.config.items.value[this.activeItemIndex].afterImageUrl = media.url;
            this.afterMediaModalOpen = false;
            this.onInput();
        },
    },
};
