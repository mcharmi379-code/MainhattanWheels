import template from './sw-cms-el-config-mw-testimonial.html.twig';

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
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `mw-testimonial-image-upload-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.image?.id) {
                return this.element.data.image;
            }

            return this.element.config.imageId.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-testimonial');
        },

        onInput() {
            this.$emit('element-update', this.element);
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.imageId.value = mediaEntity.id;
            this.element.config.imageId.source = 'static';

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.imageId.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.imageId.value = media.id;
            this.element.config.imageId.source = 'static';

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const imageId = media === null ? null : media.id;
            if (!this.element.data) {
                this.$set(this.element, 'data', { imageId, image: media });
            } else {
                this.$set(this.element.data, 'imageId', imageId);
                this.$set(this.element.data, 'image', media);
            }
        },
    },
};
