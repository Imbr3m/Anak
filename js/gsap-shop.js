document.addEventListener('DOMContentLoaded', function() {
  // Correct plugin registration
  gsap.registerPlugin(ScrollTrigger);
  
  // NAV BAR SCROLL OUT FUNCTION
    let lastScrollTop = 0;
    let navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only apply effect after scrolling down a bit (e.g., 100px)
      if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
          // Scrolling down - hide navbar
          gsap.to(navbar, {
            duration: 0.4,
            y: (-navbar.offsetHeight + -20),
            ease: "power2.out"
          });
        } else {
          // Scrolling up - show navbar
          gsap.to(navbar, {
            duration: 0.3,
            y: 0,
            ease: "power2.out"
          });
        }
      } else {
        // At the top - ensure navbar is visible
        gsap.to(navbar, {
          duration: 0.3,
          y: 0,
          ease: "power2.out"
        });
      }
      
      lastScrollTop = scrollTop;
    }); // NAV BAR SCROLL OUT FUNCTION END
  


});

