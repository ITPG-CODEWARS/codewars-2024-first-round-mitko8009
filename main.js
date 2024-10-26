// ATENTION: If you are reading this there is a high chance that you are Deqn Nikolov. In this case you are guilty for everything.

// Append navbar on every page
const page = window.location.pathname.split('/').pop().split('.')[0];

const navbar = `
<div id="navbar">
    <img src="assets/metro-sofia-logo-white.svg" style="width: 2.5rem;">
    <a data-i18n="title" style="max-width: 3dvw;"></a>
    <div class="nav-buttons">
        <a href="index.html" data-i18n="home" class="${page == "index" ? "active" : ""}"></a>
        <a href="map.html" data-i18n="map" class="${page == "map" ? "active" : ""}"></a>
        <a href="facts.html" data-i18n="facts" class="${page == "facts" ? "active" : ""}"></a>
        <a href="history.html" data-i18n="history" class="${page == "history" ? "active" : ""}"></a>
    </div>
</div>`

document.body.insertAdjacentHTML('afterbegin', navbar);


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
// Supported langs: English, Bulgarian, Russian, Diko language
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
    // setLanguage(userLang);
    setLanguage('ru');
});
