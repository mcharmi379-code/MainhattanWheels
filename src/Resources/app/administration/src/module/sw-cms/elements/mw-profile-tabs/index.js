const ELEMENT_NAME = 'mw-profile-tabs';

function createTab(index = 1) {
    return {
        title: index === 1 ? 'Vita' : 'Know-How',
        content: index === 1 ? '<p>Describe the first tab content here.</p>' : '<p>Describe the second tab content here.</p>',
    };
}

Shopware.Component.register('sw-cms-el-mw-profile-tabs', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-profile-tabs', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-profile-tabs', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwProfileTabs.label',
    component: 'sw-cms-el-mw-profile-tabs',
    configComponent: 'sw-cms-el-config-mw-profile-tabs',
    previewComponent: 'sw-cms-el-preview-mw-profile-tabs',
    defaultConfig: {
        subheadline: { source: 'static', value: 'Über uns' },
        name: { source: 'static', value: 'Dipl.-Kfm. Thomas Beez' },
        role: { source: 'static', value: 'Geschäftsführer' },
        tabs: {
            source: 'static',
            value: [createTab(1), createTab(2)],
        },
        buttonLabel: { source: 'static', value: 'Zum Onlineshop' },
        buttonLink: { source: 'static', value: '' },
        buttonNewTab: { source: 'static', value: false },
        buttonType: { source: 'static', value: 'internal' },
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: { name: 'media' },
        },
    },
    defaultData: {
        media: null,
        mediaId: null,
    },
});
