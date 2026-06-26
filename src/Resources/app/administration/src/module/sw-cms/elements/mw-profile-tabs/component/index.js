import template from './sw-cms-el-mw-profile-tabs.html.twig';
import './sw-cms-el-mw-profile-tabs.scss';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeTab: 0,
        };
    },

    computed: {
        tabs() {
            return this.element?.config?.tabs?.value ?? [];
        },
        media() {
            return this.element?.data?.media ?? null;
        },
        currentTab() {
            return this.tabs[this.activeTab] ?? null;
        },
    },

    created() {
        this.initElementConfig('mw-profile-tabs');
        this.initElementData('mw-profile-tabs');
    },

    methods: {
        setActiveTab(index) {
            this.activeTab = index;
        },
    },
};
