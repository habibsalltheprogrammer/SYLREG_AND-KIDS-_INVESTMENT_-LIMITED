/* ============================================================
   SYLREG & KIDS INVESTMENT LIMITED — products.js
   Longrich products: category filter, detail popup, deep links
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('lr-grid');
  var modal = document.getElementById('lr-modal');
  if (!grid || !modal) return;

  var cards   = [].slice.call(grid.querySelectorAll('.lr-card'));
  var filters = [].slice.call(document.querySelectorAll('.lr-filter'));
  var countEl = document.getElementById('lr-count');

  var imgEl     = document.getElementById('lr-modal-img');
  var thumbsEl  = document.getElementById('lr-thumbs');
  var titleEl   = document.getElementById('lr-modal-title');
  var catEl     = document.getElementById('lr-modal-cat');
  var descEl    = document.getElementById('lr-modal-desc');
  var waEl      = document.getElementById('lr-modal-wa');
  var contactEl = document.getElementById('lr-modal-contact');
  var closeBtn  = modal.querySelector('.lr-modal-close');
  var lastFocus = null;

  /* ── Filter ── */
  function applyFilter(cat) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = cat === 'all' || card.getAttribute('data-cat') === cat;
      card.hidden = !match;
      if (match) shown++;
    });
    filters.forEach(function (btn) {
      var on = btn.getAttribute('data-filter') === cat;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (countEl) countEl.textContent = 'Showing ' + shown + (shown === 1 ? ' product' : ' products');
  }
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.getAttribute('data-filter')); });
  });

  /* ── Modal ── */
  function setImage(src, name) {
    imgEl.src = src;
    imgEl.alt = name;
  }

  function openModal(card) {
    var name   = card.getAttribute('data-name');
    var images = (card.getAttribute('data-images') || '').split('|').filter(Boolean);
    var detail = card.querySelector('.lr-detail');

    titleEl.textContent = name;
    catEl.textContent = card.getAttribute('data-cat-label') || '';
    descEl.innerHTML = detail ? detail.innerHTML : '';
    setImage(images[0] || '', name);

    thumbsEl.innerHTML = '';
    if (images.length > 1) {
      images.forEach(function (src, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'lr-thumb' + (i === 0 ? ' active' : '');
        b.setAttribute('aria-label', 'Show image ' + (i + 1) + ' of ' + images.length);
        var t = document.createElement('img');
        t.src = src; t.alt = '';
        b.appendChild(t);
        b.addEventListener('click', function () {
          setImage(src, name);
          [].forEach.call(thumbsEl.children, function (c) { c.classList.remove('active'); });
          b.classList.add('active');
        });
        thumbsEl.appendChild(b);
      });
    }

    var msg = card.getAttribute('data-wa-msg') || ('Hello SYLREG & KIDS INVESTMENT LIMITED, I would like to enquire about: ' + name);
    waEl.setAttribute('data-wa-msg', msg);
    waEl.href = 'https://wa.me/' + (window.SYLREG_WA || '') + '?text=' + encodeURIComponent(msg);
    contactEl.href = 'contact.html?product=' + encodeURIComponent(name);

    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('lr-lock');
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('lr-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  grid.addEventListener('click', function (e) {
    var trigger = e.target.closest('.lr-card-media, .lr-view');
    if (!trigger) return;
    var card = trigger.closest('.lr-card');
    if (card) openModal(card);
  });

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      var f = [].slice.call(modal.querySelectorAll('a[href], button:not([disabled])')).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ── Deep link from home page: services.html?product=pi-cup#longrich-products ── */
  var wanted = new URLSearchParams(window.location.search).get('product');
  if (wanted) {
    var target = cards.filter(function (c) { return c.getAttribute('data-id') === wanted; })[0];
    if (target) {
      applyFilter('all');
      var section = document.getElementById('longrich-products');
      if (section) section.scrollIntoView();
      setTimeout(function () { openModal(target); }, 250);
    }
  }
})();
