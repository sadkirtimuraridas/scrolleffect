document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const FRAME_COUNT = 268;
  const FRAME_PREFIX = "ezgif-frame-";
  const FRAME_EXTENSION = ".jpg";
  const FRAME_DIGITS = 3;

  const canvas = document.getElementById("sequence-canvas");
  const context = canvas.getContext("2d");
  const section = document.getElementById("scroll-section");
  const images = [];
  const playhead = { frame: 0 };
  let firstImage = null;
  let animationStarted = false;

  function framePath(index) {
    return "images/" + FRAME_PREFIX +
      String(index + 1).padStart(FRAME_DIGITS, "0") + FRAME_EXTENSION;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (firstImage) drawImage(firstImage);
  }

  function drawImage(image) {
    if (!image || !image.complete || !image.naturalWidth) return;
    const width = window.innerWidth, height = window.innerHeight;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, x, y, drawWidth, drawHeight);
  }

  function render() {
    const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(playhead.frame)));
    if (images[index]) drawImage(images[index]);
  }

  function createScrollAnimation() {
    if (animationStarted) return;
    animationStarted = true;
    section.style.height = "600vh";

    gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: render,
        onLeave: () => { playhead.frame = FRAME_COUNT - 1; render(); },
        onLeaveBack: () => { playhead.frame = 0; render(); }
      }
    });
    ScrollTrigger.refresh();
  }

  function loadImages() {
    let firstLoaded = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const image = new Image();
      image.src = framePath(i);
      image.onload = () => {
        if (i === 0) {
          firstImage = image;
          drawImage(firstImage);
          if (!firstLoaded) {
            firstLoaded = true;
            createScrollAnimation();
          }
        }
      };
      image.onerror = () => console.warn("Could not load image:", framePath(i));
      images.push(image);
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  loadImages();

  const nav = document.querySelector(".nav");
  ScrollTrigger.create({
    start: "top -80",
    onUpdate: self => nav.classList.toggle("scrolled", self.scroll() > 80)
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("form-note").textContent =
      "Sample form only — connect this form to email or WhatsApp for the live website.";
  });
});
