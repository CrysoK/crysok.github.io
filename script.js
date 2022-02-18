function scrollEventThrottle(fn) {
  let last_known_scroll_position = 0;
  let ticking = false;
  window.addEventListener("scroll", function () {
    let previous_known_scroll_position = last_known_scroll_position;
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        fn(last_known_scroll_position, previous_known_scroll_position);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ## function invocation
scrollEventThrottle((scrollPos, previousScrollPos) => {
  if (previousScrollPos > scrollPos) {
    $("header").removeClass("nav-show");
  } else {
    $("header").addClass("nav-show");
  }
});

// header scrolling effect
$(window).on("scroll", function () {
  if ($(window).scrollTop()) {
    $("header").addClass("nav-show");
  } else {
    $("header").removeClass("nav-show");
  }
});

$(window).onscroll = function (e) {
  // print "false" if direction is down and "true" if up
  console.log(this.oldScroll > this.scrollY);
  this.oldScroll = this.scrollY;
};

//hamburger
const navSlide = () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".nav-bar");
  const navLinks = document.querySelectorAll(".nav-bar li");

  hamburger.onclick = () => {
    navbar.classList.toggle("nav-active");

    //Animation links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.05s ease forwards ${
          index / 7 + 1
        }s`;
      }
    });
    //hamburger animation
    hamburger.classList.toggle("toggle");
  };
};

window.onload = () => navSlide();

// The below provided options are default.
var translator = new Translator({
  defaultLanguage: "en",
  detectLanguage: true,
  selector: "[data-i18n]",
  debug: true,
  registerGlobally: "__",
  persist: true,
  persistKey: "last_lang",
  filesLocation: "i18n",
});

translator.fetch(["en", "es"]).then(() => {
  // Default or detected language
  translator.translatePageTo();
});
// Language selector
registerLanguageToggle();

function registerLanguageToggle() {
  var select = document.querySelector("#lang");

  select.addEventListener("click", (evt) => {
    var language = evt.target.innerHTML.toLowerCase();
    translator.translatePageTo(language);
  });
}
