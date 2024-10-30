const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'es', 'fr', 'de', 'hi'], 
    directory: path.join(__dirname, 'locales'), 
    defaultLocale: 'en',
    queryParameter: 'lang',
    autoReload: true,
    objectNotation: true,
});

module.exports = i18n;
