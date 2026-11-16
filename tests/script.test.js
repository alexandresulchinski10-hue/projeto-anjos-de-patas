
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const path = require('node:path');

// Teste 1: Máscara de CPF
test('A máscara de CPF formata os números corretamente', async () => {
    const dom = await JSDOM.fromFile(
        path.join(__dirname, '../cadastro.html'),
        { runScripts: 'dangerously', resources: 'usable' }
    );

    try {
        await new Promise(resolve => {
            if (dom.window.document.readyState === 'complete') {
                resolve();
            } else {
                dom.window.addEventListener('load', resolve, { once: true });
            }
        });

        const cpf = dom.window.document.querySelector('#cpf');
        assert.ok(cpf, 'Campo CPF deve existir');

        cpf.value = '12345678901';
        cpf.dispatchEvent(new dom.window.Event('input', { bubbles: true }));

        assert.equal(cpf.value, '123.456.789-01');
    } finally {
        dom.window.close();
    }
});

// Teste 2: Máscara de telefone
test('A máscara de telefone formata os números corretamente', async () => {
    const dom = await JSDOM.fromFile(
        path.join(__dirname, '../cadastro.html'),
        { runScripts: 'dangerously', resources: 'usable' }
    );

    try {
        await new Promise(resolve => {
            if (dom.window.document.readyState === 'complete') {
                resolve();
            } else {
                dom.window.addEventListener('load', resolve, { once: true });
            }
        });

        const telefone = dom.window.document.querySelector('#telefone');
        assert.ok(telefone, 'Campo telefone deve existir');

        telefone.value = '11987654321';
        telefone.dispatchEvent(new dom.window.Event('input', { bubbles: true }));

        assert.equal(telefone.value, '(11) 98765-4321');
    } finally {
        dom.window.close();
    }
});

// Teste 3: Máscara de CEP
test('A máscara de CEP formata os números corretamente', async () => {
    const dom = await JSDOM.fromFile(
        path.join(__dirname, '../cadastro.html'),
        { runScripts: 'dangerously', resources: 'usable' }
    );

    try {
        await new Promise(resolve => {
            if (dom.window.document.readyState === 'complete') {
                resolve();
            } else {
                dom.window.addEventListener('load', resolve, { once: true });
            }
        });

        const cep = dom.window.document.querySelector('#cep');
        assert.ok(cep, 'Campo CEP deve existir');

        cep.value = '12345678';
        cep.dispatchEvent(new dom.window.Event('input', { bubbles: true }));

        assert.equal(cep.value, '12345-678');
    } finally {
        dom.window.close();
    }
});
