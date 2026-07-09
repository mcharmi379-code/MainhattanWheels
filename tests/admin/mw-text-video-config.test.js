const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '../..');
const template = fs.readFileSync(
    path.join(
        pluginRoot,
        'src/Resources/app/administration/src/module/sw-cms/elements/mw-text-video/config/sw-cms-el-config-mw-text-video.html.twig',
    ),
    'utf8',
);
const config = fs.readFileSync(
    path.join(
        pluginRoot,
        'src/Resources/app/administration/src/module/sw-cms/elements/mw-text-video/config/index.js',
    ),
    'utf8',
);

[
    'subHeading',
    'buttonText',
    'buttonLink',
    'mediaLink',
].forEach((field) => {
    assert.match(
        template,
        new RegExp(`v-model:value="element\\.config\\.${field}\\.value"[\\s\\S]*?@update:value="onConfigInput"`),
        `${field} must use Shopware 6.6 value binding and emit config updates`,
    );
});

assert.match(config, /emits:\s*\['element-update', 'update:element'\]/);
assert.match(config, /onConfigInput\(\)\s*\{[\s\S]*?\$emit\('update:element', this\.element\)/);
assert.match(config, /syncElementState\(\)\s*\{/);

console.log('MW Text Image/Video Split config bindings are valid.');
