import CollapseFooterColumnsPlugin from 'src/plugin/collapse/collapse-footer-columns.plugin';
import Iterator from 'src/helper/iterator.helper';

export default class MainhattanCollapseFooterColumnsPlugin extends CollapseFooterColumnsPlugin {
    _onViewportHasChanged() {
        const event = 'click';

        Iterator.iterate(this._columns, column => {
            const trigger = column.querySelector(this.options.collapseColumnTriggerSelector);
            if (!trigger) {
                return;
            }

            trigger.removeEventListener(event, this._onClickCollapseTrigger);

            if (this._isInAllowedViewports()) {
                trigger.addEventListener(event, this._onClickCollapseTrigger.bind(this));
            }
        });

        this.$emitter.publish('onViewportHasChanged');
    }
}
