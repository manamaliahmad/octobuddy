/* OctoBuddy pets — shared artwork definitions used by content.js and demo.html.
   Octopus, bee and lizard are drawn in SVG in the style of their reference
   photos, so every part can move. Each pet reuses the same hooks: .ob-look
   (pupils follow the cursor), .ob-lid (blink), .ob-bob (float), and its own
   moving parts. */
var OCTO_PETS = {
  octopus: {
    label: 'Octopus', emoji: '🐙', defaultName: 'Ollie',
    svg:
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
    '</svg>',
    lines: ["Hi! I'm {name}!", 'Yay! You found me!', 'Hehe! That tickles!', 'I love this page!']
  },
  bee: {
    label: 'Bee', emoji: '🐝', defaultName: 'Buzzie',
    svg:
    '<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse class="ob-wing" cx="30" cy="26" rx="21" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-25 30 26)"/>' +
    '<ellipse class="ob-wing ob-wing-r" cx="90" cy="26" rx="21" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(25 90 26)"/>' +
    '<g class="ob-antenna" stroke="#2b2118" stroke-width="2.5" stroke-linecap="round" fill="none">' +
    '<path d="M48 24 Q44 12 38 10"/><path d="M72 24 Q76 12 82 10"/></g>' +
    '<circle cx="38" cy="9" r="3.5" fill="#2b2118"/><circle cx="82" cy="9" r="3.5" fill="#2b2118"/>' +
    '<ellipse cx="60" cy="58" rx="42" ry="36" fill="#ffcf3d"/>' +
    '<path d="M22 46 Q60 58 98 46 L98 58 Q60 70 22 58 Z" fill="#2b2118"/>' +
    '<path d="M30 70 Q60 80 90 70 L90 80 Q60 88 30 80 Z" fill="#2b2118"/>' +
    '<ellipse cx="45" cy="92" rx="6" ry="3.5" fill="#2b2118"/><ellipse cx="75" cy="92" rx="6" ry="3.5" fill="#2b2118"/>' +
    '<g class="ob-eye"><g class="ob-look"><circle cx="45" cy="52" r="11" fill="#241a12"/>' +
    '<circle cx="42" cy="48" r="4" fill="#fff"/></g></g>' +
    '<g class="ob-eye"><g class="ob-look"><circle cx="75" cy="52" r="11" fill="#241a12"/>' +
    '<circle cx="72" cy="48" r="4" fill="#fff"/></g></g>' +
    '<ellipse class="ob-lid" cx="45" cy="52" rx="12" ry="12" fill="#ffcf3d"/>' +
    '<ellipse class="ob-lid" cx="75" cy="52" rx="12" ry="12" fill="#ffcf3d"/>' +
    '<ellipse cx="30" cy="66" rx="5" ry="3.5" fill="#ffb3c1" opacity="0.6"/>' +
    '<ellipse cx="90" cy="66" rx="5" ry="3.5" fill="#ffb3c1" opacity="0.6"/>' +
    '<path d="M54 66 q6 5 12 0" stroke="#7a5c48" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '</svg>',
    lines: ["Bzz! I'm {name}!", 'Buzz buzz!', 'Hehe! That tickles!', 'I love flowers AND this page!']
  },
  lizard: {
    label: 'Lizard', emoji: '🦎', defaultName: 'Lizzy',
    svg:
    '<svg viewBox="0 0 120 132" xmlns="http://www.w3.org/2000/svg">' +
    '<path class="ob-tail" d="M30 96 Q10 92 14 66 Q16 54 26 52" stroke="#3f7fd4" stroke-width="13" stroke-linecap="round" fill="none"/>' +
    '<circle cx="18" cy="86" r="2.5" fill="#ffb3c1" opacity="0.6"/><circle cx="22" cy="76" r="2" fill="#ffb3c1" opacity="0.6"/>' +
    '<ellipse cx="28" cy="110" rx="11" ry="6" fill="#3f7fd4"/><ellipse cx="90" cy="112" rx="10" ry="6" fill="#3f7fd4"/>' +
    '<path d="M60 52 C34 52 24 74 26 96 C28 114 42 122 60 122 C78 122 92 114 94 96 C96 74 86 52 60 52 Z" fill="#6fb1ec"/>' +
    '<ellipse cx="60" cy="100" rx="26" ry="20" fill="#cfe8fb" opacity="0.85"/>' +
    '<path d="M38 58 C38 34 50 22 66 22 C84 22 96 34 94 50 C92 62 80 66 66 66 C52 66 38 66 38 58 Z" fill="#6fb1ec"/>' +
    '<path class="ob-tongue" d="M66 62 Q66 74 59 79 M66 62 Q66 74 73 79" stroke="#ff6b9d" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
    '<g class="ob-eye"><ellipse cx="52" cy="40" rx="13" ry="14" fill="#ffffff"/><g class="ob-look"><circle cx="52" cy="42" r="8" fill="#14141e"/>' +
    '<circle cx="50" cy="39" r="2.5" fill="#fff"/></g></g>' +
    '<g class="ob-eye"><ellipse cx="82" cy="48" rx="12" ry="13" fill="#ffffff"/><g class="ob-look"><circle cx="82" cy="50" r="7.5" fill="#14141e"/>' +
    '<circle cx="80" cy="47" r="2.5" fill="#fff"/></g></g>' +
    '<ellipse class="ob-lid" cx="52" cy="40" rx="14" ry="15" fill="#6fb1ec"/>' +
    '<ellipse class="ob-lid" cx="82" cy="48" rx="13" ry="14" fill="#6fb1ec"/>' +
    '<circle cx="60" cy="56" r="1.5" fill="#3f7fd4"/><circle cx="68" cy="56" r="1.5" fill="#3f7fd4"/>' +
    '<path d="M58 60 q4 3 8 0" stroke="#3f7fd4" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
    '</svg>',
    lines: ["Hey! I'm {name}!", 'I see you!', 'Hehe! That tickles!', 'This page is my sun spot!']
  }
};
