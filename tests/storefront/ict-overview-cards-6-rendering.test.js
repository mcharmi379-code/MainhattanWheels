const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pluginRoot = path.resolve(__dirname, '..', '..');
const storefrontTemplate = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/views/storefront/element/cms-element-ict-overview-cards-6.html.twig'),
    'utf8',
);
const adminComponentTemplate = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/elements/ict-overview-cards-6/component/sw-cms-el-ict-overview-cards-6.html.twig'),
    'utf8',
);
const adminComponent = fs.readFileSync(
    path.join(pluginRoot, 'src/Resources/app/administration/src/module/sw-cms/elements/ict-overview-cards-6/component/index.js'),
    'utf8',
);

assert.match(storefrontTemplate, /{% if iconImageMedia %}[\s\S]*class="card-icon"/);
assert.match(storefrontTemplate, /{% if headlineText %}[\s\S]*class="card-headline"/);
assert.match(storefrontTemplate, /{% if subheadlineText %}[\s\S]*class="card-subheadline"/);
assert.match(storefrontTemplate, /{% if card\.showBodyText and bodyText %}[\s\S]*class="card-body-text"/);
assert.match(storefrontTemplate, /configuredButtonText[\s\S]*activeButton is null and configuredButtonText/);

assert.match(adminComponentTemplate, /v-if="hasIconImage\(index\)"[\s\S]*class="card-icon"/);
assert.match(adminComponentTemplate, /v-if="hasText\(card\.headline\)"[\s\S]*class="card-headline"/);
assert.match(adminComponentTemplate, /v-if="hasText\(card\.subheadline\)"[\s\S]*class="card-subheadline"/);
assert.match(adminComponentTemplate, /v-if="card\.showBodyText && hasText\(card\.bodyText\)"[\s\S]*class="card-body-text"/);

assert.match(adminComponent, /hasText\(value\)/);
assert.match(adminComponent, /hasIconImage\(index\)/);
assert.match(adminComponent, /this\.hasText\(b\?\.buttonText\)/);
