Shopware.Component.register('sw-cms-block-mw-media-tabs', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-media-tabs', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-media-tabs',
    label: 'MW Media Tabs',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-media-tabs',
    previewComponent: 'sw-cms-preview-mw-media-tabs',
    allowedCmsElements: ['mw-media-tabs'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        mediaTabs: {
            type: 'mw-media-tabs',
        },
    },
});
