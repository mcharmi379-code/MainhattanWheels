import template from './sw-cms-el-config-mw-media-tabs.html.twig';
import './sw-cms-el-config-mw-media-tabs.scss';

const { Mixin } = Shopware;

const createTab = (index = 1, media = null) => ({
    eyebrow: '',
    title: `Tab ${index}`,
    contentTitle: `Tab ${index} content`,
    content: '<p>Add tab content here.</p>',
    mediaId: media?.id || null,
    mediaUrl: media?.url || '',
    mediaMimeType: media?.mimeType || media?.mimeTypeRaw || '',
    mediaType: media?.mediaType?.name === 'VIDEO' || (media?.mimeType || '').startsWith('video/') ? 'video' : 'image',
    contentMediaType: 'image',
    contentMediaId: null,
    contentMediaUrl: '',
    contentMediaMimeType: '',
    textColor: '#1f2024',
    backgroundColor: '#ffffff',
});

export default {
    template,
    compatConfig: Shopware.compatConfig,
    emits: ['element-update'],
    inject: ['repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeIndex: 0,
            mediaModalIndex: null,
            contentMediaModalIndex: null,
            bulkMediaModalOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        tabs() {
            if (!Array.isArray(this.element.config.tabs.value)) {
                this.element.config.tabs.value = [];
            }
            return this.element.config.tabs.value;
        },

        activeTab() {
            return this.tabs[this.activeIndex] || null;
        },
    },

    created() {
        this.initElementConfig('mw-media-tabs');
        if (!Array.isArray(this.element.config.tabs.value) || this.element.config.tabs.value.length === 0) {
            this.element.config.tabs.value = [createTab(1), createTab(2), createTab(3)];
            this.onInput();
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        addTab(media = null) {
            this.element.config.tabs.value = [...this.tabs, createTab(this.tabs.length + 1, media)];
            this.activeIndex = this.tabs.length - 1;
            this.onInput();
        },

        removeTab(index) {
            const next = this.tabs.filter((_, tabIndex) => tabIndex !== index);
            this.element.config.tabs.value = next.length ? next : [createTab(1)];
            this.activeIndex = Math.max(0, Math.min(this.activeIndex, this.element.config.tabs.value.length - 1));
            this.onInput();
        },

        duplicateTab(index) {
            const copy = JSON.parse(JSON.stringify(this.tabs[index]));
            copy.title = `${copy.title || 'Tab'} copy`;
            this.element.config.tabs.value = [
                ...this.tabs.slice(0, index + 1),
                copy,
                ...this.tabs.slice(index + 1),
            ];
            this.activeIndex = index + 1;
            this.onInput();
        },

        moveTab(index, direction) {
            const target = index + direction;
            if (target < 0 || target >= this.tabs.length) return;
            const next = [...this.tabs];
            const [item] = next.splice(index, 1);
            next.splice(target, 0, item);
            this.element.config.tabs.value = next;
            this.activeIndex = target;
            this.onInput();
        },

        updateTab(field, value) {
            if (!this.activeTab) return;
            this.activeTab[field] = value;
            this.onInput();
        },

        getUploadTag(index) {
            return `mw-media-tabs-${this.element.id}-${index}`;
        },

        openMediaModal(index) {
            this.mediaModalIndex = index;
        },

        closeMediaModal() {
            this.mediaModalIndex = null;
            this.contentMediaModalIndex = null;
            this.bulkMediaModalOpen = false;
        },

        openBulkMediaModal() {
            this.bulkMediaModalOpen = true;
        },

        async onUploadFinish(index, event) {
            if (!event?.targetId) return;
            const media = await this.mediaRepository.get(event.targetId);
            this.setTabMedia(index, media);
        },

        async onContentUploadFinish(index, event) {
            if (!event?.targetId) return;
            const media = await this.mediaRepository.get(event.targetId);
            this.setTabContentMedia(index, media);
        },

        onMediaSelection(index, mediaItems) {
            const media = mediaItems?.[0];
            if (!media) return;
            this.setTabMedia(index, media);
            this.closeMediaModal();
        },

        onContentMediaSelection(index, mediaItems) {
            const media = mediaItems?.[0];
            if (!media) return;
            this.setTabContentMedia(index, media);
            this.closeMediaModal();
        },

        onBulkMediaSelection(mediaItems) {
            if (!mediaItems || mediaItems.length === 0) return;
            const newTabs = mediaItems.map((media, index) => createTab(this.tabs.length + index + 1, media));
            this.element.config.tabs.value = [...this.tabs, ...newTabs];
            this.activeIndex = this.tabs.length - 1;
            this.onInput();
            this.closeMediaModal();
        },

        setTabMedia(index, media) {
            const tab = this.tabs[index];
            if (!tab || !media) return;
            tab.mediaId = media.id;
            tab.mediaUrl = media.url;
            tab.mediaMimeType = media.mimeType || '';
            tab.mediaType = media.mediaType?.name === 'VIDEO' || (media.mimeType || '').startsWith('video/') ? 'video' : 'image';
            this.onInput();
        },

        setTabContentMedia(index, media) {
            const tab = this.tabs[index];
            if (!tab || !media) return;
            tab.contentMediaId = media.id;
            tab.contentMediaUrl = media.url;
            tab.contentMediaMimeType = media.mimeType || '';
            tab.contentMediaType = media.mediaType?.name === 'VIDEO' || (media.mimeType || '').startsWith('video/') ? 'video' : 'image';
            this.onInput();
        },

        removeTabMedia(index) {
            const tab = this.tabs[index];
            if (!tab) return;
            tab.mediaId = null;
            tab.mediaUrl = '';
            tab.mediaMimeType = '';
            tab.mediaType = 'image';
            this.onInput();
        },

        removeTabContentMedia(index) {
            const tab = this.tabs[index];
            if (!tab) return;
            tab.contentMediaId = null;
            tab.contentMediaUrl = '';
            tab.contentMediaMimeType = '';
            this.onInput();
        },
    },
};
