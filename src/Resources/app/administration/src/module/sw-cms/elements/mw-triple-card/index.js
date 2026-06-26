Shopware.Component.register('sw-cms-el-mw-triple-card', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-triple-card', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-triple-card', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-triple-card',
    label: 'mw-cms.elements.mwTripleCard.label',
    component: 'sw-cms-el-mw-triple-card',
    configComponent: 'sw-cms-el-config-mw-triple-card',
    previewComponent: 'sw-cms-el-preview-mw-triple-card',
    defaultConfig: {
        // Left card
        leftBgColor:    { source: 'static', value: '#1a1a1a' },
        leftBgMediaId:  { source: 'static', value: null },
        leftBgMediaUrl: { source: 'static', value: null },
        leftBgType:     { source: 'static', value: 'color' }, // 'color' | 'image'
        leftHeadline:   { source: 'static', value: '' },
        leftHeadingColor: { source: 'static', value: '' },
        leftIcons: {
            source: 'static',
            value: [
                { iconId: null, iconUrl: null, iconMimeType: null, iconDesc: '', iconColor: '', iconTextColor: '' },
            ],
        },
        // Middle card
        midBgColor:     { source: 'static', value: '#ff6600' },
        midBgMediaId:   { source: 'static', value: null },
        midBgMediaUrl:  { source: 'static', value: null },
        midBgType:      { source: 'static', value: 'color' },
        midSubHeading:  { source: 'static', value: '' },
        midHeading:     { source: 'static', value: '' },
        midDescription: { source: 'static', value: '' },
        midBtnLabel:    { source: 'static', value: '' },
        midBtnLinkType: { source: 'static', value: 'external' },
        midBtnUrl:      { source: 'static', value: '' },
        midBtnNewTab:   { source: 'static', value: false },
        midBtnBgColor:  { source: 'static', value: '#ffffff' },
        midBtnBorderColor: { source: 'static', value: '' },
        midBtnTextColor:   { source: 'static', value: '#ff6600' },
        midIconId:      { source: 'static', value: null },
        midIconUrl:     { source: 'static', value: null },
        midIconText:    { source: 'static', value: '' },
        midIconTextColor:   { source: 'static', value: '' },
        midIconColor:   { source: 'static', value: '' },
        // Right card
        rightBgColor:    { source: 'static', value: '#222222' },
        rightBgMediaId:  { source: 'static', value: null },
        rightBgMediaUrl: { source: 'static', value: null },
        rightBgType:     { source: 'static', value: 'color' },
        rightHeading:    { source: 'static', value: '' },
        rightDescription: { source: 'static', value: '' },
        rightIconId:     { source: 'static', value: null },
        rightIconUrl:    { source: 'static', value: null },
        rightIconText:   { source: 'static', value: '' },
        rightIconTextColor:  { source: 'static', value: '' },
        rightIconColor:  { source: 'static', value: '' },
        rightTextColor:  { source: 'static', value: '#ffffff' },
        rightLinkType:   { source: 'static', value: 'external' },
        rightLinkUrl:    { source: 'static', value: '' },
        rightLinkNewTab: { source: 'static', value: false },
    },
});
