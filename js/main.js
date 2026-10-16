/* ============================================================
   SYLREG & KIDS INVESTMENT LIMITED — main.js
   Handles: scroll reveal, counters, year, interactions
   ============================================================ */

(function () {
  'use strict';

  /* ── Dynamic Year ── */
  document.querySelectorAll('.year-auto').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── Scroll Reveal ── */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ── Animated Counters ── */
  function animateCounter(el) {
    const target  = parseInt(el.getAttribute('data-target'), 10);
    const suffix  = el.getAttribute('data-suffix') || '';
    const prefix  = el.getAttribute('data-prefix') || '';
    const duration = 1800;
    const step     = 16;
    const steps    = duration / step;
    let  current   = 0;

    const timer = setInterval(function () {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }, step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ── Smooth active tab/filter ── */
  function initTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(function (group) {
      const tabs    = group.querySelectorAll('[data-tab]');
      const panels  = group.querySelectorAll('[data-panel]');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          const target = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('active'); });
          panels.forEach(function (p) { p.style.display = 'none'; });
          tab.classList.add('active');
          const panel = group.querySelector('[data-panel="' + target + '"]');
          if (panel) { panel.style.display = ''; panel.classList.add('page-in'); }
        });
      });
    });
  }

  /* ── Particles ── */
  function initParticles() {
    const containers = document.querySelectorAll('.particles-bg');
    containers.forEach(function (container) {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top  = Math.random() * 100 + '%';
        p.style.animationDelay = (Math.random() * 6) + 's';
        p.style.animationDuration = (5 + Math.random() * 5) + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        p.style.opacity = (0.2 + Math.random() * 0.5).toString();
        container.appendChild(p);
      }
    });
  }

  /* ── Toast notification ── */
  window.showToast = function (msg, type) {
    const toast = document.createElement('div');
    toast.style.cssText = [
      'position:fixed', 'bottom:28px', 'right:28px',
      'background:' + (type === 'error' ? '#c62828' : '#1b5e20'),
      'color:#fff', 'padding:14px 24px', 'border-radius:10px',
      'font-size:13px', 'font-weight:600', 'z-index:9999',
      'box-shadow:0 8px 30px rgba(0,0,0,0.4)',
      'border:1px solid rgba(255,255,255,0.1)',
      'animation:fadeUp 0.4s ease both',
      'max-width:340px', 'letter-spacing:0.3px'
    ].join(';');
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  };

  /* ── WhatsApp number (digits only, with country code) — change here only ── */
  window.SYLREG_WA = '23276492022';

  function initWhatsAppLinks() {
    document.querySelectorAll('[data-wa-msg]').forEach(function (a) {
      if (a.tagName !== 'A') return;
      a.href = 'https://wa.me/' + window.SYLREG_WA + '?text=' + encodeURIComponent(a.getAttribute('data-wa-msg'));
    });
  }

  /* ── Contact form: Formspree (email) + Supabase (database, optional) ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const cfg = window.SYLREG_CONFIG || {};
    const endpoint = cfg.FORMSPREE_URL || form.getAttribute('action');

    // Pre-fill from links: contact.html?service=watu  or  contact.html?product=NAME
    const params  = new URLSearchParams(window.location.search);
    const sel     = form.querySelector('#service');
    const msgBox  = form.querySelector('#message');
    const product = params.get('product');
    if (params.get('service') === 'watu' && sel) {
      sel.value = 'Phone Loan (Watu)';
      if (msgBox && !msgBox.value) msgBox.value = 'I would like to ask about a phone loan through Watu.';
    } else if (product) {
      if (sel) sel.value = 'Longrich Health & Wellness Products';
      if (msgBox && !msgBox.value) msgBox.value = 'I would like to enquire about: ' + product + '.';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const val = function (id) { const el = form.querySelector('#' + id); return el ? el.value.trim() : ''; };
      const fname = val('fname'), lname = val('lname'), phone = val('phone'),
            email = val('email'), service = val('service'), message = val('message');
      const btn = form.querySelector('[type="submit"]');

      // Honeypot: bots fill the hidden field, humans never see it
      const trap = form.querySelector('[name="_gotcha"]');
      if (trap && trap.value) { form.reset(); return; }

      if (!fname || !lname || !message) {
        showToast('Please fill in your first name, last name and message.', 'error');
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      const data = new FormData(form);
      data.set('name', fname + ' ' + lname);
      data.set('_subject', 'New website enquiry from ' + fname + ' ' + lname + (service ? ' — ' + service : ''));

      const jobs = [
        fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      ];

      if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY) {
        jobs.push(fetch(cfg.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/contact_messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': cfg.SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + cfg.SUPABASE_ANON_KEY,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            first_name: fname, last_name: lname,
            phone: phone || null, email: email || null,
            service: service || null, message: message
          })
        }));
      }

      const results = await Promise.allSettled(jobs);
      const sent = results.some(function (r) { return r.status === 'fulfilled' && r.value.ok; });

      btn.disabled = false;
      btn.innerHTML = label;

      if (sent) {
        form.reset();
        showToast('✓ Message sent! We will get back to you shortly.', 'success');
      } else {
        showToast('Sorry, your message could not be sent. Please try again or contact us on WhatsApp.', 'error');
      }
    });
  }

  /* ── Back to top ── */
  function initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.style.opacity = window.scrollY > 400 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Init all ── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCounters();
    initTabs();
    initParticles();
    initWhatsAppLinks();
    initContactForm();
    initBackToTop();
  });

})();
