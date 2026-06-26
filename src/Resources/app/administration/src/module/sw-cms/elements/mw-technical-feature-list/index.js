const ELEMENT_NAME = 'mw-technical-feature-list';

function createBullet(index = 1) {
    return {
        text: `Feature point ${index}`,
        icon: null,
        iconUrl: null,
        iconAlt: `Feature icon ${index}`,
    };
}

function createImage(index = 1) {
    return {
        media: null,
        alt: `Gallery image ${index}`,
    };
}

Shopware.Component.register('sw-cms-el-mw-technical-feature-list', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-technical-feature-list', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-technical-feature-list', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwTechnicalFeatureList.label',
    component: 'sw-cms-el-mw-technical-feature-list',
    configComponent: 'sw-cms-el-config-mw-technical-feature-list',
    previewComponent: 'sw-cms-el-preview-mw-technical-feature-list',
    defaultConfig: {
        title: {
            source: 'static',
            value: 'Felgen-Richtmaschine MW28R',
        },
        description: {
            source: 'static',
            value: 'Eigenschaften im Überblick',
        },
        bullets: {
            source: 'static',
            value: [
                createBullet(1),
                createBullet(2),
                createBullet(3),
                createBullet(4),
            ],
            type: Array,
            required: true,
        },
        gallery: {
            source: 'static',
            value: [
                { ...createImage(1), mediaUrl: null },
                { ...createImage(2), mediaUrl: null },
                { ...createImage(3), mediaUrl: null },
                { ...createImage(4), mediaUrl: null },
            ],
            type: Array,
            required: true,
        },
        footerLabel: {
            source: 'static',
            value: 'Abmessungen (LxBxH)',
        },
        footerValue: {
            source: 'static',
            value: '2045 x 1045 x 2100 mm',
        },
    },
});
