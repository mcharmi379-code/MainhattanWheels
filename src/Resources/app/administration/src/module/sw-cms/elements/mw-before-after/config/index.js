import template from './sw-cms-el-config-mw-before-after.html.twig';
import './sw-cms-el-config-mw-before-after.scss';

const { Mixin } = Shopware;

export default {
    template,

    emits: ['element-update', 'update:element'],

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            activeItemIndex: 0,
            draggedItemIndex: null,
            beforeMediaModalOpen: false,
            afterMediaModalOpen: false,
        };
    },

    computed: {
        settingsFields() {
            return this.element?.config ?? {};
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        columnsOptions() {
            return [1, 2, 3, 4, 5].map((value) => ({ value, label: String(value) }));
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
        this.seedDefaultItemsIfNeeded();
    },

    methods: {
        createItem() {
            return {
                id: `mw-before-after-item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                beforeImage: null,
                beforeImageUrl: null,
                beforeText: 'BEFORE',
                beforeTextColor: '#ffffff',
                beforeTextBackgroundColor: '#111827',
                beforeDescription: '',
                afterImage: null,
                afterImageUrl: null,
                afterText: 'AFTER',
                afterTextColor: '#ffffff',
                afterTextBackgroundColor: '#f97316',
                afterDescription: '',
            };
        },

        createDefaultItem(index) {
            const item = this.createItem();

            return {
                ...item,
                beforeText: index === 2 ? 'PREVIOUSLY' : 'BEFORE',
                afterText: index === 0 ? 'AFTER' : 'AFTERWARDS',
            };
        },

        normalizeItem(item) {
            return {
                id: item.id || `mw-before-after-item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                ...item,
                beforeTextColor: item.beforeTextColor ?? '#ffffff',
                beforeTextBackgroundColor: item.beforeTextBackgroundColor ?? '#111827',
                afterTextColor: item.afterTextColor ?? '#ffffff',
                afterTextBackgroundColor: item.afterTextBackgroundColor ?? '#f97316',
                beforeDescription: item.beforeDescription ?? '',
                afterDescription: item.afterDescription ?? '',
            };
        },

        ensureItemsArray() {
            if (this.element?.config?.items && !Array.isArray(this.element.config.items.value)) {
                this.element.config.items.value = [];
            }

            this.element.config.items.value.splice(
                0,
                this.element.config.items.value.length,
                ...this.element.config.items.value.map((item) => this.normalizeItem(item)),
            );
        },

        seedDefaultItemsIfNeeded() {
            if (!this.element.config.itemsInitialized) {
                this.element.config.itemsInitialized = {
                    source: 'static',
                    value: false,
                };
            }

            if (this.element.config.itemsInitialized.value === true) {
                return;
            }

            if (this.items.length === 0) {
                this.element.config.items.value.push(
                    this.createDefaultItem(0),
                    this.createDefaultItem(1),
                    this.createDefaultItem(2),
                );
            }

            this.element.config.itemsInitialized.value = true;
            this.onInput();
        },

        onInput() {
            this.syncElementState();
            this.$emit('update:element', this.element);
            this.$emit('element-update', this.element);
        },

        syncElementState() {
            if (!this.cmsPageState?.selectedBlock?.slots) {
                return;
            }

            const slot = this.cmsPageState.selectedBlock.slots.find((candidate) => {
                return candidate.id === this.element.id || candidate.slot === this.element.slot;
            });

            if (!slot) {
                return;
            }

            slot.config = this.element.config;
            slot.data = this.element.data;
            this.cmsPageState.setBlock(this.cmsPageState.selectedBlock);
        },

        addItem() {
            this.element.config.items.value.push(this.createItem());
            this.activeItemIndex = this.items.length - 1;
            this.onInput();
        },

        removeItem(index) {
            this.element.config.items.value.splice(index, 1);

            if (this.activeItemIndex > index) {
                this.activeItemIndex -= 1;
            } else if (this.activeItemIndex >= this.items.length) {
                this.activeItemIndex = Math.max(0, this.items.length - 1);
            }

            this.onInput();
        },

        reorderItems(fromIndex, toIndex) {
            if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
                return;
            }

            const [movedItem] = this.element.config.items.value.splice(fromIndex, 1);

            if (!movedItem) {
                return;
            }

            this.element.config.items.value.splice(toIndex, 0, movedItem);

            this.activeItemIndex = toIndex;
            this.draggedItemIndex = null;
            this.onInput();
        },

        moveItem(index, direction) {
            this.reorderItems(index, index + direction);
        },

        onItemDragStart(index, event) {
            this.draggedItemIndex = index;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', String(index));
        },

        onItemDragOver(index, event) {
            if (this.draggedItemIndex === null || this.draggedItemIndex === index) {
                return;
            }

            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },

        onItemDrop(index, event) {
            event.preventDefault();

            const sourceIndex = this.draggedItemIndex ?? Number.parseInt(event.dataTransfer.getData('text/plain'), 10);

            if (Number.isNaN(sourceIndex)) {
                return;
            }

            this.reorderItems(sourceIndex, index);
        },

        onItemDragEnd() {
            this.draggedItemIndex = null;
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
