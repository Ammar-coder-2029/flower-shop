# 🌸 Flower Shop — A Vanilla JS E-Commerce Build

> No React. No Vue. No shortcuts. Just the DOM, `localStorage`, and a lot of debugging.

A front-end e-commerce app for a flower & plant shop — built from scratch with **HTML5, Tailwind CSS, custom CSS, and plain JavaScript** to actually understand what frameworks abstract away: state, rendering, and the DOM.

<!-- 📸 Drop a screenshot or GIF of the home page / cart here -->

## 🧭 About

Most tutorials teach you to build a to-do list. This is a to-do list with trust issues: cart totals that have to stay correct after every click, a favorites list that has to sync with a separate localStorage key, and a search bar that filters live without a framework doing the diffing for you.

Every feature here — cart, favorites, search — was built, broken, debugged, and rebuilt by tracing the actual cause of each bug rather than patching symptoms.

## ✨ Features

- 🔐 **Auth flow** — register, login, logout (client-side, backed by `localStorage`)
- 🛍️ **Product catalog** — 12 products rendered dynamically from a data array, not hardcoded HTML
- 🛒 **Shopping cart** — add/remove items, adjust quantity with `+`/`−`, live item count badge, live total price (`price × qty` summed across the cart)
- ❤️ **Favorites / wishlist** — toggle any product in or out of favorites independently of the cart
- 🔎 **Live search & filter** — type-ahead search by title, or filter by category via a dropdown, both updating the grid instantly with no page reload
- 📱 **Responsive layout** — CSS Grid for product/favorites grids, fluid spacing with `clamp()`

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) + custom CSS (design tokens, native nesting, Grid) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome |
| Persistence | Browser `localStorage` — no backend |

## 🧩 What I Learned (a.k.a. the bug log)

A few things that were "obvious" in theory and expensive in practice:

- **Reference vs. copy:** having `products` and `itemadded` as two separate arrays meant editing one silently left the other — and the UI — out of sync. One source of truth per piece of state, always.
- **`Array.prototype.map()` isn't a rendering function.** A function that both maps *and* writes to `innerHTML` can't be reused as a `.map()` callback — mixing "compute" and "render" responsibilities breaks in non-obvious ways.
- **The Temporal Dead Zone is real.** A `let` used one line before it's declared doesn't just misbehave — it throws, and silently kills every line of code after it in that function.
- **CSS specificity doesn't care about source order.** `.user-info { display: none }` losing to a *more generic* `ul { display: flex }` nested three levels deep taught me to actually calculate specificity instead of guessing.

## 📁 Project Structure

```
├── index.html         # Home — product grid, search & filter
├── login.html          # Login page
├── register.html        # Registration page
├── cart.html          # Cart + Favorites page
├── css/
│   └── style.css        # Design tokens, layout, components
├── js/
│   ├── script.js        # Home page — products, cart, favorites, search
│   ├── cart.js         # Cart & favorites page logic
│   ├── login.js         # Login logic
│   └── register.js       # Registration logic
└── imges/            # Product & UI images
```

## 🚀 Getting Started

```bash
git clone <your-repo-url>
```

Then just open `index.html` in a browser — or serve it with a local server (e.g. VS Code Live Server) for the smoothest experience. No install step, no dependencies, no build process.

Register an account first — the app requires login before adding items to the cart or favorites.

## ⚠️ Known Limitations

This is a learning project, not a production app:

- **No real authentication.** Credentials sit in `localStorage` in plain text and are checked client-side — trivially bypassable via dev tools.
- **No backend or database.** Everything is scoped to one browser; clearing storage wipes the account, cart, and favorites.
- **Single active account.** Registering a new user overwrites the previous one — there's no per-user namespacing.

## 🗺️ Possible Next Steps

- Real backend (Node/Express + database) with hashed passwords
- Per-user data instead of a single shared `localStorage` slot
- Basic tests around the cart/favorites logic (`add`, `removeitem`, `changeQTY`)

## 👤 Author

**Ammar Yasser Abdelmoniam Eid** — Computer Engineering student, Badr University in Cairo (BUC)
