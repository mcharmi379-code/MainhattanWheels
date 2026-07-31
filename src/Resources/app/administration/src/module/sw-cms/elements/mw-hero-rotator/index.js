const ELEMENT_NAME = 'mw-hero-rotator';

Shopware.Component.register('sw-cms-el-preview-mw-hero-rotator', () => import('./preview'));
Shopware.Component.register('sw-cms-el-mw-hero-rotator', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-hero-rotator', () => import('./config'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwHeroRotator.label',
    component: 'sw-cms-el-mw-hero-rotator',
    configComponent: 'sw-cms-el-config-mw-hero-rotator',
    previewComponent: 'sw-cms-el-preview-mw-hero-rotator',
    defaultConfig: {
        backgroundColor: { source: 'static', value: '#3a3a3a' },
        titleText: { source: 'static', value: 'Alles unter einem Dach!<br>Wir bieten Ihnen' },
        titleColor: { source: 'static', value: '#ffffff' },
        lineCount: { source: 'static', value: 3 },
        transformText1: { source: 'static', value: 'Die Planung und' },
        transformText2: { source: 'static', value: 'Umsetzung Ihres eigenen' },
        transformText3: { source: 'static', value: 'Radprojektes' },
        transformText4: { source: 'static', value: '' },
        transformText5: { source: 'static', value: '' },
        transformText6: { source: 'static', value: '' },
        transformTextColor: { source: 'static', value: '#e8540a' },
        transitionDuration: { source: 'static', value: 400 },
        rotationInterval: { source: 'static', value: 3000 },
    },
});
