import template from './sw-cms-el-config-ict-hero-section-simple.html.twig';
import './config.scss';

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
            mediaModalIsOpen: false,
            mediaModalVideoIsOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-ict-hero-section-${this.element.id}`;
        },

        uploadVideoTag() {
            return `cms-element-ict-hero-section-video-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.backgroundMedia?.id) {
                return this.element.data.backgroundMedia;
            }
            return this.element.config.backgroundMedia.value;
        },

        previewVideoSource() {
            if (this.element?.data?.video?.id) {
                return this.element.data.video;
            }
            return this.element.config?.backgroundVideo?.value || null;
        },
    },

    created() {
        this.initElementConfig('ict-hero-section');
        this.initElementData('ict-hero-section');
        if (this.element && this.element.config) {
            if (!this.element.config.textAlignment) {
                this.element.config.textAlignment = {
                    source: 'static',
                    value: 'left',
                };
            }
            if (!this.element.config.backgroundVideo) {
                this.element.config.backgroundVideo = {
                    source: 'static',
                    value: null,
                };
            }
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        async onImageUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.element.config.backgroundMedia.value = media.id;
            this.element.config.backgroundMedia.source = 'static';
            this.updateElementData(media);
            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.backgroundMedia.value = null;
            this.updateElementData(null);
            this.$emit('element-update', this.element);
        },

        onSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            this.element.config.backgroundMedia.value = media.id;
            this.element.config.backgroundMedia.source = 'static';
            this.updateElementData(media);
            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media ? media.id : null;
            if (!this.element.data) {
                this.element.data = { backgroundMediaId: mediaId, backgroundMedia: media };
                return;
            }
            this.element.data.backgroundMediaId = mediaId;
            this.element.data.backgroundMedia = media;
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        async onVideoUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            if (!this.element.config.backgroundVideo) {
                this.element.config.backgroundVideo = {
                    source: 'static',
                    value: null,
                };
            }
            this.element.config.backgroundVideo.value = media.id;
            this.element.config.backgroundVideo.source = 'static';
            this.updateVideoData(media);
            this.$emit('element-update', this.element);
        },

        onVideoRemove() {
            if (this.element.config.backgroundVideo) {
                this.element.config.backgroundVideo.value = null;
            }
            this.updateVideoData(null);
            this.$emit('element-update', this.element);
        },

        onVideoSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            if (!this.element.config.backgroundVideo) {
                this.element.config.backgroundVideo = {
                    source: 'static',
                    value: null,
                };
            }
            this.element.config.backgroundVideo.value = media.id;
            this.element.config.backgroundVideo.source = 'static';
            this.updateVideoData(media);
            this.$emit('element-update', this.element);
        },

        updateVideoData(media = null) {
            const mediaId = media ? media.id : null;
            if (!this.element.data) {
                this.element.data = {};
            }
            this.element.data.backgroundVideoId = mediaId;
            this.element.data.video = media;
        },

        onOpenMediaVideoModal() {
            this.mediaModalVideoIsOpen = true;
        },

        onCloseVideoModal() {
            this.mediaModalVideoIsOpen = false;
        },
    },
};
