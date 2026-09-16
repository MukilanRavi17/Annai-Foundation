/**
 * Annai Foundation - Main Application Script
 * Orchestrates Floating Island Navbar, Mobile Drawer, Bento Calculators,
 * Outcome Studio, Scroll Reveals, Toast Notifications, and Demo-Mode Interceptions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollAnimations();
  initImpactCounters();
  initHeroGivingChips();
  initBentoTaxCalculator();
  initOutcomeStudio();
  initDemoModeHandlers();
});

/* --- Floating Island Navigation Bar --- */
function initNavbar() {
  const islandNav = document.getElementById('mainIslandNav') || document.querySelector('.island-navbar');
  if (!islandNav) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      islandNav.classList.add('scrolled');
    } else {
      islandNav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Drawer Navigation Menu --- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle') || document.querySelector('.mobile-nav-toggle');
  const drawer = document.getElementById('drawerPanel') || document.querySelector('.mobile-drawer-panel');
  const backdrop = document.getElementById('drawerBackdrop') || document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.getElementById('drawerCloseBtn') || document.querySelector('.drawer-close-btn');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  const drawerLinks = drawer.querySelectorAll('.drawer-link, a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Animated Impact Counters --- */
function initImpactCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  let hasStarted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-counter') || '0', 10);
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '+';
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.innerText = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* --- Hero Giving Chips & Custom Input (Home Page) --- */
function initHeroGivingChips() {
  const chipBtns = document.querySelectorAll('.giving-chips-grid .chip-btn');
  const customInput = document.getElementById('heroCustomAmount');
  const donateGoBtn = document.getElementById('btnHeroDonateGo');
  const impactText = document.getElementById('heroImpactDynamicText');

  if (!chipBtns.length && !customInput) return;

  const impactMap = {
    500: 'provides <strong>25 fresh hot nutritious meals</strong> for destitute elders today.',
    1000: 'sponsors <strong>1 complete academic kit & books</strong> for an underprivileged student.',
    2500: 'fuels <strong>2 critical midnight ambulance emergency dispatches</strong> with oxygen.',
    5000: 'covers <strong>complete dignified final rites & sacred farewell</strong> for an abandoned soul.'
  };

  let currentAmount = 500;

  function updateHeroGift(amt) {
    currentAmount = amt;
    if (donateGoBtn) {
      donateGoBtn.href = `donate.html?amount=${currentAmount}`;
    }
    if (impactText) {
      if (impactMap[currentAmount]) {
        impactText.innerHTML = `<i class="bi bi-check-circle-fill" style="color: var(--secondary);"></i> <strong>₹${currentAmount.toLocaleString('en-IN')}</strong> ${impactMap[currentAmount]}`;
      } else {
        const meals = Math.floor(currentAmount / 20);
        impactText.innerHTML = `<i class="bi bi-heart-fill" style="color: var(--primary);"></i> <strong>₹${currentAmount.toLocaleString('en-IN')}</strong> directly funds emergency healthcare & supplies ~${meals} warm meals in Karaikal.`;
      }
    }
  }

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amt = parseInt(btn.getAttribute('data-amount'), 10) || 500;
      if (customInput) customInput.value = '';
      updateHeroGift(amt);
    });
  });

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val && val > 0) {
        chipBtns.forEach(b => b.classList.remove('active'));
        updateHeroGift(val);
      }
    });
  }

  if (donateGoBtn) {
    donateGoBtn.addEventListener('click', (e) => {
      if (customInput && customInput.value) {
        const val = parseInt(customInput.value, 10);
        if (val > 0) {
          window.location.href = `donate.html?amount=${val}`;
          e.preventDefault();
        }
      }
    });
  }
}

/* --- Bento 80G Tax Calculator (Home Page) --- */
function initBentoTaxCalculator() {
  const slider = document.getElementById('bentoTaxRange');
  const inputDisplay = document.getElementById('bentoCalcInputText');
  const deductDisplay = document.getElementById('bentoTaxDeductText');

  if (!slider || !inputDisplay || !deductDisplay) return;

  function updateBentoTax(val) {
    const amt = parseInt(val, 10);
    const deduction = Math.round(amt * 0.5);
    inputDisplay.innerText = `₹${amt.toLocaleString('en-IN')}`;
    deductDisplay.innerText = `₹${deduction.toLocaleString('en-IN')}`;
  }

  slider.addEventListener('input', (e) => {
    updateBentoTax(e.target.value);
  });

  updateBentoTax(slider.value || 5000);
}

/* --- Interactive Impact Outcome Studio (Home Page) --- */
function initOutcomeStudio() {
  const range = document.getElementById('studioRange');
  const amtDisplay = document.getElementById('studioAmountDisplay');
  const mealsVal = document.getElementById('studioMealsVal');
  const fuelVal = document.getElementById('studioFuelVal');
  const kitsVal = document.getElementById('studioKitsVal');
  const donateBtn = document.getElementById('btnStudioDonate');

  if (!range || !amtDisplay) return;

  function updateStudio(val) {
    const amt = parseInt(val, 10);
    amtDisplay.innerText = `₹${amt.toLocaleString('en-IN')}`;

    const meals = Math.floor(amt / 20);
    const runs = Math.max(1, Math.floor(amt / 800));
    const kits = Math.max(1, Math.floor(amt / 500));

    if (mealsVal) mealsVal.innerText = meals.toLocaleString('en-IN');
    if (fuelVal) fuelVal.innerText = runs.toLocaleString('en-IN');
    if (kitsVal) kitsVal.innerText = kits.toLocaleString('en-IN');

    if (donateBtn) {
      donateBtn.href = `donate.html?amount=${amt}`;
    }
  }

  range.addEventListener('input', (e) => {
    updateStudio(e.target.value);
  });

  updateStudio(range.value || 2500);
}

/* --- Global Toast Notifications --- */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 420px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    background: #1A1615;
    color: #FFFFFF;
    padding: 14px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.88rem;
    line-height: 1.5;
    pointer-events: auto;
    border-left: 4px solid ${type === 'error' ? '#EF4444' : type === 'info' ? '#3B82F6' : '#10B981'};
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  let icon = 'bi-check-circle-fill text-success';
  if (type === 'error') icon = 'bi-exclamation-triangle-fill text-danger';
  if (type === 'info') icon = 'bi-info-circle-fill text-info';

  toast.innerHTML = `<i class="bi ${icon}" style="font-size: 1.25rem; color: ${type === 'error' ? '#EF4444' : type === 'info' ? '#60A5FA' : '#34D399'};"></i> <span>${message}</span>`;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  // Auto dismiss
  setTimeout(() => {
    toast.style.transform = 'translateY(-10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/* --- Demo Mode Click Interceptor (Disconnects External Phone Calls & Social Media Silently) --- */
function initDemoModeHandlers() {
  document.addEventListener('click', (e) => {
    // 1. Direct Phone Calling Triggers
    const callEl = e.target.closest('[data-action="demo-call"], a[href^="tel:"], .sos-pill-btn, .dock-pill-emergency');
    if (callEl && !callEl.hasAttribute('data-allow-default')) {
      e.preventDefault();
      return;
    }

    // 2. WhatsApp Triggers
    const waEl = e.target.closest('[data-action="demo-whatsapp"], a[href*="wa.me"], a[href*="whatsapp.com"], .dock-pill-whatsapp');
    if (waEl && !waEl.hasAttribute('data-allow-default')) {
      e.preventDefault();
      return;
    }

    // 3. Social Media Triggers
    const socialEl = e.target.closest('[data-action="demo-social"], a[href*="facebook.com"], a[href*="instagram.com"], a[href*="youtube.com"], a[href*="twitter.com"]');
    if (socialEl && !socialEl.hasAttribute('data-allow-default')) {
      e.preventDefault();
      return;
    }

    // 4. Report Download Triggers
    const downloadEl = e.target.closest('[data-action="demo-download"]');
    if (downloadEl && !downloadEl.hasAttribute('data-allow-default')) {
      e.preventDefault();
      return;
    }
  });
}
