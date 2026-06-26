Shopware.Component.register('sw-cms-block-mw-product-carousel', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-product-carousel', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-product-carousel',
    label: 'mw-cms.blocks.mwProductCarousel.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-product-carousel',
    previewComponent: 'sw-cms-preview-mw-product-carousel',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        productCarousel: { type: 'mw-product-carousel' },
    },
});
