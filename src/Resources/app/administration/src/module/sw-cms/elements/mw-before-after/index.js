Shopware.Component.register('sw-cms-el-mw-before-after', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-before-after', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-before-after', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-before-after',
    label: 'mw-cms.elements.mwBeforeAfter.label',
    component: 'sw-cms-el-mw-before-after',
    configComponent: 'sw-cms-el-config-mw-before-after',
    previewComponent: 'sw-cms-el-preview-mw-before-after',
    defaultConfig: {
        columns: {
            source: 'static',
            value: 3,
        },
        showHeading: {
            source: 'static',
            value: true,
        },
        showSubHeading: {
            source: 'static',
            value: true,
        },
        showDescription: {
            source: 'static',
            value: true,
        },
        showTagsOnImage: {
            source: 'static',
            value: true,
        },
        heading: {
            source: 'static',
            value: 'Surface finish',
        },
        headingColor: {
            source: 'static',
            value: '#e06600',
        },
        headingBackgroundColor: {
            source: 'static',
            value: 'transparent',
        },
        subHeading: {
            source: 'static',
            value: 'Our CNC lathes guarantee a perfect surface finish.',
        },
        description: {
            source: 'static',
            value: 'Surface finish after repairing a diamond-cut aluminum rim (CNC diamond cutting + matte acrylic coating)',
        },
        items: {
            source: 'static',
            value: [],
        },
        itemsInitialized: {
            source: 'static',
            value: false,
        },
    },
});
