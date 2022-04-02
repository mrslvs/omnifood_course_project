// ======= add current year to footer =======
// ==========================================

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// ======= mobile navigation =======
// =================================

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// ======= smooth scrolling animation =======
// ==========================================

// add this link to html in order to make this work on safari browser: https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // when the link is clicked:
    e.preventDefault();

    //get the attribute where the link points to (e.g.: #cta)
    const href = link.getAttribute("href");

    if (href === "#") {
      // if the attribute is "#" (link points to top of the page):
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      // if it doesn't point to the top but elsewhere, scroll there:
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    if (link.classList.contains("main-nav-link")) {
      // if the link that has been clicked is from the mobile navigation:
      // close the navigation menu
      headerEl.classList.toggle("nav-open");
    }
  });
});

// ========= sticky navigation bar =========
// =========================================
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    // array of entries for each threshold value
    // now there is only one threshold value
    const ent = entries[0];

    // when the hero section moves out of the viewport
    // => value FALSE is set to attribute "isIntersection" of ent
    if (ent.isIntersecting === false) {
      //html structure:
      // body
      //    header
      //    main
      //      section-hero

      // add class sticky to the BODY, because we want to add margin to .section-hero to fix screen jump
      // in order to add margin to section-hero, we need to check if sticky has been applied to parent element (body)
      document.body.classList.add("sticky");
    }

    //remove it once the section-hero is in viewport again
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // defining options inside of this "object {}":

    // "should this element be apperaing or not?"
    // => we observe hero section in the viewport
    root: null,

    // event happens once the hero section has none of it inside the viewport
    threshold: 0,
    rootMargin: "-80px", //height of sticky nav
  }
);
obs.observe(sectionHeroEl);

//-------------------------------------------------------------
//---------------- included in starter js file ----------------
//-------------------------------------------------------------

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
