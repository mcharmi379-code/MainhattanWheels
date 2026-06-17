Shopware.Component.register('sw-cms-el-mw-product-grid', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-product-grid', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-product-grid', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-product-grid',
    label: 'mw-cms.elements.mwProductGrid.label',
    component: 'sw-cms-el-mw-product-grid',
    configComponent: 'sw-cms-el-config-mw-product-grid',
    previewComponent: 'sw-cms-el-preview-mw-product-grid',
    defaultConfig: {
        columns: { source: 'static', value: 4 },
        layoutType: { source: 'static', value: 'standard' },
        showDetails: { source: 'static', value: false },
        buttonColor: { source: 'static', value: '#ff6600' },
        hoverColor: { source: 'static', value: '#ff6600' },
        cards: {
            source: 'static',
            value: [],
        },
    },
});
