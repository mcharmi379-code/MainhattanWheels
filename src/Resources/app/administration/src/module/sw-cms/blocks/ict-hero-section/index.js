Shopware.Component.register('sw-cms-block-ict-hero-section', () => import('./component'));
Shopware.Component.register('sw-cms-preview-ict-hero-section', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'ict-hero-section',
    label: 'sw-cms.blocks.ictHeroSection.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-ict-hero-section',
    previewComponent: 'sw-cms-preview-ict-hero-section',
    allowedCmsElements: ['ict-hero-section'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        heroSection: {
            type: 'ict-hero-section',
        }
    }
});
