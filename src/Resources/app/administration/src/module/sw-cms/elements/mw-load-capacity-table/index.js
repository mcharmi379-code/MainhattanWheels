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
        columnGroups: {
            source: 'static',
            value: [
                {
                    title: 'Loadindex',
                    rangeLabel: '72-85',
                    rows: [
                        { label: '73', value: '365 kg' },
                        { label: '74', value: '375 kg' },
                    ],
                },
                {
                    title: 'Loadindex',
                    rangeLabel: '86-99',
                    rows: [
                        { label: '86', value: '530 kg' },
                        { label: '87', value: '545 kg' },
                    ],
                },
            ],
        },
    },
});
