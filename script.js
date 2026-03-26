/* ============================================================
   PORTFOLIO WEBSITE — JAVASCRIPT
   All the interactive behaviour lives here
   ============================================================ */


/* ── CUSTOM CURSOR ──────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

document.addEventListener('mousemove', function(e) {
  // dot follows mouse exactly
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  // ring follows with a tiny delay for a trailing effect
  setTimeout(function() {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 60);
});


/* ── NAV — adds border when user scrolls down ───────────── */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', function() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


/* ── SCROLL ANIMATIONS ──────────────────────────────────── */
// Elements fade in as they enter the viewport
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      var delay = entry.target.dataset.delay || 0;
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, delay * 120);
      observer.unobserve(entry.target); // stop watching once visible
    }
  });
}, { threshold: 0.12 });

// which elements get the scroll-in animation
var animatedElements = document.querySelectorAll(
  '.stat-item, .grid-item, .about-img-frame, .about-content, ' +
  '.quote-mark, .quote-text, .quote-author, ' +
  '.contact-info-block, .contact-form-block'
);

animatedElements.forEach(function(el, i) {
  el.dataset.delay = i % 4; // stagger so they don't all appear at once
  observer.observe(el);
});


/* ── PORTFOLIO FILTER TABS ──────────────────────────────── */
const tabs  = document.querySelectorAll('.filter-tab');
const items = document.querySelectorAll('.grid-item');

tabs.forEach(function(tab) {
  tab.addEventListener('click', function() {

    // mark clicked tab as active
    tabs.forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');

    var filter = tab.dataset.filter; // e.g. "portrait", "landscape", "all"

    items.forEach(function(item, i) {
      var match = (filter === 'all') || (item.dataset.category === filter);

      if (match) {
        item.classList.remove('hidden');
        item.classList.remove('visible');
        // stagger re-appearance
        setTimeout(function() {
          item.classList.add('visible');
        }, i * 60);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});


/* ── MAKE GRID ITEMS VISIBLE ON FIRST LOAD ──────────────── */
window.addEventListener('load', function() {
  document.querySelectorAll('.grid-item').forEach(function(el, i) {
    setTimeout(function() {
      el.classList.add('visible');
    }, 200 + i * 80);
  });
});
