import template from './sw-cms-el-mw-product-carousel.html.twig';
import './sw-cms-el-mw-product-carousel.scss';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],
    inject: ['repositoryFactory'],

    data() {
        return { products: {}, category: null };
    },

    computed: {
        items() {
            return this.element?.data?.items ?? [];
        },
        headline() {
            return this.element?.data?.headline ?? '';
        },
        ctaLabel() {
            return this.element?.data?.ctaLabel ?? 'All Products';
        },
        hasSlider() {
            return this.items.length > 3;
        },
        categoryUrl() {
            return this.category?.translated?.seoUrls?.[0]?.seoPathInfo ? `/${this.category.translated.seoUrls[0].seoPathInfo}` : '#';
        },
    },

    created() {
        this.initElementConfig('mw-product-carousel');
    },

    methods: {
        resolveProduct(id) {
            return this.products[id] ?? null;
        },
    },
};
