import template from './sw-cms-el-config-mw-load-capacity-table.html.twig';
import './sw-cms-el-config-mw-load-capacity-table.scss';

const ELEMENT_NAME = 'mw-load-capacity-table';
const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['element-update'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            collapsedGroups: {},
        };
    },

    computed: {
        columnGroups() {
            if (!Array.isArray(this.element.config?.columnGroups?.value)) {
                this.element.config.columnGroups.value = [];
            }
            return this.element.config.columnGroups.value;
        },
    },

    created() {
        this.initElementConfig(ELEMENT_NAME);
        this.ensureDefaultColumnGroup();
    },

    methods: {
        ensureDefaultColumnGroup() {
            if (!Array.isArray(this.element.config?.columnGroups?.value)) {
                this.element.config.columnGroups.value = [];
            }
            if (this.element.config.columnGroups.value.length === 0) {
                this.element.config.columnGroups.value = [
                    { title: 'Loadindex', rangeLabel: '72-85', rows: [{ label: '73', value: '365 kg' }] },
                ];
                this.$emit('element-update', this.element);
            }
        },

        isGroupCollapsed(groupIndex) {
            return !!this.collapsedGroups[groupIndex];
        },

        toggleGroup(groupIndex) {
            this.collapsedGroups = {
                ...this.collapsedGroups,
                [groupIndex]: !this.collapsedGroups[groupIndex],
            };
        },

        addColumnGroup() {
            this.columnGroups.push({ title: 'Loadindex', rangeLabel: '', rows: [] });
            this.$emit('element-update', this.element);
        },

        removeColumnGroup(index) {
            if (this.columnGroups.length <= 1) {
                return;
            }
            this.columnGroups.splice(index, 1);
            this.$emit('element-update', this.element);
        },

        addRow(groupIndex) {
            this.columnGroups[groupIndex].rows.push({ label: '', value: '' });
            this.$emit('element-update', this.element);
        },

        removeRow(groupIndex, rowIndex) {
            this.columnGroups[groupIndex].rows.splice(rowIndex, 1);
            this.$emit('element-update', this.element);
        },

        onFieldChange() {
            this.$emit('element-update', this.element);
        },
    },
};
