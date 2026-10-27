/* OctoBuddy — content script: injects the pet on every page and makes it follow the cursor.
   Pet art lives in pets.js (OCTO_PETS); this file is the shared engine. */
(function () {
  if (window.__octoBuddyLoaded) return;
  window.__octoBuddyLoaded = true;

  var DEF = { enabled: true, size: 90, speed: 5, name: 'Ollie', pet: 'octopus' };
  var S = Object.assign({}, DEF);

  var pet = document.createElement('div');
  pet.id = 'octobuddy-pet';
  var tiltEl = null, looks = [], bubble = null, bubbleTimer = null;

  function petDef() {
    if (window.OCTO_PETS && OCTO_PETS[S.pet]) return OCTO_PETS[S.pet];
    return OCTO_PETS.octopus;
  }

  function renderPet() {
    var key = (window.OCTO_PETS && OCTO_PETS[S.pet]) ? S.pet : 'octopus';
    pet.classList.remove('pet-octopus', 'pet-bee', 'pet-lizard', 'pet-duck');
    pet.classList.add('pet-' + key);
    pet.innerHTML =
      '<div class="ob-tilt"><div class="ob-bob">' + petDef().svg +
      '<div class="ob-zzz"><span>z</span><span>Z</span><span>z</span></div>' +
      '<div class="ob-bubble"></div>' +
      '</div></div>';
    tiltEl = pet.querySelector('.ob-tilt');
    looks = pet.querySelectorAll('.ob-look');
    bubble = pet.querySelector('.ob-bubble');
  }

  document.documentElement.appendChild(pet);
  renderPet();

  function showBubble(text, ms) {
    if (!bubble) return;
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
    var d = petDef();
    var line = d.lines[Math.floor(Math.random() * d.lines.length)];
    showBubble(line.replace('{name}', S.name), 1800);
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
    if (tiltEl) tiltEl.style.transform = 'rotate(' + tilt.toFixed(1) + 'deg)';
    if (Date.now() - lastMove > 20000) pet.classList.add('sleeping');
    requestAnimationFrame(frame);
  }

  // Settings: live sync with the popup
  function loadSettings() {
    try {
      chrome.storage.sync.get(DEF, function (items) {
        var oldPet = S.pet;
        S = Object.assign({}, DEF, items);
        if (S.pet !== oldPet) renderPet();
        applySettings();
      });
      chrome.storage.onChanged.addListener(function (changes, area) {
        if (area !== 'sync') return;
        var petChanged = changes.pet && changes.pet.newValue !== S.pet;
        Object.keys(changes).forEach(function (k) { S[k] = changes[k].newValue; });
        if (petChanged) renderPet();
        applySettings();
      });
    } catch (e) { applySettings(); }
  }

  loadSettings();
  applySettings();
  requestAnimationFrame(frame);
  setTimeout(function () { showBubble("Hi! I'm " + S.name + '!', 2400); }, 1500);
})();
