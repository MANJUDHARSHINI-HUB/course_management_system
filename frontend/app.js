// EduCore — shared front-end interactions

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    }));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* Animated stat counters */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const statIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => statIo.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* Password visibility toggles */
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling && btn.previousElementSibling.tagName === 'INPUT'
        ? btn.previousElementSibling
        : btn.parentElement.querySelector('input');
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.classList.toggle('is-visible', isPassword);
    });
  });

  /* Prevent default submission — frontend-only demo */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Please wait…';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 1100);
      }
    });
  });

  /* Sticky nav shadow on scroll */
  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 12 ? '0 4px 20px rgba(15,30,61,0.06)' : 'none';
    });
  }

});
