import template from './sw-cms-el-config-mw-file-download.html.twig';
import './sw-cms-el-config-mw-file-download.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    inject: ['repositoryFactory'],
    emits: ['element-update'],
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            downloadModalIsOpen: false,
            downloadPreviewModalIsOpen: false,
            ctaPreviewModalIsOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
        downloadUploadTag() {
            return `mw-file-download-file-${this.element.id}`;
        },
        downloadPreviewUploadTag() {
            return `mw-file-download-preview-${this.element.id}`;
        },
        ctaPreviewUploadTag() {
            return `mw-file-download-cta-preview-${this.element.id}`;
        },
        downloadFileSource() {
            return this.element?.data?.downloadFile ?? this.element?.data?.media ?? null;
        },
        downloadPreviewSource() {
            return this.element?.data?.downloadPreviewImage ?? null;
        },
        ctaPreviewSource() {
            return this.element?.data?.ctaPreviewImage ?? null;
        },
    },

    created() {
        this.initElementConfig('mw-file-download');
        this.initElementData('mw-file-download');
        this.loadExistingMedia();
    },

    methods: {
        onUpdate() {
            this.$emit('element-update', this.element);
        },
        syncConfigValue(key, value) {
            if (!this.element.config[key]) {
                this.element.config[key] = { source: 'static', value };
                return;
            }

            this.element.config[key].value = value;
            this.element.config[key].source = 'static';
        },
        async loadExistingMedia() {
            const downloadFileId = this.element?.config?.downloadFileId?.value;
            const downloadPreviewImageId = this.element?.config?.downloadPreviewImageId?.value;
            const ctaPreviewImageId = this.element?.config?.ctaPreviewImageId?.value;

            if (downloadFileId) {
                try {
                    const downloadFile = await this.mediaRepository.get(downloadFileId);
                    this.updateElementData({ downloadFile });
                } catch {}
            }

            if (downloadPreviewImageId) {
                try {
                    const downloadPreviewImage = await this.mediaRepository.get(downloadPreviewImageId);
                    this.updateElementData({ downloadPreviewImage });
                } catch {}
            }

            if (ctaPreviewImageId) {
                try {
                    const ctaPreviewImage = await this.mediaRepository.get(ctaPreviewImageId);
                    this.updateElementData({ ctaPreviewImage });
                } catch {}
            }
        },
        async onDownloadUploadFinish({ targetId }) {
            const downloadFile = await this.mediaRepository.get(targetId);
            this.syncConfigValue('downloadFileId', downloadFile.id);
            this.syncConfigValue('downloadFileUrl', downloadFile.url || '');
            this.updateElementData({ downloadFile });
            this.onUpdate();
        },
        async onDownloadPreviewUploadFinish({ targetId }) {
            const downloadPreviewImage = await this.mediaRepository.get(targetId);
            this.syncConfigValue('downloadPreviewImageId', downloadPreviewImage.id);
            this.syncConfigValue('downloadPreviewImageUrl', downloadPreviewImage.url || '');
            this.updateElementData({ downloadPreviewImage });
            this.onUpdate();
        },
        async onCtaPreviewUploadFinish({ targetId }) {
            const ctaPreviewImage = await this.mediaRepository.get(targetId);
            this.syncConfigValue('ctaPreviewImageId', ctaPreviewImage.id);
            this.syncConfigValue('ctaPreviewImageUrl', ctaPreviewImage.url || '');
            this.updateElementData({ ctaPreviewImage });
            this.onUpdate();
        },
        onRemoveDownload() {
            this.syncConfigValue('downloadFileId', null);
            this.syncConfigValue('downloadFileUrl', '');
            this.updateElementData({ downloadFile: null });
            this.onUpdate();
        },
        onRemoveDownloadPreview() {
            this.syncConfigValue('downloadPreviewImageId', null);
            this.syncConfigValue('downloadPreviewImageUrl', '');
            this.updateElementData({ downloadPreviewImage: null });
            this.onUpdate();
        },
        onRemoveCtaPreview() {
            this.syncConfigValue('ctaPreviewImageId', null);
            this.syncConfigValue('ctaPreviewImageUrl', '');
            this.updateElementData({ ctaPreviewImage: null });
            this.onUpdate();
        },
        onSelectDownload(mediaEntities) {
            const media = mediaEntities?.[0];
            if (!media) return;
            this.syncConfigValue('downloadFileId', media.id);
            this.syncConfigValue('downloadFileUrl', media.url || '');
            this.updateElementData({ downloadFile: media });
            this.onUpdate();
        },
        onSelectDownloadPreview(mediaEntities) {
            const media = mediaEntities?.[0];
            if (!media) return;
            this.syncConfigValue('downloadPreviewImageId', media.id);
            this.syncConfigValue('downloadPreviewImageUrl', media.url || '');
            this.updateElementData({ downloadPreviewImage: media });
            this.onUpdate();
        },
        onSelectCtaPreview(mediaEntities) {
            const media = mediaEntities?.[0];
            if (!media) return;
            this.syncConfigValue('ctaPreviewImageId', media.id);
            this.syncConfigValue('ctaPreviewImageUrl', media.url || '');
            this.updateElementData({ ctaPreviewImage: media });
            this.onUpdate();
        },
        updateElementData({ downloadFile = undefined, downloadPreviewImage = undefined, ctaPreviewImage = undefined }) {
            if (!this.element.data) {
                this.element.data = {};
            }
            if (downloadFile !== undefined) this.element.data.downloadFile = downloadFile;
            if (downloadPreviewImage !== undefined) this.element.data.downloadPreviewImage = downloadPreviewImage;
            if (ctaPreviewImage !== undefined) this.element.data.ctaPreviewImage = ctaPreviewImage;
        },
    },
};
