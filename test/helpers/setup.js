require('babel-register')({
  presets: ['react', 'es2015']
});

require('babel-polyfill');

global.document = require('jsdom').jsdom(`
  <head>
    <meta charset='UTF-8'>
    <title>Fridays</title>
  </head>
  <body>
    <section id='app'></section>
  </body>
`);

global.window = document.defaultView;
global.navigator = window.navigator;
