import mainhattanHeaderHoverAddRemove from './js/mainhattan-header-hover-add-remove-class.plugin';
import MwProfileTabs from './js/mw-profile-tabs.plugin';

const PluginManager = window.PluginManager;

PluginManager.override('FlyoutMenu',mainhattanHeaderHoverAddRemove,'[data-flyout-menu]');
PluginManager.register('MwProfileTabs', MwProfileTabs, '[data-mw-profile-tabs="true"]');
