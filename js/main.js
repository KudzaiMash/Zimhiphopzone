/* ============================================
   ZIMHIPHOPZONE — main.js
   ============================================ */

// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1800);
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- MOBILE MENU ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- SCROLL ANIMATIONS ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.news-card, .artist-card, .video-card, .culture-card, .cup-group, .newsletter-card').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ---- STAGGERED ANIMATION ----
function staggerFadeIn(selector, delay = 80) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * delay}ms`;
  });
}
staggerFadeIn('.artist-card', 60);
staggerFadeIn('.news-card', 80);
staggerFadeIn('.cup-group', 100);

// ---- VOTE MODAL ----
const voteModal = document.getElementById('voteModal');
const modalClose = document.getElementById('modalClose');
const modalOptions = document.getElementById('modalOptions');
const modalSubmit = document.getElementById('modalSubmit');

let currentMatch = null;
let selectedOption = null;

const matchData = {
  'A-1': { a: 'Artist 01', b: 'Artist 02' },
  'A-2': { a: 'Artist 03', b: 'Artist 04' },
  'B-1': { a: 'Artist 05', b: 'Artist 06' },
  'B-2': { a: 'Artist 07', b: 'Artist 08' },
  'C-1': { a: 'Artist 09', b: 'Artist 10' },
  'C-2': { a: 'Artist 11', b: 'Artist 12' },
  'D-1': { a: 'Artist 13', b: 'Artist 14' },
  'D-2': { a: 'Artist 15', b: 'Artist 16' },
};

// Assign match IDs to vote buttons
const groups = ['A', 'B', 'C', 'D'];
document.querySelectorAll('.cup-group').forEach((group, gi) => {
  group.querySelectorAll('.vote-btn').forEach((btn, mi) => {
    const id = `${groups[gi]}-${mi + 1}`;
    btn.dataset.match = id;
    btn.addEventListener('click', openVoteModal.bind(null, id, btn));
  });
});

function openVoteModal(matchId, triggerBtn) {
  const match = matchData[matchId];
  if (!match) return;
  currentMatch = matchId;
  selectedOption = null;

  modalOptions.innerHTML = `
    <button class="modal-option" data-artist="${match.a}">${match.a}</button>
    <button class="modal-option" data-artist="${match.b}">${match.b}</button>
  `;

  modalOptions.querySelectorAll('.modal-option').forEach(opt => {
    opt.addEventListener('click', () => {
      modalOptions.querySelectorAll('.modal-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedOption = opt.dataset.artist;
    });
  });

  voteModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  voteModal.classList.remove('open');
  document.body.style.overflow = '';
  currentMatch = null;
  selectedOption = null;
}

modalClose.addEventListener('click', closeModal);
voteModal.addEventListener('click', e => { if (e.target === voteModal) closeModal(); });

modalSubmit.addEventListener('click', () => {
  if (!selectedOption) {
    modalOptions.style.animation = 'shake 0.3s ease';
    setTimeout(() => modalOptions.style.animation = '', 300);
    return;
  }
  // Record vote in localStorage
  const key = `zimcup_vote_${currentMatch}`;
  const existing = JSON.parse(localStorage.getItem(key) || '{}');
  existing[selectedOption] = (existing[selectedOption] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(existing));

  // Show success
  voteModal.querySelector('.modal').innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:3rem;margin-bottom:16px">🏆</div>
      <h3 style="font-family:var(--font-display);font-size:2rem;letter-spacing:0.06em;color:var(--green);margin-bottom:8px">VOTE CAST!</h3>
      <p style="color:var(--grey);margin-bottom:24px">You voted for <strong style="color:var(--white)">${selectedOption}</strong>. Share the ZimHipHop Cup with your friends!</p>
      <a href="https://www.facebook.com/zimhiphopzone" target="_blank" rel="noopener"
        style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:#1877F2;color:#fff;border-radius:4px;font-weight:600;font-size:0.85rem;text-decoration:none">
        Share on Facebook
      </a>
      <br><br>
      <button onclick="document.getElementById('voteModal').classList.remove('open');document.body.style.overflow=''"
        style="background:none;color:var(--grey);font-size:0.8rem;cursor:pointer;font-family:var(--font-body);border:none">
        Close
      </button>
    </div>
  `;
});

// ---- NEWSLETTER ----
const newsletterSubmit = document.querySelector('.newsletter-submit');
if (newsletterSubmit) {
  newsletterSubmit.addEventListener('click', () => {
    const input = document.querySelector('.newsletter-input');
    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#ff4444';
      setTimeout(() => input.style.borderColor = '', 2000);
      return;
    }
    input.style.borderColor = 'var(--green)';
    newsletterSubmit.textContent = '✓ Subscribed!';
    newsletterSubmit.style.background = '#1a5c0d';
    input.value = '';
    setTimeout(() => {
      newsletterSubmit.textContent = 'Subscribe';
      newsletterSubmit.style.background = '';
      input.style.borderColor = '';
    }, 3000);
  });
}

// ---- ACTIVE NAV LINKS ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--green)' : '';
  });
}, { passive: true });

// ---- SHAKE KEYFRAMES ----
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}
    40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)}
    80%{transform:translateX(4px)}
  }
`;
document.head.appendChild(style);

// ---- HERO PARALLAX ----
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.4;
  }
}, { passive: true });

console.log('%cZIMHIPHOPZONE', 'color:#39FF14;font-size:2rem;font-weight:bold;');
console.log('%cZimbabwe\'s #1 Hip Hop Platform', 'color:#FFD700;font-size:0.9rem;');
