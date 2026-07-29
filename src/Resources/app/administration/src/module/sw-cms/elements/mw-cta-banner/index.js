const ELEMENT_NAME = 'mw-cta-banner';

Shopware.Component.register('sw-cms-el-preview-mw-cta-banner', () => import('./preview'));
Shopware.Component.register('sw-cms-el-mw-cta-banner', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-cta-banner', () => import('./config'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwCtaBanner.label',
    component: 'sw-cms-el-mw-cta-banner',
    configComponent: 'sw-cms-el-config-mw-cta-banner',
    previewComponent: 'sw-cms-el-preview-mw-cta-banner',
    defaultConfig: {
        text: { source: 'static', value: 'Vereinbaren Sie noch heute einen Termin zur Überprüfung Ihrer Felgen und Reifen!' },
        textColor: { source: 'static', value: '#1f2937' },
        bannerBgColor: { source: 'static', value: '#f4f4f4' },
        buttonLabel: { source: 'static', value: 'Kontakt' },
        buttonLinkType: { source: 'static', value: 'internal' },
        buttonLinkUrl: { source: 'static', value: '' },
        buttonNewTab: { source: 'static', value: false },
        buttonBgColor: { source: 'static', value: '#1f2937' },
        buttonTextColor: { source: 'static', value: '#ffffff' },
    },
});
