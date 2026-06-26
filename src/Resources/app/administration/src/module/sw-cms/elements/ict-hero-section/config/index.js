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
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-ict-hero-section-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.backgroundMedia?.id) {
                return this.element.data.backgroundMedia;
            }
            return this.element.config.backgroundMedia.value;
        },
    },

    created() {
        this.initElementConfig('ict-hero-section');
        this.initElementData('ict-hero-section');
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
    },
};
