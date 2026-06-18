Shopware.Component.register('sw-cms-block-mw-wheel-showcase', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-wheel-showcase', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-wheel-showcase',
    label: 'Wheel Detail Showcase Block',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-wheel-showcase',
    previewComponent: 'sw-cms-preview-mw-wheel-showcase',
    allowedCmsElements: ['mw-wheel-showcase'],
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        wheelShowcase: { type: 'mw-wheel-showcase' },
    },
});
