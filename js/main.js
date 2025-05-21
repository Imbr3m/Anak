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


// countdown for deals section
document.addEventListener('DOMContentLoaded', function() {
  // Initialize each deal item with its own timer
  document.querySelectorAll('.deals__item').forEach((dealItem, index) => {
    // Set different end times for each deal (e.g., 48h + index*12h for variety)
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 48 + (index * 12));
    
    function updateCountdown() {
      const now = new Date();
      const diff = countdownDate - now;
      
      // Calculate time units
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Find countdown elements within THIS deal item only
      const periods = dealItem.querySelectorAll('.countdown__period');
      periods[0].textContent = days.toString().padStart(2, '0');
      periods[1].textContent = hours.toString().padStart(2, '0');
      periods[2].textContent = minutes.toString().padStart(2, '0');
      periods[3].textContent = seconds.toString().padStart(2, '0');
      
      // Handle expiration
      if (diff < 0) {
        clearInterval(timer);
        dealItem.querySelector('.deals__countdown-text').textContent = 'Offer Expired!';
        dealItem.classList.add('expired');
      }
    }
    
    // Start the timer for this deal item
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  });
});

// Animate number changes
const periods = dealItem.querySelectorAll('.countdown__period');
periods.forEach(period => {
  if (period._lastValue !== period.textContent) {
    gsap.fromTo(period,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 }
    );
    period._lastValue = period.textContent;
  }
});
