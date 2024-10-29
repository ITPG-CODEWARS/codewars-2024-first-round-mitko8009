// Language switcher
// Default lang: English
// Supported langs: English, Bulgarian, Russian
const supportedLanguages = ['en', 'bg', 'ru', "es"]
const defaultLanguage = 'en'

async function loadLanguageModule(lang) {
    try {
        const module = await import(`../i18n/${lang}.js`);
        return module.default;
    } catch (error) {
        console.error(`Error loading the ${lang} module:`, error);
        return null;
    }
}

function getPreferredLanguage() {
    const browserLanguages = navigator.languages || [navigator.language];
    const matchedLang = browserLanguages.map(lang => lang.split('-')[0]).find(lang => supportedLanguages.includes(lang));
    return matchedLang || defaultLanguage;
}

async function setLanguage(lang) {
    const translations = await loadLanguageModule(lang);
    if (translations) updateUI(translations);
}

function updateUI(translations) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[key] || key;
    });
}
