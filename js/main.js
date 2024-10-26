// ATENTION: If you are reading this there is a high chance that you are Deqn Nikolov. In this case you are guilty for everything.
const page = window.location.pathname.split('/').pop().split('.')[0];

// Append navbar on every page
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

// Run site logic
window.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navbar);
    const userLang = getPreferredLanguage();
    // setLanguage(userLang);
    setLanguage('ru');
});
