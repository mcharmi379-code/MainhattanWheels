Shopware.Component.register('sw-cms-el-mw-portfolio-gallery', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-portfolio-gallery', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-portfolio-gallery', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-portfolio-gallery',
    label: 'mw-cms.elements.mwPortfolioGallery.label',
    component: 'sw-cms-el-mw-portfolio-gallery',
    configComponent: 'sw-cms-el-config-mw-portfolio-gallery',
    previewComponent: 'sw-cms-el-preview-mw-portfolio-gallery',
    defaultConfig: {
        headline: { source: 'static', value: 'Filtern Sie einfach durch das Anklicken Ihrer Wunschfarbe über den folgenden Abbildungen!' },
        ctaLabel: { source: 'static', value: 'Jetzt Angebot anfordern!' },
        ctaLinkType: { source: 'static', value: 'external' },
        ctaUrl: { source: 'static', value: '/anfrage-felgenbearbeitung' },
    },
});
