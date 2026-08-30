# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Netlify deployment

This project is configured for Netlify.

- Build command: `npm run build`
- Publish directory: `dist`
- React Router fallback is configured in `netlify.toml`.
- `/api/*` is routed to the Netlify Function in `netlify/functions/api.js`.
- Public images are stored in `public/assets/` and are referenced as `/assets/<filename>`.
- Image filenames use URL-safe characters only (no spaces or parentheses).

Before deploying, add the server-side email environment variables in Netlify when email notifications are required:

- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `FROM_EMAIL`
- Or the SMTP variables used by `api/services/emailService.js`.
