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

const navLinks = document.querySelectorAll("#mobile-nav .nav-list a");
const sections = document.querySelectorAll("#home, #community, #feature, #design, #testimonial, #footer");
function setActiveLink() {
    let currentId = "home";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            currentId = section.id;
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("nav-active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("nav-active");
        }
    });
}
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);



const loginBtns = document.querySelectorAll(".js-login-btn");
loginBtns.forEach((btn) => {
    let isLoggedIn = false;
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        isLoggedIn = !isLoggedIn;
        btn.textContent = isLoggedIn ? "logout" : "login";
        btn.classList.add("login-glow");
        setTimeout(() => {
            btn.classList.remove("login-glow");
        }, 500);
    });
});


const learnMoreBtns = document.querySelectorAll(".js-learn-more-btn");
learnMoreBtns.forEach((btn) => {
    let isOpen = false;
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const paragraph = btn.previousElementSibling;
        const moreText = paragraph.querySelector(".more-text");
        isOpen = !isOpen;
        moreText.classList.toggle("hidden");
        btn.textContent = isOpen
            ? "Show Less"
            : "Learn More";
    });
});




const counters = document.querySelectorAll(".counter");
function startCounter(counter) {
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } 
        else {
            counter.textContent =
                Math.floor(current).toLocaleString();
        }
    }, 20);
}
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});
counters.forEach((counter) => {
    counterObserver.observe(counter);
});



const openCustomersBtn = document.querySelector(".js-open-customers");

if (openCustomersBtn) {
    openCustomersBtn.addEventListener("click", (e) => {
        e.preventDefault();

        Fancybox.show([
            { src: "images/logo/logo1.png", type: "image" },
            { src: "images/logo/logo2.png", type: "image" },
            { src: "images/logo/logo3.png", type: "image" },
            { src: "images/logo/logo4.png", type: "image" },
            { src: "images/logo/logo5.png", type: "image" },
            { src: "images/logo/logo6.png", type: "image" },
            { src: "images/logo/logo7.png", type: "image" }
        ]);
    });
}

const demoBtn = document.querySelector(".js-demo-btn");
if (demoBtn) {
    demoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const toast = document.createElement("div");
        toast.textContent =
            "Demo request sent successfully ✓";
        toast.className = "demo-toast";
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    });
}


document.getElementById("year").textContent =
    new Date().getFullYear();








    

   const subscribeForm = document.getElementById("subscribe-form");
const emailInput = document.getElementById("email");
const subscribeMessage = document.getElementById("subscribe-message");

if (subscribeForm && emailInput && subscribeMessage) {
    subscribeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const emailValue = emailInput.value.trim();

        if (emailValue === "") {
            subscribeMessage.textContent = "Please enter your email";
            subscribeMessage.style.color = "#ff6b6b";
            return;
        }

        if (!emailInput.checkValidity()) {
            subscribeMessage.textContent = "Please enter a valid email";
            subscribeMessage.style.color = "#ff6b6b";
            return;
        }

        const formData = new FormData(subscribeForm);

        try {
            await fetch(subscribeForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            subscribeMessage.textContent = "Subscribed successfully ✓";
            subscribeMessage.style.color = "#4CAF4F";

            emailInput.value = "";
        } catch {
            subscribeMessage.textContent = "Something went wrong";
            subscribeMessage.style.color = "#ff6b6b";
        }
    });
}