document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // IMAGE SEQUENCE SETTINGS
  // ============================================================

  const FRAME_COUNT = 300;

  // Your exact file naming:
  // ezgif-frame-001.jpg
  // ezgif-frame-002.jpg
  // ...
  // ezgif-frame-300.jpg

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

  // ============================================================
  // FILE NAME
  // ============================================================

  function framePath(index) {
    return (
      "images/" +
      FRAME_PREFIX +
      String(index + 1).padStart(FRAME_DIGITS, "0") +
      FRAME_EXTENSION
    );
  }

  // ============================================================
  // CANVAS
  // ============================================================

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (firstImage) {
      drawImage(firstImage);
    }
  }

  function drawImage(image) {
    if (!image || !image.complete || !image.naturalWidth) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // object-fit: cover
    const scale = Math.max(
      width / image.naturalWidth,
      height / image.naturalHeight
    );

    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    context.clearRect(0, 0, width, height);

    context.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );
  }

  // ============================================================
  // RENDER FRAME
  // ============================================================

  function render() {
    const index = Math.max(
      0,
      Math.min(
        FRAME_COUNT - 1,
        Math.round(playhead.frame)
      )
    );

    if (images[index]) {
      drawImage(images[index]);
    }
  }

  // ============================================================
  // GSAP SCROLL ANIMATION
  // ============================================================

  function createScrollAnimation() {
    if (animationStarted) return;

    animationStarted = true;

    // 10 seconds × 30 FPS = 300 frames.
    // Give the user plenty of scrolling distance.
    section.style.height = "600vh";

    gsap.to(playhead, {
      frame: FRAME_COUNT - 1,

      ease: "none",

      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",

        // Smooth catch-up.
        scrub: 0.5,

        invalidateOnRefresh: true,

        onUpdate: render,

        onLeave: () => {
          playhead.frame = FRAME_COUNT - 1;
          render();
        },

        onLeaveBack: () => {
          playhead.frame = 0;
          render();
        }
      }
    });

    ScrollTrigger.refresh();
  }

  // ============================================================
  // LOAD IMAGE SEQUENCE
  // ============================================================

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

      image.onerror = () => {
        console.warn(
          "Could not load image:",
          framePath(i)
        );
      };

      images.push(image);
    }
  }

  // ============================================================
  // INIT
  // ============================================================

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  resizeCanvas();
  loadImages();
});
