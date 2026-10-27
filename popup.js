/* OctoBuddy popup — reads/saves settings in chrome.storage.sync */
(function () {
  var DEF = { enabled: true, size: 90, speed: 5, name: 'Ollie' };
  var enabledEl = document.getElementById('enabled');
  var nameEl = document.getElementById('petName');
  var sizeEl = document.getElementById('size');
  var speedEl = document.getElementById('speed');
  var sizeVal = document.getElementById('sizeVal');
  var speedVal = document.getElementById('speedVal');

  function save() {
    chrome.storage.sync.set({
      enabled: enabledEl.checked,
      name: (nameEl.value || 'Ollie').trim(),
      size: parseInt(sizeEl.value, 10),
      speed: parseInt(speedEl.value, 10)
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
  });

  [enabledEl, nameEl, sizeEl, speedEl].forEach(function (el) {
    el.addEventListener('input', save);
    el.addEventListener('change', save);
  });
})();
