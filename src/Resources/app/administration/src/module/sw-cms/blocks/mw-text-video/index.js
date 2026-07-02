Shopware.Component.register('sw-cms-block-mw-text-video', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-text-video', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-text-video',
    label: 'mw-cms.blocks.mwTextVideo.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-text-video',
    previewComponent: 'sw-cms-preview-mw-text-video',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        textVideo: {
            type: 'mw-text-video',
        },
    },
});
