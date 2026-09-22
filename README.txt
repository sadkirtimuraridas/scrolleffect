GSAP + EZGIF IMAGE SEQUENCE
===========================

This project is already configured for your exact filenames:

    ezgif-frame-001.jpg
    ezgif-frame-002.jpg
    ezgif-frame-003.jpg
    ...
    ezgif-frame-300.jpg

FOLDER STRUCTURE
----------------

GSAP_ezgif_image_sequence_scroll/
│
├── index.html
├── style.css
├── script.js
├── README.txt
│
└── images/
    ├── ezgif-frame-001.jpg
    ├── ezgif-frame-002.jpg
    ├── ezgif-frame-003.jpg
    ├── ...
    └── ezgif-frame-300.jpg

IMPORTANT
---------

Put ALL 300 JPG frames inside the images folder.

The script is configured with:

    FRAME_COUNT = 300

    FRAME_PREFIX = "ezgif-frame-"

    FRAME_DIGITS = 3

    FRAME_EXTENSION = ".jpg"

For a 10-second source at 30 FPS:

    10 × 30 = 300 frames

SCROLL
------

Top:
    ezgif-frame-001.jpg

Middle:
    approximately ezgif-frame-150.jpg

Bottom:
    ezgif-frame-300.jpg

TECHNOLOGY
----------

- HTML
- CSS
- JavaScript
- Canvas
- GSAP
- ScrollTrigger

No jQuery.
No React.
No Next.js.

PERFORMANCE
-----------

For best performance:

- 1280–1920px image width
- JPG quality around 70–85%
- 30 FPS
- 300 frames for a 10-second sequence

If the JPG sequence is very large, WebP can reduce loading size considerably.

If you convert to WebP, change:

    FRAME_EXTENSION = ".jpg"

to:

    FRAME_EXTENSION = ".webp"

and rename the files accordingly.
