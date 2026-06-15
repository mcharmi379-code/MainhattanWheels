import './preview/sw-cms-el-preview-mw-category-showcase.scss';
import preview from './preview';
import config from './config';
import component from './component';

Shopware.Component.register('sw-cms-el-preview-mw-category-showcase', preview);
Shopware.Component.register('sw-cms-el-config-mw-category-showcase', config);
Shopware.Component.register('sw-cms-el-mw-category-showcase', component);

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-category-showcase',
    label: 'mw-cms.elements.mwCategoryShowcase.label',
    component: 'sw-cms-el-mw-category-showcase',
    configComponent: 'sw-cms-el-config-mw-category-showcase',
    previewComponent: 'sw-cms-el-preview-mw-category-showcase',
    defaultConfig: {
        mainCategory: {
            source: 'static',
            value: null,
        },
        subCategories: {
            source: 'static',
            value: [],
        },
        showAllLabel: {
            source: 'static',
            value: '',
        },
        showAllColor: {
            source: 'static',
            value: '',
        },
        learnMoreLabel: {
            source: 'static',
            value: '',
        },
        learnMoreColor: {
            source: 'static',
            value: '',
        },
        cardBorderColor: {
            source: 'static',
            value: '',
        },
        cardBgColor: {
            source: 'static',
            value: '',
        },
        visibleCards: {
            source: 'static',
            value: 5,
        },
    },
});
