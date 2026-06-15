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
            if (this.element?.data?.media?.id) {
                return this.element.data.media;
            }
            return this.element.config.media.value;
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
            this.element.config.media.value = media.id;
            this.element.config.media.source = 'static';
            this.updateElementData(media);
            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;
            this.updateElementData(null);
            this.$emit('element-update', this.element);
        },

        onSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            this.element.config.media.value = media.id;
            this.element.config.media.source = 'static';
            this.updateElementData(media);
            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media ? media.id : null;
            if (!this.element.data) {
                this.element.data = { mediaId, media };
                return;
            }
            this.element.data.mediaId = mediaId;
            this.element.data.media = media;
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },
    },
};
