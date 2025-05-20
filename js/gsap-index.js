// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Correct plugin registration
  gsap.registerPlugin(ScrollTrigger);
  
  // Landing page Intro
  let tl = gsap.timeline();
  
  // Properly sequenced animations
  tl.from(".text", {
    duration: 0.8,
    y: 40,
    opacity: 0,
    ease: "power2.inOut",
    delay: 1
  })
  .from(".loader", {
    duration: 2,
    width: 0,
    opacity: 0,
    ease: "power4.inOut"
  }, "-=0.5") // Starts 0.5s before previous animation ends
  .to(".pre-loader", {
    duration: 2,
    top: "-110%",
    ease: "power4.inOut"
  })
  tl.from(".landing-section", {
    duration: 2,
    y: -45,
    ease: "power4.inOut",
}, "-=1")
  




});


