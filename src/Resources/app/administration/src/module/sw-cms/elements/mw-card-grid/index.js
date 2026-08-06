Shopware.Component.register('sw-cms-el-mw-card-grid', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-card-grid', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-card-grid', () => import('./preview'));

const createCard = () => ({
    iconId: null,
    iconUrl: null,
    iconMimeType: null,
    iconColor: '',
    heading: '',
    headingColor: '',
    description: '',
    descriptionColor: '',
    subheading: '',
    subheadingColor: '',
    hoverColor: '#e85630',
});

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-card-grid',
    label: 'mw-cms.elements.mwCardGrid.label',
    component: 'sw-cms-el-mw-card-grid',
    configComponent: 'sw-cms-el-config-mw-card-grid',
    previewComponent: 'sw-cms-el-preview-mw-card-grid',
    defaultConfig: {
        columns: { source: 'static', value: 4 },
        titleBesideBadge: { source: 'static', value: false },
        cards: { source: 'static', value: [] },
    },
});
