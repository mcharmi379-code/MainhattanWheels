import template from './sw-cms-el-mw-product-quick-order.html.twig';
import './sw-cms-el-mw-product-quick-order.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    inject: ['repositoryFactory'],

    data() {
        return {
            product: null,
        };
    },

    computed: {
        productId() {
            return this.element?.config?.productId?.value ?? null;
        },

        buttonText() {
            return this.element?.config?.buttonText?.value ?? 'View & order now';
        },

        quantityLabel() {
            return this.element?.config?.quantityLabel?.value ?? 'Crowd';
        },

        productRepository() {
            return this.repositoryFactory.create('product');
        },
    },

    watch: {
        productId: {
            immediate: true,
            handler(newVal) {
                this.fetchProduct(newVal);
            },
        },
    },

    created() {
        this.initElementConfig('mw-product-quick-order');
    },

    methods: {
        fetchProduct(productId) {
            if (!productId) {
                this.product = null;
                return;
            }

            const { Criteria } = Shopware.Data;
            const criteria = new Criteria(1, 1);
            criteria.addAssociation('cover.media');

            this.productRepository.get(productId, Shopware.Context.api, criteria).then((product) => {
                this.product = product;
            }).catch(() => {
                this.product = null;
            });
        },

        getFormattedPrice() {
            if (!this.product) {
                return '€34,900.00*';
            }
            if (this.product.price?.[0]?.gross) {
                return `€${this.product.price[0].gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*`;
            }
            return '€34,900.00*';
        },
    },
};
