function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function progressCounter() {
  const progressCount = document.querySelector("#progress h5");
  let count = 0;

  const counter = setInterval(function () {
    count++;
    if (count === 100) {
      clearInterval(counter);
    }
    progressCount.textContent = count;
  }, 30);
}

function preloaderAnimations() {
  gsap.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.5,
    delay: 0.3,
  });

  gsap.from("#progress", {
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
  });

  gsap.from("#wait-message p", {
    opacity: 0,
    duration: 0.4,
    delay: 1.2,
  });

  gsap.to("#line1 #progress", {
    opacity: 0,
    duration: 0.5,
    delay: 3.2,
  });

  gsap.to("#line1 h1", {
    opacity: 0,
    duration: 0.9,
    delay: 3.2,
  });

  gsap.to("#line3 h1 span", {
    opacity: 0,
    duration: 0.9,
    delay: 3.2,
  });

  gsap.to("#wait-message p", {
    opacity: 0,
    duration: 0.9,
    delay: 3.2,
  });

  gsap.to("#line2 h1", {
    opacity: 0,
    duration: 0.8,
    delay: 3.4,
  });

  gsap.to("#line3 h1", {
    opacity: 0,
    duration: 0.8,
    delay: 3.4,
  });

  gsap.to("#loader", {
    opacity: 0,
    y: -1600,
    duration: 1.45,
    delay: 4.5,
  });

  gsap.to("#loader", {
    display: "none",
    delay: 4.65,
  });

  gsap.from("nav", {
    opacity: 0,
    y: -120,
    delay: 4.68,
    duration: 1,
  });

  gsap.from(".hero h1", {
    y: 120,
    stagger: 0.2,
    delay: 4.65,
  });

  gsap.from("#hero1-wrapper", {
    opacity: 0,
    y: 50,
    delay: 4.65,
    duration: 1,
  });

  gsap.from("#page2", {
    opacity: 0,
    delay: 4.66,
    duration: 1,
  });
}

function cursorAnimation() {
  const cursor = document.querySelector("#cursor");
  if (!cursor) return;

  window.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.clientX,
      y: dets.clientY,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  if (window.Shery && document.querySelector("#nav-part2 h4")) {
    Shery.makeMagnet("#nav-part2 h4", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });
  }
}

locomotiveScroll();
progressCounter();
preloaderAnimations();
cursorAnimation();
