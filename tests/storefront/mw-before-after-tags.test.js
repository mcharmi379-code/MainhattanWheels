const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const template = fs.readFileSync(
    path.resolve(
        __dirname,
        '../../src/Resources/views/storefront/element/cms-element-mw-before-after.html.twig',
    ),
    'utf8',
);

assert.match(template, /mw-before-after-overlay-tags/);
assert.doesNotMatch(
    template,
    /\{\%\s*if\s+isSingleColumn\s+or\s+not\s+showTagsOnImage\s*\%\}/,
    'Below-image tags must not render just because the element is single-column.',
);
assert.equal(
    (template.match(/\{\%\s*if\s+not\s+showTagsOnImage\s*\%\}/g) || []).length,
    2,
    'Before and after below-image tags should render only when showTagsOnImage is false.',
);

console.log('MW Before-After tag placement rule is valid.');
