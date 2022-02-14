"use strict";
//инициализация слайдера для секций сайта
const pageSlider = new Swiper("#page", {
  //мои классы
  wrapperClass: "page-wrapper",
  slideClass: "page-slide",

  direction: "vertical",
  slidesPerView: "auto",
  spaceBetween: 0,
  mousewheel: true,
  //параллакс
  parallax: true,

  //управление клавиатурой
  keyboard: {
    unabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  watchOverflow: true,
  speed: 800,

  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  init: false,

  //scrollbar
  scrollbar: {
    el: ".page_scroll",
    dragClass: "page_drag-scroll",
    draggable: true,
  },

  //события
  on: {
    init: function () {
      menuSlider();
    },
    slideChange: function () {
      menuSliderRemove();
    },
  },
});

pageSlider.on("afterInit", function () {
  //переход к форме заказа
  let buttonsContact = document.querySelectorAll(".contact_button");

  buttonsContact.forEach((button) => {
    button.addEventListener("click", function (EO) {
      EO.preventDefault();
      pageSlider.slideTo(6, 1000);
    });
  });
});

//работа меню сайта
let menuLinks = document.querySelectorAll(".menu_link");

function menuSlider() {
  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add("_active");
    for (let i = 0; i < menuLinks.length; i++) {
      const menuLink = menuLinks[i];
      menuLink.addEventListener("click", function (EO) {
        EO.preventDefault();
        menuSliderRemove();
        menuLink.classList.add("_active");
        pageSlider.slideTo(i, 800);
        if (window.innerWidth <= 900) {
          let barsMenu = document.querySelector("header .menu nav");
          let bars = document.querySelector(".bars");
          let backArrow = document.querySelector(".backArrow");
          barsMenu.style.transform = "translateX(100%)";
          backArrow.style.display = "";
          bars.style.display = "block";
        }
      });
    }
  }
}

function menuSliderRemove() {
  let menuLinkActive = document.querySelector(".menu_link._active");
  if (menuLinkActive) {
    menuLinkActive.classList.remove("_active");
  }
}

pageSlider.init();

//инициализация слайдера для cтран
const pageSliderGuides = new Swiper(".swiper_guides", {
  speed: 800,

  slidesPerView: 1,
  spaceBetween: 40,
  slidesPerGroup: 1,
 
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    // when window width is >= 550px
    550: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 750px
    850: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },

  pagination: {
    el: ".swiper-pagination-guides",
    clickable: true,
  },
});

//инициализация слайдера для отзывов
const pageSliderReview = new Swiper(".swiper_review", {
  speed: 800,
 
  slidesPerView: 1,
  spaceBetween: 40,
  slidesPerGroup: 1,
 
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    // when window width is >= 550px
    550: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 750px
    850: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },

  pagination: {
    el: ".swiper-pagination-review",
    clickable: true,
  },
});

//Работа с баром (мобильная версия)
let bars = document.querySelector(".bars");
bars.addEventListener("click", clickBars);

//обработчик для bars (для мобильной версии)
function clickBars() {
  let barsMenu = document.querySelector(".menu nav");
  barsMenu.style.transform = "translateX(0%)";
  bars.style.display = "none";

  let backArrow = document.querySelector(".backArrow");
  backArrow.style.display = "block";

  backArrow.addEventListener("click", clickBackArrowBars);

  function clickBackArrowBars() {
    barsMenu.style.transform = "translateX(-100%)";
    bars.style.display = "block";
    backArrow.style.display = "none";
  }

  window.onresize = () => {
    if (window.innerWidth > 890) {
      bars.style.display = "";
      backArrow.style.display = "";
      barsMenu.style.transform = "translateX(0%)";
    }
    if (window.innerWidth <= 890) {
      barsMenu.style.transform = "translateX(-100%)";
      backArrow.style.display = "";
      bars.style.display = "block";
    }
  };
}
