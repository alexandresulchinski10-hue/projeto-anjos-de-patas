
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test('O menu mobile abre e fecha corretamente', async () => {
    const scriptPath = pathToFileURL(
        path.join(__dirname, '../script.js')
    ).href;

    const html = `
        <button id="btn-mobile"></button>
        <nav></nav>
        <script src="${scriptPath}"></script>
    `;

    const dom = new JSDOM(html, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    await new Promise((resolve, reject) => {
        dom.window.addEventListener('load', resolve, { once: true });
        dom.window.addEventListener('error', reject, { once: true });
    });

    const button = dom.window.document.getElementById('btn-mobile');
    const nav = dom.window.document.querySelector('nav');

    button.click();

    assert.equal(nav.classList.contains('nav-active'), true);
    assert.equal(button.getAttribute('aria-expanded'), 'true');

    button.click();

    assert.equal(nav.classList.contains('nav-active'), false);
    assert.equal(button.getAttribute('aria-expanded'), 'false');

    dom.window.close();
});
