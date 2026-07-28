import template from './sw-cms-el-mw-testimonial.html.twig';
import './sw-cms-el-mw-testimonial.scss';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-testimonial');
            this.initElementData('mw-testimonial');
        },
    },

    computed: {
        quote() {
            return this.element.config?.quote?.value || '';
        },
        authorName() {
            return this.element.config?.authorName?.value || '';
        },
        authorRole() {
            return this.element.config?.authorRole?.value || '';
        },
        hasImage() {
            return !!this.element.config?.imageId?.value || !!this.element.data?.image?.id;
        },
        imageId() {
            if (this.element?.data?.image?.id) {
                return this.element.data.image;
            }
            return this.element.config?.imageId?.value || null;
        },
    },
};
