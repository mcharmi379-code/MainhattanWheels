import template from './sw-cms-el-config-mw-process-steps.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.createdComponent();
    },

    computed: {
        stepCount: {
            get() {
                return this.element.config.stepCount.value;
            },
            set(value) {
                this.element.config.stepCount.value = value;
                this.$emit('element-update', this.element);
            },
        },
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-process-steps');
        },

        onInput() {
            this.$emit('element-update', this.element);
        },
    },
};
