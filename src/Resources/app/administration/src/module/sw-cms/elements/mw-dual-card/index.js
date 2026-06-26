Shopware.Component.register('sw-cms-el-mw-dual-card', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-dual-card', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-dual-card', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-dual-card',
    label: 'mw-cms.elements.mwDualCard.label',
    component: 'sw-cms-el-mw-dual-card',
    configComponent: 'sw-cms-el-config-mw-dual-card',
    previewComponent: 'sw-cms-el-preview-mw-dual-card',
    defaultConfig: {
        // Left card
        leftBgColor: { source: 'static', value: '#1a1a1a' },
        leftTextColor: { source: 'static', value: '#ffffff' },
        leftHeading: { source: 'static', value: '' },
        leftDescription: { source: 'static', value: '' },
        leftLinkType: { source: 'static', value: 'external' },
        leftLinkUrl: { source: 'static', value: '' },
        leftLinkNewTab: { source: 'static', value: false },
        leftBtnLabel: { source: 'static', value: '' },
        leftBtnUrl: { source: 'static', value: '' },
        leftBtnNewTab: { source: 'static', value: false },
        leftBtnBgColor: { source: 'static', value: '#ff6600' },
        leftBtnTextColor: { source: 'static', value: '#ffffff' },
        leftBtnOutlineColor: { source: 'static', value: '' },
        // Right card
        rightBgColor: { source: 'static', value: '#222222' },
        rightBgMediaId: { source: 'static', value: null },
        rightBgMediaUrl: { source: 'static', value: null },
        rightTextColor: { source: 'static', value: '#ffffff' },
        rightHeading: { source: 'static', value: '' },
        rightLinkType: { source: 'static', value: 'external' },
        rightLinkUrl: { source: 'static', value: '' },
        rightLinkNewTab: { source: 'static', value: false },
        rightFeatures: {
            source: 'static',
            value: [
                { text: '', iconId: null, iconUrl: null, iconMimeType: null, svgColor: '' },
            ],
        },
        rightBtnLabel: { source: 'static', value: '' },
        rightBtnUrl: { source: 'static', value: '' },
        rightBtnNewTab: { source: 'static', value: false },
        rightBtnBgColor: { source: 'static', value: '#ff6600' },
        rightBtnTextColor: { source: 'static', value: '#ffffff' },
        rightBtnOutlineColor: { source: 'static', value: '' },
    },
});
