const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '..', '..');

const elementIndex = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/elements/mw-media-tabs/index.js'),
    'utf8',
);
const blockIndex = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/blocks/mw-media-tabs/index.js'),
    'utf8',
);
const configTemplate = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/elements/mw-media-tabs/config/sw-cms-el-config-mw-media-tabs.html.twig'),
    'utf8',
);
const adminMain = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/main.js'),
    'utf8',
);

assert.match(elementIndex, /name:\s*ELEMENT_NAME/);
assert.match(elementIndex, /subtitleColor/);
assert.match(elementIndex, /backgroundColor/);
assert.match(elementIndex, /activeColor/);
assert.match(elementIndex, /tabs:\s*\{\s*source:\s*'static'/);

assert.match(blockIndex, /allowedCmsElements:\s*\['mw-media-tabs'\]/);
assert.match(blockIndex, /type:\s*'mw-media-tabs'/);

assert.match(configTemplate, /Add tabs from media/);
assert.match(configTemplate, /sw-media-upload-v2/);
assert.match(configTemplate, /Content media/);
assert.match(configTemplate, /contentMediaType/);
assert.match(configTemplate, /onContentUploadFinish/);
assert.match(configTemplate, /allow-multi-select="true"/);
assert.match(configTemplate, /sw-text-editor/);
assert.match(configTemplate, /Card text color/);

assert.match(adminMain, /elements\/mw-media-tabs/);
assert.match(adminMain, /blocks\/mw-media-tabs/);

console.log('MW Media Tabs admin config is valid.');
