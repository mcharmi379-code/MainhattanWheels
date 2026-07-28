Shopware.Component.register('sw-cms-el-mw-product-quick-order', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-product-quick-order', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-product-quick-order', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-product-quick-order',
    label: 'mw-cms.elements.mwProductQuickOrder.label',
    component: 'sw-cms-el-mw-product-quick-order',
    configComponent: 'sw-cms-el-config-mw-product-quick-order',
    previewComponent: 'sw-cms-el-preview-mw-product-quick-order',
    defaultConfig: {
        productId: {
            source: 'static',
            value: null,
        },
        buttonText: {
            source: 'static',
            value: 'View & order now',
        },
        quantityLabel: {
            source: 'static',
            value: 'Quantity',
        },
        buttonBgColor: {
            source: 'static',
            value: '#e8671a',
        },
        buttonTextColor: {
            source: 'static',
            value: '#ffffff',
        },
    },
});
