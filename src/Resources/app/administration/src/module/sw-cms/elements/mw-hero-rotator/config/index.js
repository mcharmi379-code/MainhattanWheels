import template from './sw-cms-el-config-mw-hero-rotator.html.twig';
import './sw-cms-el-config-mw-hero-rotator.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    created() {
        this.createdComponent();
    },

    computed: {
        lineCount: {
            get() {
                return this.element.config.lineCount.value;
            },
            set(value) {
                this.element.config.lineCount.value = value;
                this.$emit('element-update', this.element);
            },
        },
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-hero-rotator');
        },

        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
