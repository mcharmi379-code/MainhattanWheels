import template from './sw-cms-el-config-mw-image-hotspot.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeConfigTab: 1,
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        tabCount: {
            get() {
                return this.element.config.tabCount.value;
            },
            set(value) {
                this.element.config.tabCount.value = value;
                this.$emit('element-update', this.element);
            },
        },

        activeTabHotspotCount: {
            get() {
                const key = `tab${this.activeConfigTab}HotspotCount`;
                return this.element.config[key].value;
            },
            set(value) {
                const key = `tab${this.activeConfigTab}HotspotCount`;
                this.element.config[key].value = value;
                this.$emit('element-update', this.element);
            },
        },

        activeTabMediaId() {
            const key = `tab${this.activeConfigTab}MediaId`;
            return this.element.config[key].value;
        },

        activeTabIconId() {
            const key = `tab${this.activeConfigTab}IconId`;
            return this.element.config[key].value;
        },
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-image-hotspot');
        },

        onInput() {
            this.$emit('element-update', this.element);
        },

        onMediaUploadSuccess({ targetId }) {
            const key = `tab${this.activeConfigTab}MediaId`;
            this.element.config[key].value = targetId;
            this.$emit('element-update', this.element);
        },

        onRemoveMedia() {
            const key = `tab${this.activeConfigTab}MediaId`;
            this.element.config[key].value = null;
            this.$emit('element-update', this.element);
        },

        onIconUploadSuccess({ targetId }) {
            const key = `tab${this.activeConfigTab}IconId`;
            this.element.config[key].value = targetId;
            this.$emit('element-update', this.element);
        },

        onRemoveIcon() {
            const key = `tab${this.activeConfigTab}IconId`;
            this.element.config[key].value = null;
            this.$emit('element-update', this.element);
        },

        setActiveConfigTab(index) {
            this.activeConfigTab = index;
        },

        addTab() {
            if (this.tabCount >= 8) return;
            const newIndex = this.tabCount + 1;
            
            // Set defaults for new tab
            this.element.config[`tab${newIndex}Title`].value = `Tab ${newIndex}`;
            this.element.config[`tab${newIndex}IconId`].value = null;
            this.element.config[`tab${newIndex}MediaId`].value = null;
            this.element.config[`tab${newIndex}HotspotCount`].value = 3;
            for (let h = 1; h <= 5; h++) {
                this.element.config[`tab${newIndex}Hotspot${h}Top`].value = 50.0;
                this.element.config[`tab${newIndex}Hotspot${h}Left`].value = 50.0;
                this.element.config[`tab${newIndex}Hotspot${h}Title`].value = '';
                this.element.config[`tab${newIndex}Hotspot${h}Text`].value = '';
            }

            this.tabCount = newIndex;
            this.activeConfigTab = newIndex;
            this.$emit('element-update', this.element);
        },

        removeTab(index) {
            if (this.tabCount <= 1) return;

            // Shift values down
            for (let t = index; t < this.tabCount; t++) {
                const next = t + 1;
                this.element.config[`tab${t}Title`].value = this.element.config[`tab${next}Title`].value;
                this.element.config[`tab${t}IconId`].value = this.element.config[`tab${next}IconId`].value;
                this.element.config[`tab${t}MediaId`].value = this.element.config[`tab${next}MediaId`].value;
                this.element.config[`tab${t}HotspotCount`].value = this.element.config[`tab${next}HotspotCount`].value;
                for (let h = 1; h <= 5; h++) {
                    this.element.config[`tab${t}Hotspot${h}Top`].value = this.element.config[`tab${next}Hotspot${h}Top`].value;
                    this.element.config[`tab${t}Hotspot${h}Left`].value = this.element.config[`tab${next}Hotspot${h}Left`].value;
                    this.element.config[`tab${t}Hotspot${h}Title`].value = this.element.config[`tab${next}Hotspot${h}Title`].value;
                    this.element.config[`tab${t}Hotspot${h}Text`].value = this.element.config[`tab${next}Hotspot${h}Text`].value;
                }
            }

            // Decrement count
            this.tabCount = this.tabCount - 1;

            if (this.activeConfigTab > this.tabCount) {
                this.activeConfigTab = this.tabCount;
            }
            this.$emit('element-update', this.element);
        },
    },
};
