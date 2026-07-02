import template from './sw-cms-el-config-mw-text-video.html.twig';
import './sw-cms-el-config-mw-text-video.scss';

const { Mixin } = Shopware;

export default {
    template,
    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
            activeTab: 'content',
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.mediaFile) {
                return this.element.data.mediaFile;
            }

            return this.element?.config?.mediaFile?.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-text-video');
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.mediaFile.value = mediaEntity.id;
            this.element.config.mediaFile.source = 'static';

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.mediaFile.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.mediaFile.value = media.id;
            this.element.config.mediaFile.source = 'static';

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;
            if (!this.element.data) {
                this.$set(this.element, 'data', { mediaFileId: mediaId, mediaFile: media });
            } else {
                this.$set(this.element.data, 'mediaFileId', mediaId);
                this.$set(this.element.data, 'mediaFile', media);
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },
    },
};
