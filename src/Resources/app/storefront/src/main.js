import mainhattanHeaderHoverAddRemove from './js/mainhattan-header-hover-add-remove-class.plugin';
import MwWheelShowcasePlugin from './js/mw-wheel-showcase.plugin';

const PluginManager = window.PluginManager;

PluginManager.override('FlyoutMenu',mainhattanHeaderHoverAddRemove,'[data-flyout-menu]');
PluginManager.register('MwWheelShowcasePlugin', MwWheelShowcasePlugin, 'body');

