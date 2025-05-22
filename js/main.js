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
    const dealItems = document.querySelectorAll('.deals__item');
    
    dealItems.forEach((dealItem, index) => {
        // Set different end times for each deal
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
                // Update the countdown numbers
                periods.forEach((period, i) => {
                    const newValue = [days, hours, minutes, seconds][i].toString().padStart(2, '0');
                    if (period.textContent !== newValue) {
                        // Create a temporary span for the new number
                        const newSpan = document.createElement('span');
                        newSpan.textContent = newValue;
                        newSpan.style.position = 'absolute';
                        newSpan.style.width = '100%';
                        newSpan.style.left = '0';
                        
                        // Position the new number and animate it
                        if (typeof gsap !== 'undefined') {
                            // Add new number coming from top
                            period.appendChild(newSpan);
                            gsap.fromTo(newSpan,
                                { y: -20 },
                                { 
                                    y: 0, 
                                    duration: 0.3, 
                                    ease: 'power2.out',
                                    onComplete: () => {
                                        // Update the main text and remove the temporary span
                                        period.textContent = newValue;
                                    }
                                }
                            );
                        } else {
                            // If GSAP is not available, just update the number
                            period.textContent = newValue;
                        }
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
        
        // Initial update
        updateCountdown();
        // Start the timer
        const timer = setInterval(updateCountdown, 1000);
        
        // Store timer reference for cleanup
        dealItem._timer = timer;
    });
}

// Cleanup function for deals
function cleanupDeals() {
    const dealItems = document.querySelectorAll('.deals__item');
    dealItems.forEach(dealItem => {
        if (dealItem._timer) {
            clearInterval(dealItem._timer);
        }
    });
}

// Login Modal
function initializeLoginModal() {
    const loginLink = document.getElementById('loginLink');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const registerLink = document.querySelector('.register-link');
    const loginBackLink = document.querySelector('.login-link');
    
    function closeAllModals() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
    
    // Toggle login modal when clicking the account icon
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
    
    // Close modals when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === registerModal) {
            closeAllModals();
        }
    });
    
    // Switch to register modal
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    // Switch back to login modal
    loginBackLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    // Handle form submissions
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
        closeAllModals();
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log('Registration submitted');
        closeAllModals();
    });
}
