import template from './sw-cms-el-mw-wheel-showcase.html.twig';
import './sw-cms-el-mw-wheel-showcase.scss';

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

        title() {
            return this.element?.config?.title?.value ?? '';
        },

        buttonText() {
            return this.element?.config?.buttonText?.value ?? 'Jetzt Angebot anfordern!';
        },

        show360() {
            return this.element?.config?.show360?.value ?? true;
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
        this.initElementConfig('mw-wheel-showcase');

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
    },
};
