Shopware.Component.register('sw-cms-el-mw-tab-cards', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-tab-cards', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-tab-cards', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-tab-cards',
    label: 'mw-cms.elements.mwTabCards.label',
    component: 'sw-cms-el-mw-tab-cards',
    configComponent: 'sw-cms-el-config-mw-tab-cards',
    previewComponent: 'sw-cms-el-preview-mw-tab-cards',
    defaultConfig: {
        mainHeading: {
            source: 'static',
            value: 'Beispiele aus unserem OEM Felgenlack-Sortiment',
        },
        subHeading: {
            source: 'static',
            value: 'Wählen Sie einen Hersteller, um die verfügbaren Original-Farbtöne anzuzeigen.',
        },
        buttonText: {
            source: 'static',
            value: 'Sortiment im Shop ansehen →',
        },
        buttonUrl: {
            source: 'static',
            value: '',
        },
        buttonLinkType: {
            source: 'static',
            value: 'internal',
        },
        buttonTarget: {
            source: 'static',
            value: '_self',
        },
        cards: {
            source: 'static',
            value: [
                {
                    cardTitle: 'Audi',
                    cardSubtitle: 'OEM FELGENLACKE',
                    mediaId: null,
                    tabHeadline: 'Audi',
                    tabSubheadline: 'Produkte im Shop',
                    productLinks: [
                        { label: 'Audi Brillant-Schwarz Y9B', productId: null },
                        { label: 'Audi Gletscherweiss LS9R', productId: null },
                    ],
                },
                {
                    cardTitle: 'BMW',
                    cardSubtitle: 'OEM FELGENLACKE',
                    mediaId: null,
                    tabHeadline: 'BMW',
                    tabSubheadline: 'Produkte im Shop',
                    productLinks: [
                        { label: 'BMW Ferric Grey B55', productId: null },
                        { label: 'BMW Orbit Grey B35', productId: null },
                    ],
                },
                {
                    cardTitle: 'Toyota',
                    cardSubtitle: 'OEM FELGENLACKE',
                    mediaId: null,
                    tabHeadline: 'Toyota',
                    tabSubheadline: 'Produkte im Shop',
                    productLinks: [
                        { label: 'Toyota Super White 040', productId: null },
                    ],
                },
            ],
        },
    },
});
