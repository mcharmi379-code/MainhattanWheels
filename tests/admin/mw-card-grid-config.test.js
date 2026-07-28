const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '../..');
const configTemplate = fs.readFileSync(
    path.join(
        pluginRoot,
        'src/Resources/app/administration/src/module/sw-cms/elements/mw-card-grid/config/sw-cms-el-config-mw-card-grid.html.twig',
    ),
    'utf8',
);
const elementIndex = fs.readFileSync(
    path.join(
        pluginRoot,
        'src/Resources/app/administration/src/module/sw-cms/elements/mw-card-grid/index.js',
    ),
    'utf8',
);
const configIndex = fs.readFileSync(
    path.join(
        pluginRoot,
        'src/Resources/app/administration/src/module/sw-cms/elements/mw-card-grid/config/index.js',
    ),
    'utf8',
);

assert.match(configTemplate, /label="Show title beside badge"/);
assert.match(configTemplate, /<sw-text-editor[\s\S]*?v-model:value="card\.description"[\s\S]*?label="Description"/);
assert.doesNotMatch(configTemplate, /Subheading \/ Link Text/);
assert.doesNotMatch(configTemplate, /Link Type|sw-dynamic-url-field|Open in new tab/);
assert.match(elementIndex, /titleBesideBadge:\s*\{\s*source:\s*'static',\s*value:\s*false\s*\}/);
assert.match(configIndex, /description:\s*card\.description\s*\?\?\s*card\.subheading\s*\?\?\s*''/);

console.log('MW Card Grid admin config is valid.');
