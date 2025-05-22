// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initializeSwiper();
    initializeProductTabs();
    initializeReviews();
    initializeDeals();
    initializeLoginModal();
});

// Swiper Categories
function initializeSwiper() {
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
}

// Product Tabs
function initializeProductTabs() {
    const tabs = document.querySelectorAll('[data-target]');
    const tabContents = document.querySelectorAll('[content]');

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
}

// Reviews
function initializeReviews() {
    const carousel = document.querySelector(".reviews-carousel");
    const slide = document.querySelector(".reviews-slide");
    
    if (carousel && slide) {
        // Clone 3 times (original + 2 copies)
        for (let i = 0; i < 4; i++) {
            const copy = slide.cloneNode(true);
            carousel.appendChild(copy);
        }
    }
}

// Deals Countdown
function initializeDeals() {
    document.querySelectorAll('.deals__item').forEach((dealItem, index) => {
        const countdownDate = new Date();
        countdownDate.setHours(countdownDate.getHours() + 48 + (index * 12));
        
        function updateCountdown() {
            const now = new Date();
            const diff = countdownDate - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            const periods = dealItem.querySelectorAll('.countdown__period');
            if (periods.length === 4) {
                periods[0].textContent = days.toString().padStart(2, '0');
                periods[1].textContent = hours.toString().padStart(2, '0');
                periods[2].textContent = minutes.toString().padStart(2, '0');
                periods[3].textContent = seconds.toString().padStart(2, '0');

                // Animate number changes
                periods.forEach(period => {
                    if (period._lastValue !== period.textContent) {
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(period,
                                { y: -10, opacity: 0 },
                                { y: 0, opacity: 1, duration: 0.3 }
                            );
                        }
                        period._lastValue = period.textContent;
                    }
                });
            }
            
            if (diff < 0) {
                clearInterval(timer);
                const countdownText = dealItem.querySelector('.deals__countdown-text');
                if (countdownText) {
                    countdownText.textContent = 'Offer Expired!';
                }
                dealItem.classList.add('expired');
            }
        }
        
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
    });
}

// Login Modal
function initializeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const loginLink = document.getElementById('loginLink');
    const closeModal = document.querySelector('.close-modal');

    console.log('Login elements:', { loginModal, loginLink, closeModal }); // Debug log

    if (loginModal && loginLink && closeModal) {
        // Open modal
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Login link clicked'); // Debug log
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            console.log('Close button clicked'); // Debug log
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                console.log('Clicked outside modal'); // Debug log
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Handle form submission
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
            });
        }
    } else {
        console.error('Some modal elements are missing:', {
            modal: !!loginModal,
            link: !!loginLink,
            closeBtn: !!closeModal
        });
    }
}
