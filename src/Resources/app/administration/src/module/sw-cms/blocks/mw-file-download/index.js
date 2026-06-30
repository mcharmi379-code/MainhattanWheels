const BLOCK_NAME = 'mw-file-download';
const ELEMENT_NAME = 'mw-file-download';

Shopware.Component.register('sw-cms-block-mw-file-download', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-file-download-block', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.mwFileDownload.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-file-download',
    previewComponent: 'sw-cms-preview-mw-file-download-block',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        content: {
            type: ELEMENT_NAME,
        },
    },
});
