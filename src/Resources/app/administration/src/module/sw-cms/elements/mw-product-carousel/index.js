const ELEMENT_NAME = 'mw-product-carousel';

Shopware.Component.register('sw-cms-el-mw-product-carousel', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-product-carousel', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-product-carousel', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwProductCarousel.label',
    component: 'sw-cms-el-mw-product-carousel',
    configComponent: 'sw-cms-el-config-mw-product-carousel',
    previewComponent: 'sw-cms-el-preview-mw-product-carousel',
    defaultConfig: {
        headline: { source: 'static', value: 'Produkte' },
        categoryId: { source: 'static', value: null },
        ctaLabel: { source: 'static', value: 'All Products' },
    },
});
