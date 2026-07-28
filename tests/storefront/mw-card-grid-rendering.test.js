const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '../..');
const template = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/views/storefront/element/cms-element-mw-card-grid.html.twig'),
    'utf8',
);
const scss = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/storefront/src/scss/component/_mw-card-grid.scss'),
    'utf8',
);

assert.match(template, /titleBesideBadge/);
assert.match(template, /card\.description \?\? card\.subheading \?\? ''/);
assert.match(template, /mw-card-grid__description/);
assert.match(template, /is--title-beside-badge/);
assert.doesNotMatch(template, /<a\s+[\s\S]*?class="mw-card-grid__card"/);
assert.doesNotMatch(template, /href=|linkUrl|linkType|linkNewTab|mw-card-grid__arrow/);
assert.match(scss, /#e35630/);
assert.match(scss, /&\.is--title-beside-badge/);

console.log('MW Card Grid storefront rendering is valid.');
