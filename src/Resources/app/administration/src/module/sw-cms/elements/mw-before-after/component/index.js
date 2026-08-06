import template from './sw-cms-el-mw-before-after.html.twig';
import './sw-cms-el-mw-before-after.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        columns() {
            return this.element?.config?.columns?.value ?? 3;
        },

        items() {
            return this.element?.config?.items?.value ?? [];
        },
    },

    created() {
        this.initElementConfig('mw-before-after');
        this.seedDefaultItemsIfNeeded();
    },

    methods: {
        createDefaultItem(index) {
            return {
                id: `mw-before-after-item-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
                beforeImage: null,
                beforeImageUrl: null,
                beforeText: index === 2 ? 'PREVIOUSLY' : 'BEFORE',
                beforeTextColor: '#ffffff',
                beforeTextBackgroundColor: '#111827',
                beforeDescription: '',
                afterImage: null,
                afterImageUrl: null,
                afterText: index === 0 ? 'AFTER' : 'AFTERWARDS',
                afterTextColor: '#ffffff',
                afterTextBackgroundColor: '#e85630',
                afterDescription: '',
            };
        },

        seedDefaultItemsIfNeeded() {
            if (!this.element.config.itemsInitialized) {
                this.element.config.itemsInitialized = {
                    source: 'static',
                    value: false,
                };
            }

            if (this.element.config.itemsInitialized.value === true) {
                return;
            }

            if (this.items.length === 0) {
                this.element.config.items.value.push(
                    this.createDefaultItem(0),
                    this.createDefaultItem(1),
                    this.createDefaultItem(2),
                );
            }

            this.element.config.itemsInitialized.value = true;
        },
    },
};
