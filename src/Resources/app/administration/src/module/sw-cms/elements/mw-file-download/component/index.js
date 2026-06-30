import template from './sw-cms-el-mw-file-download.html.twig';
import './sw-cms-el-mw-file-download.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        downloadTitle() { return this.element?.config?.downloadTitle?.value || ''; },
        downloadSubtitle() { return this.element?.config?.downloadSubtitle?.value || ''; },
        downloadButtonText() { return this.element?.config?.downloadButtonText?.value || 'Herunterladen'; },
        downloadButtonUrl() { return this.element?.config?.downloadButtonUrl?.value || ''; },
        ctaTitle() { return this.element?.config?.ctaTitle?.value || ''; },
        ctaSubtitle() { return this.element?.config?.ctaSubtitle?.value || ''; },
        ctaButtonText() { return this.element?.config?.ctaButtonText?.value || ''; },
        ctaButtonUrl() { return this.element?.config?.ctaButtonUrl?.value || ''; },
        downloadFile() { return this.element?.data?.downloadFile || null; },
        downloadPreviewImage() { return this.element?.data?.downloadPreviewImage || null; },
        ctaPreviewImage() { return this.element?.data?.ctaPreviewImage || null; },
    },

    created() {
        this.initElementConfig('mw-file-download');
        this.initElementData('mw-file-download');
    },
};
