import template from './sw-cms-el-mw-process-steps.html.twig';
import './sw-cms-el-mw-process-steps.scss';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-process-steps');
        },
    },

    computed: {
        heading() {
            return this.element.config?.heading?.value || '';
        },
        subheading() {
            return this.element.config?.subheading?.value || '';
        },
        accentColor() {
            return this.element.config?.accentColor?.value || '#e85630';
        },
        stepCount() {
            return parseInt(this.element.config?.stepCount?.value || 4, 10);
        },
        steps() {
            const list = [];
            for (let i = 1; i <= this.stepCount; i++) {
                const titleKey = `step${i}Title`;
                const subTitleKey = `step${i}SubTitle`;
                const descKey = `step${i}Desc`;
                list.push({
                    number: i,
                    title: this.element.config?.[titleKey]?.value || '',
                    subTitle: this.element.config?.[subTitleKey]?.value || '',
                    description: this.element.config?.[descKey]?.value || '',
                });
            }
            return list;
        },
    },
};
