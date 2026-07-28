const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '..', '..');

const configScript = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/elements/mw-profile-tabs/config/index.js'),
    'utf8',
);
const configTemplate = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/elements/mw-profile-tabs/config/sw-cms-el-config-mw-profile-tabs.html.twig'),
    'utf8',
);

assert.match(configTemplate, /@media-upload-finish="onImageUpload"/);
assert.match(configTemplate, /@media-upload-remove-image="onImageRemove"/);
assert.doesNotMatch(configTemplate, /onSelectionChanges\(\[\$event\.media\]\)/);

assert.match(configScript, /async onImageUpload\(\{ targetId \}\)/);
assert.match(configScript, /this\.mediaRepository\.get\(targetId\)/);
assert.match(configScript, /onImageRemove\(\)/);
assert.match(configScript, /updateMedia\(media = null\)/);
assert.match(configScript, /this\.element\.data\.mediaId = media\?\.id \?\? null/);

console.log('MW Profile Tabs admin config is valid.');
