// ATENTION: If you are reading this there is a high chance that you are Deqn Nikolov. In this case you are guilty for everything.

// Navbar hide on scroll
var prevScrollpos = window.scrollY;
window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-10rem";
    }
    prevScrollpos = currentScrollPos;
}

// Language switcher
// Default lang: English
// Supported langs: English, Bulgarian, Russian
const supportedLanguages = ['en', 'bg', 'ru']
const defaultLanguage = 'en'

async function loadLanguageModule(lang) {
    try {
        const module = await import(`./i18n/${lang}.js`);
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

window.addEventListener('load', () => {
    const userLang = getPreferredLanguage();
    setLanguage(userLang);
});
