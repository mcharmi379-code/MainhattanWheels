import template from './sw-cms-el-config-mw-subcategory-cards.html.twig';
import './sw-cms-el-config-mw-subcategory-cards.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            openAccordionIndex: 0,
        };
    },

    computed: {
        cards() {
            if (!this.element?.config?.cards) {
                return [];
            }
            if (!Array.isArray(this.element.config.cards.value)) {
                this.element.config.cards.value = [];
            }
            return this.element.config.cards.value;
        },
    },

    created() {
        this.initElementConfig('mw-subcategory-cards');
        this.initElementData('mw-subcategory-cards');

        if (!this.element.config.cards) {
            this.element.config.cards = {
                source: 'static',
                value: [],
            };
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        toggleAccordion(index) {
            this.openAccordionIndex = this.openAccordionIndex === index ? null : index;
        },

        addCard() {
            const newIndex = this.cards.length + 1;
            this.cards.push({
                title: `Subcategory Title ${newIndex}`,
                description: '<ul><li>Option A</li><li>Option B</li></ul>',
                buttonText: 'Zur Unterkategorie im Shop →',
                buttonLinkType: 'internal',
                buttonUrl: '',
            });
            this.openAccordionIndex = this.cards.length - 1;
            this.onInput();
        },

        removeCard(index) {
            this.cards.splice(index, 1);
            if (this.openAccordionIndex >= this.cards.length) {
                this.openAccordionIndex = Math.max(0, this.cards.length - 1);
            }
            this.onInput();
        },
    },
};
