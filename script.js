const langSwitch = document.getElementById("langSwitch");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

let currentLang = "he";

function setLanguage(lang) {
  currentLang = lang;
  const isHebrew = lang === "he";

  document.documentElement.lang = lang;
  document.documentElement.dir = isHebrew ? "rtl" : "ltr";

  document.querySelectorAll("[data-he][data-en]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  if (langSwitch) {
    langSwitch.textContent = isHebrew ? "English" : "עברית";
    langSwitch.setAttribute(
      "aria-label",
      isHebrew ? "Switch to English" : "מעבר לעברית"
    );
  }
}

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    setLanguage(currentLang === "he" ? "en" : "he");
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav && menuToggle) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});


// Desktop dropdowns are hover-only: prevent trigger clicks from retaining focus.
document.querySelectorAll(".nav-group-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (window.matchMedia("(min-width: 1051px)").matches) {
      event.preventDefault();
      trigger.blur();
    }
  });
});


// Services title typing animation
const servicesHeading = document.querySelector(".services-heading");
const servicesTitle = document.querySelector(".services-title");
let servicesTitleAnimated = false;

function animateServicesTitle() {
  if (!servicesHeading || !servicesTitle || servicesTitleAnimated) return;
  servicesTitleAnimated = true;

  const fullText = servicesTitle.textContent.trim();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    servicesTitle.textContent = fullText;
    servicesHeading.classList.add("is-complete");
    return;
  }

  servicesTitle.textContent = "";
  servicesTitle.classList.add("is-typing");

  let index = 0;
  const typeNext = () => {
    servicesTitle.textContent = fullText.slice(0, index + 1);
    index += 1;

    if (index < fullText.length) {
      window.setTimeout(typeNext, 82);
    } else {
      servicesTitle.classList.remove("is-typing");
      window.setTimeout(() => {
        servicesHeading.classList.add("is-complete");
      }, 180);
    }
  };

  typeNext();
}

if (servicesHeading && servicesTitle) {
  const servicesObserver = new IntersectionObserver(
    (entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateServicesTitle();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  servicesObserver.observe(servicesHeading);
}
