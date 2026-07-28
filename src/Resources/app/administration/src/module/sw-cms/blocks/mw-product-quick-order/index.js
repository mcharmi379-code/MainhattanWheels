Shopware.Component.register('sw-cms-block-mw-product-quick-order', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-product-quick-order', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-product-quick-order',
    label: 'mw-cms.blocks.mwProductQuickOrder.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-product-quick-order',
    previewComponent: 'sw-cms-preview-mw-product-quick-order',
    allowedCmsElements: ['mw-product-quick-order'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        productQuickOrder: { type: 'mw-product-quick-order' },
    },
});
