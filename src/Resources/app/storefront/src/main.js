import mainhattanHeaderHoverAddRemove from './js/mainhattan-header-hover-add-remove-class.plugin';
import MwProfileTabs from './js/mw-profile-tabs.plugin';
import IctContentTabsPlugin from './js/ict-content-tabs/ict-content-tabs.plugin';
import MwBeforeAfter from './js/mw-before-after.plugin';
import MwVideoPlayer from './js/mw-video-player.plugin';

const PluginManager = window.PluginManager;
PluginManager.override('FlyoutMenu', mainhattanHeaderHoverAddRemove, '[data-flyout-menu]');
PluginManager.register('MwProfileTabs', MwProfileTabs, '[data-mw-profile-tabs="true"]');
PluginManager.register('IctContentTabs', IctContentTabsPlugin, '[data-ict-content-tabs]');
PluginManager.register('MwBeforeAfter', MwBeforeAfter, '[data-mw-before-after]');
PluginManager.register('MwVideoPlayer', MwVideoPlayer, '[data-mw-video-player]');

// Manually initialize our own plugins since DOMContentLoaded already fired
document.querySelectorAll('[data-mw-before-after]').forEach(el => new MwBeforeAfter(el));
document.querySelectorAll('[data-mw-profile-tabs="true"]').forEach(el => new MwProfileTabs(el));
document.querySelectorAll('[data-ict-content-tabs]').forEach(el => new IctContentTabsPlugin(el));
document.querySelectorAll('[data-mw-video-player]').forEach(el => new MwVideoPlayer(el));
