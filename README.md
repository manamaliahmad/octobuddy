# OctoBuddy 🐙 — Cute Screen Pet for Chrome

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![No tracking](https://img.shields.io/badge/tracking-none-brightgreen)
![GitHub stars](https://img.shields.io/github/stars/manamaliahmad/octobuddy?style=social)

> **OctoBuddy is a cute, free, open-source Chrome extension that adds a plush octopus screen pet to your browser.** It follows your cursor on every page, blinks, sways its tentacles, falls asleep when you're idle, and jumps with hearts when you click it. No tracking, no accounts, no setup — install it and meet your new buddy.

If you like OctoBuddy, please ⭐ **star this repo** — it helps more people discover it.

---

## ✨ Features

| Feature | What it does |
|---|---|
| **Cursor following** | The pet follows your mouse on every page with smooth, cute easing — never a robotic snap. |
| **Eyes that look at you** | Its pupils turn toward your cursor, so it always feels alive and aware. |
| **Blinking & swaying** | Blinking eyes, swaying tentacles, gentle bobbing and tilt toward movement direction. |
| **Happy hops** | When it catches up with your cursor, it does a little happy hop every few seconds. |
| **Idle sleep** | Leave the mouse still for 20 seconds and it falls asleep with floating Zzz. Move the mouse to wake it. |
| **Click love** | Click the pet and it jumps, bursts hearts, and shows a speech bubble. |
| **Popup controls** | Change the pet's name, size (60–140px), follow speed, or turn it off — from the extension popup. |
| **Private by design** | Zero dependencies, no analytics, no remote code, no data leaves your browser. |

## 🎬 Demo (no install needed)

Open **`demo.html`** in any browser. It runs the exact same pet with an auto-moving
demo cursor, so you can watch it follow, blink, hop and sleep before installing:

- **Auto demo** — a fake cursor moves on its own
- **Use my mouse** — the pet follows your real cursor
- **Make it sleep** — watch the Zzz mode trigger

> Tip: you can also host the demo with GitHub Pages (repo Settings → Pages →
> Deploy from branch) and share the link anywhere.

## 🚀 Install

### Option A — Chrome Web Store (coming soon)

Search **"OctoBuddy"** on the Chrome Web Store and click **Add to Chrome**.

### Option B — Load unpacked (works right now)

1. Download this repo (Code → Download ZIP) and unzip it.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the unzipped folder.
5. Open any website — your buddy appears near your cursor.

Works in Chrome, Edge, Brave and any Chromium browser.

## 🎮 How to use it

- **Move your mouse** — OctoBuddy follows, tilts, and watches your cursor.
- **Click the pet** — jump + heart burst + speech bubble.
- **Stop moving for 20 seconds** — it falls asleep (Zzz). Move again to wake it.
- **Extension icon → popup** — rename your pet, resize it, change follow speed,
  or switch it off for a while.

## 🎨 Customize it (make it yours)

OctoBuddy is built with plain HTML, CSS and SVG — no build step, no framework.
Everything is easy to change:

- **Pet name** — set it in the popup; the greeting bubble uses it.
- **Colors** — edit the gradient and tentacle colors in `content.js` (SVG) and `pet.css`.
- **Size & speed** — popup sliders, or the defaults in `content.js`.
- **Idle sleep time** — the `20000` ms value in `content.js` (search for `lastMove`).
- **Your own skin** — replace `assets/octopus-plush.jpg` with your own art. A
  transparent PNG cutout works best as a pet sprite (see Roadmap).
- **New behaviors** — the animation loop lives in `frame()` in `content.js`.

## 🔒 Privacy & permissions

| Permission | Why it's needed | Data collected |
|---|---|---|
| Host access (`<all_urls>`) | So the pet can appear on every page you visit | None — the extension only adds one floating pet element to the page. It never reads page content, passwords, or history. |
| Storage | To remember your settings (name, size, speed, on/off) | Only your settings, stored locally in `chrome.storage.sync`. |

**No analytics. No accounts. No remote code. No data leaves your browser.**

## 🛠 Project structure

```text
octobuddy/
├── manifest.json       # Manifest V3: metadata, permissions, content scripts
├── content.js          # Pet logic: follow, blink, sleep, click reactions
├── pet.css             # Pet animations: bob, sway, blink, hearts, Zzz
├── popup.html          # Extension popup UI
├── popup.js            # Popup settings (chrome.storage.sync)
├── demo.html           # Standalone no-install demo page
├── icons/              # Extension icons (16 / 48 / 128 px)
├── assets/             # Plush octopus photo used in the popup
├── LICENSE             # MIT License
└── README.md           # You are here
```

## 🧰 Tech stack

- **Manifest V3** — the current Chrome extension standard
- **Vanilla JavaScript, CSS & inline SVG** — zero dependencies, zero build step
- **requestAnimationFrame** loop with eased following for buttery movement

## 🗺 Roadmap

- [ ] Chrome Web Store listing (public, searchable, one-click install)
- [ ] Transparent-PNG photo skin option (use your own plush photo as the pet)
- [ ] Reactions to scrolling, typing and tab switching
- [ ] More buddies: penguin, cat, owl
- [ ] Desktop-app version (pet over the whole desktop, outside the browser)
- [ ] Firefox port (Manifest V2 adjustments)

## 🤝 Contributing

Contributions are welcome! Ideas, bug reports, new skins and new buddies:

1. Fork this repo
2. Create a branch (`git checkout -b my-cool-skin`)
3. Commit your changes (`git commit -m "Add rainbow skin"`)
4. Open a Pull Request

Found a bug? Open an **Issue** with your Chrome version and a screenshot.

## ❓ FAQ

**Is OctoBuddy free?**
Yes — free and open source under the MIT License, forever.

**Does it work on every website?**
On every normal web page, yes. Chrome's own internal pages (`chrome://...`)
don't allow content scripts, so the pet rests there.

**Does it slow down my browser?**
No. It's one small element animated with `requestAnimationFrame`, using no
libraries and no network requests.

**Why does Chrome say it can "read and change all your data"?**
That's Chrome's standard wording for content-script injection. OctoBuddy only
adds a floating pet element — it never reads what you type or see.

**Can I turn it off without uninstalling?**
Yes — open the popup and switch it off, or hide it any time.

**Can I make my own pet?**
Yes! Change the SVG in `content.js` or swap the photo in `assets/`. Pull
requests with new buddies are very welcome.

**Is there a desktop version?**
Not yet — the extension lives inside the browser. A desktop app version is on
the roadmap.

## 👤 Author

Built by **Ali Ahmad** — builder of cute robots, websites and open-source toys.

- GitHub: https://github.com/manamaliahmad
- Instagram: https://instagram.com/manamaliahmad
- X (Twitter): https://x.com/manamaliahmad

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for
details. Use it, remix it, ship it. If you make a cool skin, send a pull request!

---

<p align="center">Made with 💙 and a plush octopus · If OctoBuddy made you smile, give it a ⭐</p>
