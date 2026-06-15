import template from './sw-cms-el-mw-hero-banner.html.twig';
import './sw-cms-el-mw-hero-banner.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        bgImageUrl() {
            const url = this.element?.data?.backgroundMedia?.url;
            return url ? `url('${url}')` : '';
        },
    },

    created() {
        this.initElementConfig('mw-hero-banner');
        this.initElementData('mw-hero-banner');
    },
};
