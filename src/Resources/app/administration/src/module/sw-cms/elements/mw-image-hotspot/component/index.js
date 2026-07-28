import template from './sw-cms-el-mw-image-hotspot.html.twig';
import './sw-cms-el-mw-image-hotspot.scss';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeTab: 1,
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        tabCount() {
            return parseInt(this.element.config?.tabCount?.value || 3, 10);
        },

        tabs() {
            const list = [];
            for (let t = 1; t <= this.tabCount; t++) {
                list.push({
                    index: t,
                    title: this.element.config?.[`tab${t}Title`]?.value || `Tab ${t}`,
                    iconId: this.element.config?.[`tab${t}IconId`]?.value || null,
                });
            }
            return list;
        },

        currentTabMediaId() {
            return this.element.config?.[`tab${this.activeTab}MediaId`]?.value || null;
        },

        currentTabHotpointCount() {
            return parseInt(this.element.config?.[`tab${this.activeTab}HotspotCount`]?.value || 3, 10);
        },

        currentTabHotspots() {
            const list = [];
            for (let h = 1; h <= this.currentTabHotpointCount; h++) {
                const topVal = this.element.config?.[`tab${this.activeTab}Hotspot${h}Top`]?.value ?? 50.0;
                const leftVal = this.element.config?.[`tab${this.activeTab}Left`]?.value ?? 50.0; // fallback if needed
                const leftValReal = this.element.config?.[`tab${this.activeTab}Hotspot${h}Left`]?.value ?? leftVal;
                const titleVal = this.element.config?.[`tab${this.activeTab}Hotspot${h}Title`]?.value || '';
                const textVal = this.element.config?.[`tab${this.activeTab}Hotspot${h}Text`]?.value || '';

                list.push({
                    index: h,
                    top: topVal,
                    left: leftValReal,
                    title: titleVal,
                    text: textVal,
                });
            }
            return list;
        },

        tooltipBgColor() {
            return this.element.config?.tooltipBgColor?.value || '#1f2937';
        },

        tooltipTextColor() {
            return this.element.config?.tooltipTextColor?.value || '#ffffff';
        },
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-image-hotspot');
        },

        setActiveTab(index) {
            this.activeTab = index;
        },
    },
};
