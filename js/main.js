document.addEventListener('DOMContentLoaded', () => {
    var swiperCategories = new Swiper(".trending-container", {
      spaceBetween: 24,
      loop: true,
      
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      },
    });
});

/*=============== SWIPER PRODUCTS ===============*/
document.addEventListener('DOMContentLoaded', function() {
    var swiperProducts = new Swiper('.new__container', {
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next-arrivals',
            prevEl: '.swiper-button-prev-arrivals',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
    });
    
    // Log to check if Swiper is initialized
    console.log('Swiper initialized:', swiperProducts);
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active-tab');
    });

    target.classList.add('active-tab');

    tabs.forEach((tab) => {
      tab.classList.remove('active-tab');
    });

    tab.classList.add('active-tab');
  });
});



// review
const carousel = document.querySelector(".reviews-carousel");
    const slide = document.querySelector(".reviews-slide");
    
    // Clone 3 times (original + 2 copies)
    for (let i = 0; i < 4; i++) {
        const copy = slide.cloneNode(true);
        carousel.appendChild(copy);
    }


