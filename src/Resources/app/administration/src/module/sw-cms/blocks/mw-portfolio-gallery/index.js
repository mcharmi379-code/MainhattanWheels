Shopware.Component.register('sw-cms-block-mw-portfolio-gallery', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-portfolio-gallery', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-portfolio-gallery',
    label: 'mw-cms.blocks.mwPortfolioGallery.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-portfolio-gallery',
    previewComponent: 'sw-cms-preview-mw-portfolio-gallery',
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        content: {
            type: 'mw-portfolio-gallery',
        },
    },
});
