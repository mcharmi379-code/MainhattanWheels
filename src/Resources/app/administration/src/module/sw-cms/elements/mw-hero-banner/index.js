Shopware.Component.register('sw-cms-el-mw-hero-banner', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-hero-banner', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-hero-banner', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-hero-banner',
    label: 'mw-cms.elements.mwHeroBanner.label',
    component: 'sw-cms-el-mw-hero-banner',
    configComponent: 'sw-cms-el-config-mw-hero-banner',
    previewComponent: 'sw-cms-el-preview-mw-hero-banner',
    defaultConfig: {
        headingText: {
            source: 'static',
            value: 'LÖSUNGEN, DIE IHREN <span>VORSPRUNG</span> SICHERN.',
        },
        headingColor: {
            source: 'static',
            value: '#1a1a1a',
        },
        descriptionText: {
            source: 'static',
            value: 'Anlagen, Maschinen und Komplettlösungen für die professionelle Felgenaufbereitung.',
        },
        descriptionColor: {
            source: 'static',
            value: '#444444',
        },
        primaryButtonText: {
            source: 'static',
            value: 'ZU DEN ANLAGEN',
        },
        primaryButtonUrl: {
            source: 'static',
            value: '',
        },
        primaryButtonTarget: {
            source: 'static',
            value: '_self',
        },
        primaryButtonTextColor: {
            source: 'static',
            value: '#ffffff',
        },
        primaryButtonBgColor: {
            source: 'static',
            value: '#e8540a',
        },
        secondaryButtonText: {
            source: 'static',
            value: 'BERATUNG ANFORDERN',
        },
        secondaryButtonUrl: {
            source: 'static',
            value: '',
        },
        secondaryButtonTarget: {
            source: 'static',
            value: '_self',
        },
        secondaryButtonTextColor: {
            source: 'static',
            value: '#1a1a1a',
        },
        secondaryButtonBgColor: {
            source: 'static',
            value: 'transparent',
        },
        backgroundMedia: {
            source: 'static',
            value: null,
        },
        rightMedia: {
            source: 'static',
            value: null,
        },
    },
    defaultData: {
        backgroundMedia: null,
        backgroundMediaId: null,
        rightMedia: null,
        rightMediaId: null,
    },
});
