/* OctoBuddy popup — reads/saves settings in chrome.storage.sync */
(function () {
  var DEF = { enabled: true, size: 90, speed: 5, name: 'Ollie', pet: 'octopus' };
  var PET_NAMES = { octopus: 'Ollie', bee: 'Buzzie', lizard: 'Lizzy', duck: 'Ducky' };
  var DEFAULT_NAMES = ['Ollie', 'Buzzie', 'Lizzy', 'Ducky'];
  var enabledEl = document.getElementById('enabled');
  var nameEl = document.getElementById('petName');
  var sizeEl = document.getElementById('size');
  var speedEl = document.getElementById('speed');
  var sizeVal = document.getElementById('sizeVal');
  var speedVal = document.getElementById('speedVal');
  var petBtns = document.querySelectorAll('[data-pet]');
  var currentPet = 'octopus';

  function markPet() {
    petBtns.forEach(function (b) {
      if (b.getAttribute('data-pet') === currentPet) b.classList.add('sel');
      else b.classList.remove('sel');
    });
  }

  function save() {
    chrome.storage.sync.set({
      enabled: enabledEl.checked,
      name: (nameEl.value || 'Ollie').trim(),
      size: parseInt(sizeEl.value, 10),
      speed: parseInt(speedEl.value, 10),
      pet: currentPet
    });
    sizeVal.textContent = sizeEl.value + 'px';
    speedVal.textContent = speedEl.value;
  }

  chrome.storage.sync.get(DEF, function (items) {
    enabledEl.checked = items.enabled;
    nameEl.value = items.name;
    sizeEl.value = items.size;
    speedEl.value = items.speed;
    sizeVal.textContent = items.size + 'px';
    speedVal.textContent = items.speed;
    currentPet = items.pet || 'octopus';
    markPet();
  });

  [enabledEl, nameEl, sizeEl, speedEl].forEach(function (el) {
    el.addEventListener('input', save);
    el.addEventListener('change', save);
  });

  petBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      currentPet = b.getAttribute('data-pet');
      // Adopt the new pet's default name only if the user hasn't set a custom one
      var cur = (nameEl.value || '').trim();
      if (!cur || DEFAULT_NAMES.indexOf(cur) !== -1) nameEl.value = PET_NAMES[currentPet];
      markPet();
      save();
    });
  });
})();
