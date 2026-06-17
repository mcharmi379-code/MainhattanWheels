Shopware.Component.register('sw-cms-block-mw-product-grid', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-product-grid', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-product-grid',
    label: 'mw-cms.blocks.mwProductGrid.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-product-grid',
    previewComponent: 'sw-cms-preview-mw-product-grid',
    allowedCmsElements: ['mw-product-grid'],
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        productGrid: { type: 'mw-product-grid' },
    },
});
