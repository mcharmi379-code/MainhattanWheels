Shopware.Component.register('sw-cms-block-mw-profile-tabs', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-profile-tabs', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-profile-tabs',
    label: 'mw-cms.blocks.mwProfileTabs.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-profile-tabs',
    previewComponent: 'sw-cms-preview-mw-profile-tabs',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        content: {
            type: 'mw-profile-tabs',
        },
    },
});
