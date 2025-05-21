// Loader and Intro header
document.addEventListener('DOMContentLoaded', function() {
  // Correct plugin registration
  gsap.registerPlugin(ScrollTrigger);
  
  // Landing page Intro
  let tl = gsap.timeline();
  
  // up the logo and text
  tl.from(".pre-loader-container", {
    duration: 0.8,
    y: 40,
    opacity: 0,
    ease: "power2.inOut",
    delay: 1
  })
  tl.from(".pre-logo-img", {
    duration: 0.8,
    x: "100px",
    scale: 1.5,
    ease: "power2.inOut",
    delay: 0.5
  })
  tl.from(".pre-logo-text", {
    duration: 0.8,
    x: 10,
    opacity: 0,
    ease: "power2.inOut",
  })
  .from(".loader", {
    duration: 2,
    width: 0,
    opacity: 0,
    ease: "power4.inOut",
    delay: -1,
  }, "-=0.5") 
  .to(".pre-loader", {
    duration: 2,
    top: "-110%",
    ease: "power4.inOut",
    delay: -0.5,
  })//loader end
  // landing section
  tl.from(".landing-title", {
    duration: 2,
    x: -45,
    opacity: 0,
    ease: "power4.inOut",
  }, "-=1")
  tl.from(".landing-text p, .landing-text button", {
    duration: 2,
    x: 45,
    opacity: 0,
    stagger: 0.25,
    ease: "power4.inOut",
  }, "-=1.75")
  tl.from(".landing-section", {
    duration: 2,
    y: -45,
    ease: "power4.inOut",
  }, "-=1")
    tl.from("nav", {
    duration: 2,
    // opacity: 0,
    y: -100,
    ease: "power4.inOut",
  }, "-=1.5")
  tl.from(".nav__link.active-link", {
    duration: 1,
    color: "#000000", // Force black temporarily
    ease: "power4.inOut"
  }, "-=1.5")
  .to(".nav__link.active-link", {
    duration: 0.5, 
    color: "#d8ae7a", //color of active page
    delay: -0.75
  });
  

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

  // FEATURED CATEGORY ANIMATION
  gsap.from(".featured-category-section .cards .card", {
    duration: 1,
    x: 100,
    opacity: 0,
    stagger: {
      each: 0.1,
      from: "random", // Randomizes start point
    },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".featured-category-section",
      start: "top 75%", 
      end: "bottom center",
      toggleActions: "play none none none"
    },
  });

  // Dark mode transition
 // Add class instead of direct animation
  gsap.fromTo("main",
    { backgroundColor: "#ffffff" },
    {
      backgroundColor: "#f5deb3",
      duration: 0.7,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".spring-selction-section",
        start: "5% center",
        end: "100% center",
        toggleActions: "play reverse play reverse"
      }
    }
  );

  // MORE BUTTON ANIMATION
  // Select all .more elements
  document.querySelectorAll('.more').forEach(item => {
    // Mouse enter (hover) animation
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        rotation: 14, // Rotate 10 degrees clockwise
        scale: 1.2, // Tiny grow
        duration: 0.3,
        ease: "elastic.out(1, 0.5)" // Playful bounce effect
      });
    });

    // Mouse leave animation
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        rotation: 0, // Return to original position
        scale: 1.00,
        duration: 0.6,
        ease: "back.out(1.7)" // Smooth return with slight overshoot
      });
    });
  });
  













































































});


