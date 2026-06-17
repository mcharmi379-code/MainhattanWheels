Shopware.Component.register('sw-cms-el-mw-buttons', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-buttons', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-buttons', () => import('./preview'));

const createButton = () => ({
    label: '',
    variant: 'solid',
    textColor: '#ffffff',
    bgColor: '#ff6600',
    linkType: 'internal',
    linkUrl: '',
    linkNewTab: false,
    iconId: null,
    iconUrl: null,
    iconMimeType: null,
});

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-buttons',
    label: 'mw-cms.elements.mwButtons.label',
    component: 'sw-cms-el-mw-buttons',
    configComponent: 'sw-cms-el-config-mw-buttons',
    previewComponent: 'sw-cms-el-preview-mw-buttons',
    defaultConfig: {
        alignment: { source: 'static', value: 'left' },
        buttons: {
            source: 'static',
            value: [],
        },
    },
});
