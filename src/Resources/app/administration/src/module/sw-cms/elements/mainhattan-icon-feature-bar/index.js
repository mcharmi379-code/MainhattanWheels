Shopware.Component.register('sw-cms-el-mainhattan-icon-feature-bar', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mainhattan-icon-feature-bar', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mainhattan-icon-feature-bar', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mainhattan-icon-feature-bar',
    label: 'sw-cms.elements.mainhattanIconFeatureBar.label',
    component: 'sw-cms-el-mainhattan-icon-feature-bar',
    configComponent: 'sw-cms-el-config-mainhattan-icon-feature-bar',
    previewComponent: 'sw-cms-el-preview-mainhattan-icon-feature-bar',
    defaultConfig: {
        backgroundColor: {
            source: 'static',
            value: '#ffffff',
        },
        paddingY: {
            source: 'static',
            value: '24',
        },
        iconSize: {
            source: 'static',
            value: '40',
        },
        headingColor: {
            source: 'static',
            value: '#1a1a2e',
        },
        headingSize: {
            source: 'static',
            value: '13',
        },
        descriptionColor: {
            source: 'static',
            value: '#6b7280',
        },
        descriptionSize: {
            source: 'static',
            value: '12',
        },
        items: {
            source: 'static',
            value: [
                { icon: null, svgColor: '', heading: 'EIGENE ENTWICKLUNG', description: 'Made in Germany' },
                { icon: null, svgColor: '', heading: 'PRAXISERPROBT', description: 'seit 2007' },
                { icon: null, svgColor: '', heading: 'KOMPLETTLÖSUNGEN', description: 'aus einer Hand' },
                { icon: null, svgColor: '', heading: 'SERVICE & SUPPORT', description: 'schnell & zuverlässig' },
            ],
        },
    },
});
