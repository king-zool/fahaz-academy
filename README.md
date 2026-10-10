# Fahaz Academy

A responsive, single-page Vite + React + TypeScript website with plain CSS.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`. Preview it with `npm run preview`.

## Deploy to Vercel

Push the project to your Git repository and import it into Vercel. Select the Vite preset if not detected. Build command: `npm run build`. Output directory: `dist`. No environment variables or `vercel.json` are needed. All navigation uses section anchors.

## Before launching enquiries

The academy has not confirmed a WhatsApp number. In `src/data.ts`, replace the clearly marked `WHATSAPP_NUMBER = '234XXXXXXXXXX'` with the confirmed international number (digits only, no plus sign or spaces). The telephone number is deliberately not reused. Until configured, both forms validate but display a clear call fallback and do not open an invalid WhatsApp destination. No enquiry is stored, submitted to a backend, or claimed to be received. When configured, the form opens a URL-encoded WhatsApp message in a new tab for the visitor to send. Test that the confirmed number belongs to the academy before public launch.

All academy facts, fees, services and FAQ answers live in `src/data.ts`. The replaceable text wordmark is in `src/main.tsx`. Styling is in `src/styles.css`.

## Images

Six temporary Unsplash stock photographs are in `public/assets/images/` (served at `/assets/images/`). All are 1200 × 900 JPGs. Replace the files at the same paths with academy-approved photographs to avoid code changes. Source URLs are recorded in `public/assets/images/IMAGE-SOURCES.md`. Alt text and site labels identify the photographs as illustrative stock imagery, not academy premises or staff.

## Motion

`src/usePageMotion.ts` handles a bounded requestAnimationFrame hero parallax and one-time IntersectionObserver section reveals. CSS adds gentle hover feedback and smooth anchor scrolling. The system respects `prefers-reduced-motion`, including preference changes while the page is open, cleans up listeners, and keeps all content visible if motion APIs are unavailable. Keyboard focus finishes active reveal animations immediately.

## Contact and privacy

The map embeds a Google Maps address search, not a verified exact map pin. There is also an external maps link. The forms use browser validation and keep entered data only in the current page until the visitor chooses WhatsApp. No analytics, payment, account or backend storage is included. Google Maps may use its own cookies and network requests.

## Checks

`npm run build` runs strict TypeScript checks and generates production assets. Keyboard navigation uses native links, form controls, and details/summary accordions. A skip link, visible focus styles, reduced-motion support, responsive mobile menu and tap-to-call link are included.

## Light and dark appearance

The header toggle switches between light and dark themes and saves the preference in localStorage under `fahaz-theme`. Until a choice is saved, the website follows the system color scheme, including live changes. A small head script sets the theme before rendering to prevent a flash. Blocked localStorage does not prevent switching for the current visit. Photos and the third-party map retain their original appearance.
