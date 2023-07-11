/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require('jsdom');
const fs = require('fs');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
