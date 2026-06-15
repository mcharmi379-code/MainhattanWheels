import template from './sw-cms-el-config-mainhattan-icon-feature-bar.html.twig';
import './sw-cms-el-config-mainhattan-icon-feature-bar.scss';

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
            mediaModalIsOpen: false,
            mediaModalItemIndex: null,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        items() {
            return this.element.config.items.value ?? [];
        },

        activeItem() {
            return this.items[this.activeItemIndex] ?? null;
        },

        uploadTag() {
            return `mainhattan-icon-feature-bar-${this.element.id}-${this.activeItemIndex}`;
        },

        activeIconPreview() {
            const item = this.activeItem;
            if (!item) {
                return null;
            }
            return item.iconUrl ?? null;
        },

        isSvg() {
            const item = this.activeItem;
            return item?.iconMimeType === 'image/svg+xml';
        },
    },

    created() {
        this.initElementConfig('mainhattan-icon-feature-bar');
        this.ensureItemsArray();
    },

    methods: {
        ensureItemsArray() {
            if (!Array.isArray(this.element.config.items.value)) {
                this.element.config.items.value = [];
            }
        },

        onInput() {
            this.$emit('element-update', this.element);
        },

        addItem() {
            if (this.items.length >= 4) {
                return;
            }
            this.element.config.items.value.push({
                icon: null,
                iconUrl: null,
                iconMimeType: null,
                svgColor: '',
                heading: '',
                description: '',
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

        async onImageUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.element.config.items.value[this.activeItemIndex].icon = media.id;
            this.element.config.items.value[this.activeItemIndex].iconUrl = media.url;
            this.element.config.items.value[this.activeItemIndex].iconMimeType = media.mimeType;
            this.onInput();
        },

        onImageRemove() {
            this.element.config.items.value[this.activeItemIndex].icon = null;
            this.element.config.items.value[this.activeItemIndex].iconUrl = null;
            this.element.config.items.value[this.activeItemIndex].iconMimeType = null;
            this.onInput();
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseMediaModal() {
            this.mediaModalIsOpen = false;
        },

        onMediaSelection(mediaItems) {
            const media = mediaItems[0];
            this.element.config.items.value[this.activeItemIndex].icon = media.id;
            this.element.config.items.value[this.activeItemIndex].iconUrl = media.url;
            this.element.config.items.value[this.activeItemIndex].iconMimeType = media.mimeType;
            this.mediaModalIsOpen = false;
            this.onInput();
        },
    },
};
