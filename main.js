const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

// Scroll animation setup
if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: false,
        offset: 120
    });
}

// Mobile navigation state
function setMenuState(isOpen) {
    if (!menuToggle || !mobileNav) {
        return;
    }

    mobileNav.classList.toggle("max-md:hidden", !isOpen);
    mobileNav.classList.toggle("mobile-nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark text-lg" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars text-lg" aria-hidden="true"></i>';
}

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.contains("max-md:hidden");
        setMenuState(isOpen);
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 767) {
                setMenuState(false);
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            setMenuState(false);
        }
    });
}
