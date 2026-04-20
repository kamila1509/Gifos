# Gifos

A small single-page app for discovering, saving, and creating GIFs using the [Giphy API](https://developers.giphy.com/). The UI is in Spanish. Built with plain HTML, CSS, and JavaScript (ES modules)—no build step required.

## Features

- **Search** — Query GIFs with suggestions and autocomplete powered by Giphy.
- **Trending** — Browse trending GIFs and popular search terms on the home screen.
- **Favorites** — Save GIF IDs in the browser (localStorage) and browse them on `#/favorites`.
- **My GIFs** — List GIFs you uploaded with your Giphy API key (`#/mygifos`).
- **Create a GIF** — Record from the webcam with [RecordRTC](https://recordrtc.org/) and upload to Giphy (`#/newgifo`).
- **Theme** — Light / dark mode with preference stored in `localStorage`.
- **Routing** — Hash-based routes (`#/`, `#/favorites`, `#/mygifos`, `#/newgifo`).

## Tech stack

- Vanilla JavaScript (ES modules)
- Giphy REST API (`api.giphy.com`, `upload.giphy.com`)
- [RecordRTC](https://www.webrtc-experiment.com/RecordRTC/) (loaded from CDN in `index.html`)
- Google Analytics (optional; ID in `index.html`)

## Prerequisites

- A [Giphy Developers](https://developers.giphy.com/) API key.
- A modern browser with support for ES modules, `fetch`, and `getUserMedia` (for “Create GIF”).
- A **local HTTP server** (required for ES modules; opening `index.html` as `file://` often blocks imports).

## Configuration

1. Clone or download this repository.
2. Open `js/utils/api.js` and set `API_KEY` to your Giphy API key.

Keep your key out of public repositories if you deploy the app; prefer environment variables and a small backend proxy for production.

## Run locally

From the project root (where `index.html` lives):

```bash
# Option A — Node (npx)
npx --yes serve .

# Option B — Python 3
python3 -m http.server 8080
```

Then open `http://localhost:3000` (serve) or `http://localhost:8080` (Python) in your browser.

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | Shell: header slot, main content, trending area, scripts |
| `index.js` | App entry: hash router on `load` / `hashchange` |
| `js/routes/index.js` | Maps routes to page modules |
| `js/pages/` | Screen modules (`Home`, `Favorites`, `MiGifos`, `NewGif`, `Error404`) |
| `js/components/` | Reusable UI (`Header`, `Search`, `Trendings`, `Card`, `Maxgif`) |
| `js/utils/` | API helpers (`getData`, `postData`, `api`, `getHash`, `resolveRoutes`) |
| `styles/` | Global and feature CSS |
| `assets/` | SVGs and images |

## License

This project is provided as-is for learning and portfolio use. Giphy branding and API use are subject to [Giphy’s terms](https://developers.giphy.com/docs/api/).
