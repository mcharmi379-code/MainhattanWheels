const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '..', '..');

const template = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/views/storefront/element/cms-element-mw-media-tabs.html.twig'),
    'utf8',
);
const blockTemplate = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/views/storefront/block/cms-block-mw-media-tabs.html.twig'),
    'utf8',
);
const scss = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/storefront/src/scss/component/_mw-media-tabs.scss'),
    'utf8',
);
const plugin = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/storefront/src/js/mw-media-tabs.plugin.js'),
    'utf8',
);
const storefrontMain = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/storefront/src/main.js'),
    'utf8',
);
const baseScss = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/storefront/src/scss/base.scss'),
    'utf8',
);

assert.match(template, /data-mw-media-tabs="true"/);
assert.match(template, /data-mw-media-tabs-trigger/);
assert.match(template, /data-mw-media-tabs-panel/);
assert.match(template, /role="tab"/);
assert.match(template, /<video src=/);
assert.match(template, /<img src=/);
assert.match(template, /contentMediaUrl/);
assert.match(template, /mw-media-tabs__content-media/);
assert.match(template, /mw-media-tabs__content-video/);
assert.match(template, /content\|raw/);
assert.match(blockTemplate, /block\.slots\.getSlot\('mediaTabs'\)/);
assert.match(blockTemplate, /cms-element-' ~ element\.type/);

assert.match(scss, /scroll-snap-type:\s*x mandatory/);
assert.match(scss, /touch-action:\s*manipulation/);
assert.match(scss, /grid-template-columns:\s*repeat\(auto-fit/);
assert.match(scss, /&__panel\s*\{[\s\S]*background:\s*transparent/);
assert.match(scss, /list-style:\s*none/);
assert.match(scss, /&__content-media/);
assert.match(scss, /aspect-ratio:\s*16 \/ 9/);

assert.match(plugin, /class MwMediaTabsPlugin extends Plugin/);
assert.match(plugin, /aria-selected/);
assert.match(plugin, /panel\.setAttribute\('hidden'/);

assert.match(storefrontMain, /MwMediaTabs/);
assert.match(baseScss, /component\/mw-media-tabs/);

console.log('MW Media Tabs storefront rendering is valid.');
