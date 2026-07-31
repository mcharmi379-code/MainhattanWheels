const ELEMENT_NAME = 'mw-text-box';

Shopware.Component.register('sw-cms-el-preview-mw-text-box', () => import('./preview'));
Shopware.Component.register('sw-cms-el-mw-text-box', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-text-box', () => import('./config'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwTextBox.label',
    component: 'sw-cms-el-mw-text-box',
    configComponent: 'sw-cms-el-config-mw-text-box',
    previewComponent: 'sw-cms-el-preview-mw-text-box',
    defaultConfig: {
        text: { source: 'static', value: 'Ihr Text hier ...' },
        bgColor: { source: 'static', value: '#f4f4f4' },
        textColor: { source: 'static', value: '#1f2937' },
        hoverBgColor: { source: 'static', value: '#1f2937' },
        hoverTextColor: { source: 'static', value: '#ffffff' },
    },
});
