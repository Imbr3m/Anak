// Wait for DOM to be fully loaded
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
    y: -100,
    ease: "power4.inOut",
  }, "-=1.5")
  
  




});


