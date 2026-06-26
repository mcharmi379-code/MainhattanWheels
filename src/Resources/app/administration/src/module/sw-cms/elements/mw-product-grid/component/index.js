import template from './sw-cms-el-mw-product-grid.html.twig';
import './sw-cms-el-mw-product-grid.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    inject: ['repositoryFactory'],

    data() {
        return {
            products: {},
        };
    },

    computed: {
        cards() {
            return this.element?.config?.cards?.value ?? [];
        },

        columns() {
            return this.element?.config?.columns?.value ?? 4;
        },

        layoutType() {
            return this.element?.config?.layoutType?.value ?? 'standard';
        },

        showDetails() {
            return this.element?.config?.showDetails?.value ?? false;
        },

        buttonColor() {
            return this.element?.config?.buttonColor?.value ?? '#ff6600';
        },

        hoverColor() {
            return this.element?.config?.hoverColor?.value ?? '#ff6600';
        },

        gridStyle() {
            return {
                '--mw-product-grid-columns': this.columns,
                '--mw-product-grid-button-color': this.buttonColor,
            };
        },

        productRepository() {
            return this.repositoryFactory.create('product');
        },
    },

    watch: {
        cards: {
            deep: true,
            immediate: true,
            handler() {
                this.fetchProducts();
            },
        },
    },

    created() {
        this.initElementConfig('mw-product-grid');

        if (!this.element.config.cards) {
            this.$set(this.element.config, 'cards', {
                source: 'static',
                value: [],
            });
        }

        if (!Array.isArray(this.element.config.cards.value) || this.element.config.cards.value.length === 0) {
            this.$set(this.element.config.cards, 'value', [
                { title: '', productId: null, open: true },
                { title: '', productId: null, open: false },
                { title: '', productId: null, open: false },
            ]);
        }
    },

    methods: {
        fetchProducts() {
            const productIds = this.cards
                .map((card) => card.productId)
                .filter((id) => id && !this.products[id]);

            if (productIds.length === 0) {
                return;
            }

            const { Criteria } = Shopware.Data;
            const criteria = new Criteria(1, 25);
            criteria.setIds(productIds);
            criteria.addAssociation('cover.media');

            this.productRepository.search(criteria, Shopware.Context.api).then((result) => {
                const newProducts = { ...this.products };
                result.forEach((product) => {
                    newProducts[product.id] = product;
                });
                this.products = newProducts;
            }).catch(() => {});
        },

        getProduct(productId) {
            return this.products[productId] || null;
        },

        getFormattedPrice(product) {
            if (!product) {
                return '€19.99';
            }
            if (product.calculatedPrice?.unitPrice) {
                return `€${product.calculatedPrice.unitPrice.toFixed(2)}`;
            }
            if (product.price?.[0]?.gross) {
                return `€${product.price[0].gross.toFixed(2)}`;
            }
            return '€19.99';
        },
    },
};
