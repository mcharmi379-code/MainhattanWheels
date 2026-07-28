import template from './sw-cms-el-mw-tab-cards.html.twig';
import './sw-cms-el-mw-tab-cards.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            activeCardIndex: 0,
        };
    },

    computed: {
        cards() {
            return this.element?.config?.cards?.value || [];
        },

        activeCard() {
            return this.cards[this.activeCardIndex] || this.cards[0] || null;
        },
    },

    created() {
        this.initElementConfig('mw-tab-cards');
        this.initElementData('mw-tab-cards');
    },

    methods: {
        selectCard(index) {
            this.activeCardIndex = index;
        },
    },
};
