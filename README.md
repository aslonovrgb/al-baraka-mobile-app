# Al Baraka Mobile MVP

Mobile-first React + Vite + Tailwind visual MVP for an Al Baraka banking app.

## Run locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173/signin`
- `http://localhost:5173/app`

## Build

```bash
npm run build
```

## iPhone Home Screen shortcut

Deploy the built app to a public HTTPS host, open `/signin` on iPhone Safari, then use:

`Share` -> `Add to Home Screen`

The app uses:

- `public/apple-touch-icon.png`
- `public/manifest.webmanifest`
- `public/pwa-192.png`
- `public/pwa-512.png`

All banking data is mock data only. There is no backend, real authentication, or payment processing.
