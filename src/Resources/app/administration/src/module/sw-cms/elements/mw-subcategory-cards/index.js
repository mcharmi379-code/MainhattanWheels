Shopware.Component.register('sw-cms-el-mw-subcategory-cards', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-subcategory-cards', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-subcategory-cards', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-subcategory-cards',
    label: 'mw-cms.elements.mwSubcategoryCards.label',
    component: 'sw-cms-el-mw-subcategory-cards',
    configComponent: 'sw-cms-el-config-mw-subcategory-cards',
    previewComponent: 'sw-cms-el-preview-mw-subcategory-cards',
    defaultConfig: {
        cards: {
            source: 'static',
            value: [
                {
                    title: 'OEM Felgen-Pulverlackgrundierung',
                    description: '<ul><li>OEM Pulverlackgrundierung Grau glänzend (ausgasungshemmend)</li><li>OEM Pulverlackgrundierung Schwarz glänzend (ausgasungshemmend)</li></ul>',
                    buttonText: 'Zur Unterkategorie im Shop →',
                    buttonLinkType: 'internal',
                    buttonUrl: '',
                },
                {
                    title: 'OEM Acrylpulverlack',
                    description: '<ul><li>Acryl Pulverlack klar</li><li>Acryl Pulverlack matt</li></ul>',
                    buttonText: 'Zur Unterkategorie im Shop →',
                    buttonLinkType: 'internal',
                    buttonUrl: '',
                },
            ],
        },
    },
});
