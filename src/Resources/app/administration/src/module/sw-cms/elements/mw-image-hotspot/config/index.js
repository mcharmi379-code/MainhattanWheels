import template from './sw-cms-el-config-mw-image-hotspot.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeConfigTab: 1,
            dynamicElementCache: {},
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

        cmsElementRegistry() {
            return Shopware.Service('cmsService').getCmsElementRegistry();
        },

        dynamicElementTypeOptions() {
            return Object.values(this.cmsElementRegistry)
                .filter((def) => def.name !== 'mw-image-hotspot')
                .map((def) => ({
                    value: def.name,
                    label: this.$tc(def.label || def.name),
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
        },

        activeTabDynamicCount: {
            get() {
                const key = `tab${this.activeConfigTab}DynamicCount`;
                return this.element.config[key].value;
            },
            set(value) {
                const key = `tab${this.activeConfigTab}DynamicCount`;
                this.element.config[key].value = value;
                this.$emit('element-update', this.element);
            },
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

        dynamicTypeKey(t, d) {
            return `tab${t}Dynamic${d}Type`;
        },

        dynamicConfigKey(t, d) {
            return `tab${t}Dynamic${d}Config`;
        },

        dynamicElementType(t, d) {
            return this.element.config[this.dynamicTypeKey(t, d)].value;
        },

        // Returns a reactive, cms-element-shaped object ({ type, config, data }) so the
        // picked element type's own config component can be mounted against it directly.
        getDynamicElement(t, d) {
            const cacheKey = `${t}-${d}`;
            const type = this.dynamicElementType(t, d);

            if (this.dynamicElementCache[cacheKey] && this.dynamicElementCache[cacheKey].type === type) {
                return this.dynamicElementCache[cacheKey];
            }

            const definition = this.cmsElementRegistry[type];
            let config = {};

            if (definition) {
                const stored = this.element.config[this.dynamicConfigKey(t, d)].value;
                try {
                    const parsed = stored ? JSON.parse(stored) : {};
                    config = Object.keys(parsed).length
                        ? parsed
                        : JSON.parse(JSON.stringify(definition.defaultConfig || {}));
                } catch (e) {
                    config = JSON.parse(JSON.stringify(definition.defaultConfig || {}));
                }
            }

            const fakeElement = Shopware.Utils.object.cloneDeep({
                type,
                config,
                data: {},
            });

            this.dynamicElementCache[cacheKey] = fakeElement;
            return fakeElement;
        },

        dynamicConfigComponent(t, d) {
            const definition = this.cmsElementRegistry[this.dynamicElementType(t, d)];
            return definition ? definition.configComponent : null;
        },

        onDynamicElementUpdate(t, d, updatedElement) {
            const cacheKey = `${t}-${d}`;
            this.dynamicElementCache[cacheKey] = updatedElement;
            this.element.config[this.dynamicConfigKey(t, d)].value = JSON.stringify(updatedElement.config || {});
            this.$emit('element-update', this.element);
        },

        onDynamicTypeChange(t, d, newType) {
            const cacheKey = `${t}-${d}`;
            delete this.dynamicElementCache[cacheKey];

            this.element.config[this.dynamicTypeKey(t, d)].value = newType;

            const definition = this.cmsElementRegistry[newType];
            this.element.config[this.dynamicConfigKey(t, d)].value = JSON.stringify(
                (definition && definition.defaultConfig) || {},
            );

            this.$emit('element-update', this.element);
        },

        addDynamicElement(t) {
            const key = `tab${t}DynamicCount`;
            if (this.element.config[key].value >= 5) return;
            this.element.config[key].value += 1;
            this.$emit('element-update', this.element);
        },

        removeDynamicElement(t, d) {
            const countKey = `tab${t}DynamicCount`;
            const count = this.element.config[countKey].value;

            for (let i = d; i < count; i++) {
                this.element.config[this.dynamicTypeKey(t, i)].value = this.element.config[this.dynamicTypeKey(t, i + 1)].value;
                this.element.config[this.dynamicConfigKey(t, i)].value = this.element.config[this.dynamicConfigKey(t, i + 1)].value;
            }

            this.element.config[this.dynamicTypeKey(t, count)].value = null;
            this.element.config[this.dynamicConfigKey(t, count)].value = '{}';

            this.element.config[countKey].value = count - 1;
            this.dynamicElementCache = {};
            this.$emit('element-update', this.element);
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
            this.element.config[`tab${newIndex}DynamicCount`].value = 0;
            for (let d = 1; d <= 5; d++) {
                this.element.config[`tab${newIndex}Dynamic${d}Type`].value = null;
                this.element.config[`tab${newIndex}Dynamic${d}Config`].value = '{}';
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
                this.element.config[`tab${t}DynamicCount`].value = this.element.config[`tab${next}DynamicCount`].value;
                for (let d = 1; d <= 5; d++) {
                    this.element.config[`tab${t}Dynamic${d}Type`].value = this.element.config[`tab${next}Dynamic${d}Type`].value;
                    this.element.config[`tab${t}Dynamic${d}Config`].value = this.element.config[`tab${next}Dynamic${d}Config`].value;
                }
            }
            this.dynamicElementCache = {};

            // Decrement count
            this.tabCount = this.tabCount - 1;

            if (this.activeConfigTab > this.tabCount) {
                this.activeConfigTab = this.tabCount;
            }
            this.$emit('element-update', this.element);
        },
    },
};
