Shopware.Component.register('sw-cms-block-mw-card-grid', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-card-grid', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-card-grid',
    label: 'mw-cms.blocks.mwCardGrid.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-card-grid',
    previewComponent: 'sw-cms-preview-mw-card-grid',
    allowedCmsElements: ['mw-card-grid'],
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        cardGrid: {
            type: 'mw-card-grid',
        },
    },
});
