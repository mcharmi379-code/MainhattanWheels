Shopware.Component.register('sw-cms-el-mw-wheel-showcase', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-wheel-showcase', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-wheel-showcase', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-wheel-showcase',
    label: 'Wheel Detail Showcase',
    component: 'sw-cms-el-mw-wheel-showcase',
    configComponent: 'sw-cms-el-config-mw-wheel-showcase',
    previewComponent: 'sw-cms-el-preview-mw-wheel-showcase',
    defaultConfig: {
        title: { source: 'static', value: '' },
        buttonText: { source: 'static', value: 'Jetzt Angebot anfordern!' },
        buttonLink: { source: 'static', value: '' },
        show360: { source: 'static', value: true },
        cards: {
            source: 'static',
            value: [],
        },
    },
});
