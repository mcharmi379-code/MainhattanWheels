const ELEMENT_NAME = 'mw-load-capacity-table';

Shopware.Component.register('sw-cms-el-mw-load-capacity-table', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-load-capacity-table', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-load-capacity-table', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'sw-cms.elements.mwLoadCapacityTable.label',
    component: 'sw-cms-el-mw-load-capacity-table',
    configComponent: 'sw-cms-el-config-mw-load-capacity-table',
    previewComponent: 'sw-cms-el-preview-mw-load-capacity-table',
    defaultConfig: {
        // Kept empty on purpose: Shopware merges defaultConfig into the saved config by
        // array index (it does not replace arrays wholesale), so any non-empty demo data
        // here would silently reappear whenever the saved array becomes shorter than this
        // one (e.g. after removing a row). Starter content is instead created once, live,
        // by ensureDefaultColumnGroup() in the config component.
        columnGroups: {
            source: 'static',
            value: [],
        },
        columnsPerRow: {
            source: 'static',
            value: 6,
        },
    },
});
