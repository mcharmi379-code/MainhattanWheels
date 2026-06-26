import template from './sw-cms-el-mw-technical-feature-list.html.twig';
import './sw-cms-el-mw-technical-feature-list.scss';

const { Mixin, Filter } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        assetFilter() {
            return Filter.getByName('asset');
        },
    },

    created() {
        this.initElementConfig('mw-technical-feature-list');
    },

    methods: {
        resolveMedia(id) {
            return this.element?.data?.mediaMap?.[id] ?? null;
        },
    },
};
