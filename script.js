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
