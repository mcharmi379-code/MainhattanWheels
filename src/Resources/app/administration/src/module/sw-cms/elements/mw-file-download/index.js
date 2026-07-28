const ELEMENT_NAME = 'mw-file-download';

Shopware.Component.register('sw-cms-el-preview-mw-file-download', () => import('./preview'));
Shopware.Component.register('sw-cms-el-mw-file-download', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-file-download', () => import('./config'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwFileDownload.label',
    component: 'sw-cms-el-mw-file-download',
    configComponent: 'sw-cms-el-config-mw-file-download',
    previewComponent: 'sw-cms-el-preview-mw-file-download',
    defaultConfig: {
        downloadTitle: { source: 'static', value: 'Richtmaschinen PDF-Katalog' },
        downloadSubtitle: { source: 'static', value: 'Alle technischen Details und Produktinformationen zum Download' },
        downloadButtonText: { source: 'static', value: 'Herunterladen' },
        downloadButtonUrl: { source: 'static', value: '' },
        downloadFileId: { source: 'static', value: null, required: false },
        downloadFileUrl: { source: 'static', value: '' },
        downloadPreviewImageId: { source: 'static', value: null, required: false },
        downloadPreviewImageUrl: { source: 'static', value: '' },

        ctaTitle: { source: 'static', value: 'Vorführung oder Angebot erwünscht?' },
        ctaSubtitle: { source: 'static', value: 'Vereinbaren Sie noch heute einen Termin zur Vorführung' },
        ctaButtonText: { source: 'static', value: 'Kontakt aufnehmen' },
        ctaButtonUrl: { source: 'static', value: '' },
        ctaPreviewImageId: { source: 'static', value: null, required: false },
        ctaPreviewImageUrl: { source: 'static', value: '' },
    },
    defaultData: {
        downloadFile: null,
        downloadPreviewImage: null,
        ctaPreviewImage: null,
    },
});
