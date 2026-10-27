/* OctoBuddy — content script: injects the pet on every page and makes it follow the cursor. */
(function () {
  if (window.__octoBuddyLoaded) return;
  window.__octoBuddyLoaded = true;

  var DEF = { enabled: true, size: 90, speed: 5, name: 'Ollie' };
  var S = Object.assign({}, DEF);

  var pet = document.createElement('div');
  pet.id = 'octobuddy-pet';
  pet.innerHTML =
    '<div class="ob-tilt"><div class="ob-bob">' +
    '<svg viewBox="0 0 120 112" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="obHead" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#eaf4ff"/>' +
    '<stop offset="100%" stop-color="#a8d0f2"/></linearGradient></defs>' +
    '<g class="ob-tent" stroke="#9cc8ef" stroke-width="13" stroke-linecap="round" fill="none">' +
    '<path d="M18 66 Q10 86 16 100"/><path d="M38 72 Q32 92 38 104"/>' +
    '<path d="M60 74 Q60 94 60 106"/><path d="M82 72 Q88 92 82 104"/>' +
    '<path d="M102 66 Q110 86 104 100"/></g>' +
    '<path d="M10 62 C10 26 30 12 60 12 C90 12 110 26 110 62 C110 70 104 72 100 68 ' +
    'C96 74 88 74 84 68 C80 74 72 74 68 68 C64 74 56 74 52 68 C48 74 40 74 36 68 ' +
    'C32 74 24 74 20 68 C16 72 10 70 10 62 Z" fill="url(#obHead)"/>' +
    '<g class="ob-eye"><g class="ob-look"><circle cx="42" cy="48" r="10" fill="#14141e"/>' +
    '<circle cx="39" cy="45" r="3.5" fill="#fff"/></g></g>' +
    '<g class="ob-eye"><g class="ob-look"><circle cx="78" cy="48" r="10" fill="#14141e"/>' +
    '<circle cx="75" cy="45" r="3.5" fill="#fff"/></g></g>' +
    '<ellipse class="ob-lid" cx="42" cy="48" rx="11" ry="11" fill="#d8ecfd"/>' +
    '<ellipse class="ob-lid" cx="78" cy="48" rx="11" ry="11" fill="#d8ecfd"/>' +
    '<ellipse cx="27" cy="62" rx="6" ry="4" fill="#ffb3c1" opacity="0.55"/>' +
    '<ellipse cx="93" cy="62" rx="6" ry="4" fill="#ffb3c1" opacity="0.55"/>' +
    '<path d="M50 60 q5 6 10 0 q5 6 10 0" stroke="#7a5c48" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '</svg>' +
    '<div class="ob-zzz"><span>z</span><span>Z</span><span>z</span></div>' +
    '<div class="ob-bubble"></div>' +
    '</div></div>';
  document.documentElement.appendChild(pet);

  var tiltEl = pet.querySelector('.ob-tilt');
  var looks = pet.querySelectorAll('.ob-look');
  var bubble = pet.querySelector('.ob-bubble');
  var bubbleTimer = null;

  function showBubble(text, ms) {
    bubble.textContent = text;
    bubble.classList.add('show');
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { bubble.classList.remove('show'); }, ms || 1800);
  }

  function applySettings() {
    pet.style.display = S.enabled ? 'block' : 'none';
    pet.style.width = S.size + 'px';
  }

  function burstHearts() {
    for (var i = 0; i < 5; i++) {
      (function () {
        var h = document.createElement('span');
        h.className = 'ob-heart';
        h.textContent = '♥';
        h.style.left = (20 + Math.random() * 60) + '%';
        pet.appendChild(h);
        setTimeout(function () { h.remove(); }, 1000);
      })();
    }
  }

  pet.addEventListener('click', function () {
    var lines = [
      "Hi! I'm " + S.name + '!',
      'Yay! You found me!',
      'Hehe! That tickles!',
      'I love this page!'
    ];
    showBubble(lines[Math.floor(Math.random() * lines.length)], 1800);
    burstHearts();
    pet.classList.add('ob-happy', 'ob-jump');
    setTimeout(function () { pet.classList.remove('ob-happy', 'ob-jump'); }, 900);
    lastMove = Date.now();
    pet.classList.remove('sleeping');
  });

  // Cursor following with smooth easing (cute lag, not robotic snap)
  var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  var x = tx, y = ty, tilt = 0, lastMove = Date.now(), lastHop = Date.now();

  window.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    lastMove = Date.now();
    pet.classList.remove('sleeping');
  }, { passive: true });

  function frame() {
    var ease = 0.04 + (S.speed / 10) * 0.10; // speed 1..10 -> 0.05..0.14
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    var vx = tx - x;
    var targetTilt = Math.max(-10, Math.min(10, vx * 0.08));
    tilt += (targetTilt - tilt) * 0.2;
    // Pupils look toward the cursor (max 3px) + occasional happy hop when settled
    var pcx = x + 18 + S.size / 2, pcy = y + 14 + S.size * 0.5;
    var ddx = tx - pcx, ddy = ty - pcy;
    var dd = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
    var ox = (ddx / dd * 3).toFixed(1), oy = (ddy / dd * 3).toFixed(1);
    looks.forEach(function (g) { g.style.transform = 'translate(' + ox + 'px,' + oy + 'px)'; });
    if (!pet.classList.contains('sleeping') && dd < 60 && Date.now() - lastHop > 9000) {
      pet.classList.add('ob-jump');
      setTimeout(function () { pet.classList.remove('ob-jump'); }, 600);
      lastHop = Date.now();
    }
    pet.style.transform = 'translate(' + Math.round(x + 18) + 'px,' + Math.round(y + 14) + 'px)';
    tiltEl.style.transform = 'rotate(' + tilt.toFixed(1) + 'deg)';
    if (Date.now() - lastMove > 20000) pet.classList.add('sleeping');
    requestAnimationFrame(frame);
  }

  // Settings: live sync with the popup
  function loadSettings() {
    try {
      chrome.storage.sync.get(DEF, function (items) {
        S = Object.assign({}, DEF, items);
        applySettings();
      });
      chrome.storage.onChanged.addListener(function (changes, area) {
        if (area !== 'sync') return;
        Object.keys(changes).forEach(function (k) { S[k] = changes[k].newValue; });
        applySettings();
      });
    } catch (e) { applySettings(); }
  }

  loadSettings();
  applySettings();
  requestAnimationFrame(frame);
  setTimeout(function () { showBubble("Hi! I'm " + S.name + '!', 2400); }, 1500);
})();
