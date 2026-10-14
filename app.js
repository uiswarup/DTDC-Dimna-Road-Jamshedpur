(() => {
  /* ==========================================================================
     CANVAS SEQUENCE & SCROLL SYNC ENGINE
     ========================================================================== */
  const TOTAL_FRAMES = 269;
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });

  const images = new Array(TOTAL_FRAMES);
  const isLoaded = new Array(TOTAL_FRAMES).fill(false);

  let targetProgress = 0;
  let currentProgress = 0;
  let lastTargetIndex = -1;
  let lastDrawnFrameIndex = -1;

  const progressBar = document.getElementById('scroll-progress-bar');

  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(3, '0');
    return `images/ezgif-frame-${frameNum}.jpg?v=v3`;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);

    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );
    renderFrameIndex(targetIndex);
  }

  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Cover scale to fill entire screen edge-to-edge
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const renderW = Math.round(img.naturalWidth * scale);
    const renderH = Math.round(img.naturalHeight * scale);

    const offsetX = Math.round((cw - renderW) / 2);
    let offsetY = Math.round((ch - renderH) / 2);

    if (renderH > ch) {
      offsetY = Math.round(Math.max(ch - renderH, Math.min(0, (ch - renderH) * 0.15)));
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, cw, ch);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }

  function renderFrameIndex(index) {
    let imgToDraw = null;
    let actualIndex = -1;

    if (isLoaded[index] && images[index]?.complete && images[index]?.naturalWidth > 0) {
      imgToDraw = images[index];
      actualIndex = index;
    } else {
      // Find nearest loaded frame to eliminate any frame flashing
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && isLoaded[prev] && images[prev]?.complete && images[prev]?.naturalWidth > 0) {
          imgToDraw = images[prev];
          actualIndex = prev;
          break;
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES && isLoaded[next] && images[next]?.complete && images[next]?.naturalWidth > 0) {
          imgToDraw = images[next];
          actualIndex = next;
          break;
        }
      }
    }

    if (imgToDraw) {
      lastDrawnFrameIndex = actualIndex;
      drawFrame(imgToDraw);
    }
  }

  function getScrollFraction() {
    const doc = document.documentElement;
    const body = document.body;
    const scrollY = window.pageYOffset || window.scrollY || doc.scrollTop || body.scrollTop || 0;
    const maxScroll = Math.max(
      doc.scrollHeight,
      body.scrollHeight,
      doc.offsetHeight,
      body.offsetHeight
    ) - window.innerHeight;

    if (maxScroll <= 0) return 0;
    return Math.min(1, Math.max(0, scrollY / maxScroll));
  }

  function updateScroll() {
    targetProgress = getScrollFraction();
    if (progressBar) {
      progressBar.style.transform = `scaleX(${targetProgress})`;
      progressBar.setAttribute('aria-valuenow', Math.round(targetProgress * 100));
    }
  }

  function renderLoop() {
    const diff = targetProgress - currentProgress;

    if (Math.abs(diff) > 0.00001) {
      currentProgress += diff * 0.1;
    } else {
      currentProgress = targetProgress;
    }

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );

    if (frameIndex !== lastTargetIndex || (isLoaded[frameIndex] && lastDrawnFrameIndex !== frameIndex)) {
      lastTargetIndex = frameIndex;
      renderFrameIndex(frameIndex);
    }

    requestAnimationFrame(renderLoop);
  }

  function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        isLoaded[i] = true;
        const currentTarget = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
        );
        if (i === currentTarget || lastDrawnFrameIndex === -1) {
          renderFrameIndex(currentTarget);
        }
      };

      if (img.decode) {
        img.decode().catch(() => {});
      }

      images[i] = img;

      if (img.complete && img.naturalWidth > 0) {
        isLoaded[i] = true;
      }
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  document.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('wheel', updateScroll, { passive: true });
  window.addEventListener('touchmove', updateScroll, { passive: true });
  window.addEventListener('resize', resizeCanvas, { passive: true });

  resizeCanvas();
  preloadImages();
  updateScroll();
  currentProgress = targetProgress;
  renderLoop();

  /* ==========================================================================
     SECTION OBSERVER (SMOOTH APPEARANCE AS USER SCROLLS)
     ========================================================================== */
  const sections = document.querySelectorAll('.scroll-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const quickDots = document.querySelectorAll('.quick-nav-dot');

  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: 0.15
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const id = entry.target.getAttribute('id');
        updateActiveNav(id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Ensure first section is visible immediately
  if (sections.length > 0) {
    sections[0].classList.add('in-view');
  }

  function updateActiveNav(activeId) {
    // Update nav links
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update quick dots
    quickDots.forEach((dot) => {
      if (dot.getAttribute('data-target') === activeId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Quick Nav Dot Click Scroll
  quickDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Smooth Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     MODAL INTERACTIVITY (WHO WE ARE & VISION / MISSION)
     ========================================================================== */
  const modal = document.getElementById('info-modal');
  const modalIcon = document.getElementById('modal-icon-container');
  const modalTitle = document.getElementById('modal-title');
  const modalSub = document.getElementById('modal-subheading');
  const modalBody = document.getElementById('modal-body-content');
  const modalPrimary = document.getElementById('modal-primary-action');
  const modalSecondary = document.getElementById('modal-secondary-action');
  const modalClose = document.getElementById('modal-close-btn');

  let currentModalType = 'who';

  const modalData = {
    who: {
      title: 'Who We Are',
      sub: 'DTDC Corporate Overview',
      icon: `<svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
      body: `<p style="margin-bottom: 14px;"><strong>DTDC</strong> is India’s leading integrated express logistics provider and a pioneer of the franchise-based model in the industry.</p>
             <p style="margin-bottom: 14px;">With the largest number of access points across India and a rapidly growing international network, we are dedicated to reaching every doorstep.</p>
             <p style="color: #ffffff; font-weight: 500;">“We believe that every parcel is someone’s promise and we deliver on it.”</p>`,
      primaryText: 'View Vision & Mission',
      nextType: 'vision'
    },
    vision: {
      title: 'Our Vision & Mission',
      sub: 'Core Direction & Purpose',
      icon: `<svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      body: `<div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
               <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                 <h4 style="color: #ffffff; font-size: 15px; margin-bottom: 6px; font-weight: 700;">🎯 Our Vision</h4>
                 <p style="font-size: 13px; color: #a3a3a3;">To be the most admired logistics partner through closer connections - smarter solutions.</p>
               </div>
               <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                 <h4 style="color: #ffffff; font-size: 15px; margin-bottom: 6px; font-weight: 700;">✨ Our Mission</h4>
                 <p style="font-size: 13px; color: #a3a3a3;">To lead through innovation, fostering a culture of excellence, collaboration and adaptability.</p>
               </div>
             </div>`,
      primaryText: 'View Who We Are',
      nextType: 'who'
    }
  };

  function openModal(type) {
    currentModalType = type;
    const data = modalData[type];
    modalTitle.textContent = data.title;
    modalSub.textContent = data.sub;
    modalIcon.innerHTML = data.icon;
    modalBody.innerHTML = data.body;
    modalPrimary.textContent = data.primaryText;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.getElementById('btn-who-we-are')?.addEventListener('click', () => openModal('who'));
  document.getElementById('btn-vision-mission')?.addEventListener('click', () => openModal('vision'));
  modalClose?.addEventListener('click', closeModal);
  modalSecondary?.addEventListener('click', closeModal);

  modalPrimary?.addEventListener('click', () => {
    openModal(modalData[currentModalType].nextType);
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  /* ==========================================================================
     STUDIO CONTROLS DRAWER & GLASSMORPHISM SWITCHER
     ========================================================================== */
  const studioBtn = document.getElementById('studio-toggle-btn');
  const studioDrawer = document.getElementById('studio-drawer');
  const studioClose = document.getElementById('studio-close-btn');
  const studioLabel = document.getElementById('studio-btn-label');
  const transButtons = document.querySelectorAll('.trans-btn');
  const copyBtn = document.getElementById('copy-html-btn');
  const copyText = document.getElementById('copy-text');
  const copyIcon = document.getElementById('copy-icon');

  studioBtn?.addEventListener('click', () => {
    const isHidden = studioDrawer.classList.contains('hidden');
    if (isHidden) {
      studioDrawer.classList.remove('hidden');
      studioLabel.textContent = 'Close Controls';
      studioBtn.setAttribute('aria-expanded', 'true');
    } else {
      studioDrawer.classList.add('hidden');
      studioLabel.textContent = 'Studio Controls';
      studioBtn.setAttribute('aria-expanded', 'false');
    }
  });

  studioClose?.addEventListener('click', () => {
    studioDrawer.classList.add('hidden');
    studioLabel.textContent = 'Studio Controls';
    studioBtn.setAttribute('aria-expanded', 'false');
  });

  transButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      transButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const level = btn.getAttribute('data-level');
      document.documentElement.setAttribute('data-glass', level);
    });
  });

  copyBtn?.addEventListener('click', () => {
    const htmlContent = document.documentElement.outerHTML;
    navigator.clipboard.writeText(htmlContent).then(() => {
      copyText.textContent = 'Copied HTML!';
      copyIcon.innerHTML = `<path d="M20 6 9 17l-5-5"/>`;
      setTimeout(() => {
        copyText.textContent = 'Copy Page HTML';
        copyIcon.innerHTML = `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`;
      }, 2000);
    }).catch(() => {
      copyText.textContent = 'Copied!';
      setTimeout(() => { copyText.textContent = 'Copy Page HTML'; }, 2000);
    });
  });

  /* ==========================================================================
     FEEDBACK FORM SUBMISSION & SUCCESS STATE
     ========================================================================== */
  const feedbackForm = document.getElementById('dtdc-feedback-form');
  const successBox = document.getElementById('form-success-box');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const captchaDisplay = document.getElementById('captcha-display');

  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (captchaDisplay) {
      captchaDisplay.textContent = code;
    }
  }

  generateCaptcha();

  feedbackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    feedbackForm.classList.add('hidden');
    successBox.classList.remove('hidden');
  });

  resetFormBtn?.addEventListener('click', () => {
    feedbackForm.reset();
    generateCaptcha();
    successBox.classList.add('hidden');
    feedbackForm.classList.remove('hidden');
  });
})();
