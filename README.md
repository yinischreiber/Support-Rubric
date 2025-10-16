# Additional Information Sandbox Guide

This project is scoped to the **Additional Information** form. The app shell renders only that page so you can prototype the layout without any routing or additional views.

## Local preview

```bash
npm install
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173/`) that hot-reloads as you edit files under `src/`.

## Reproducing the form in a fresh sandbox

1. **Start with a React + Vite sandbox.** Keep the default `react`/`react-dom` dependencies.
2. **Copy the theme tokens.** Replace the sandbox’s `src/index.css` with [`src/index.css`](./src/index.css) from this repo so the CSS variables used by the form resolve.
3. **Add the form styles.** Create `src/AdditionalInformation.css` and paste in [`src/AdditionalInformation.css`](./src/AdditionalInformation.css).
4. **Add the component.** Create `src/AdditionalInformation.jsx` with the contents of [`src/AdditionalInformation.jsx`](./src/AdditionalInformation.jsx).
5. **Point the app to the form.** Update `src/App.jsx` in the sandbox to import and return `<AdditionalInformation />` just like [our `App.jsx`](./src/App.jsx).
6. **Leave the entry point alone.** The default Vite `src/main.jsx` already mounts `<App />` and imports `index.css`.
7. **Run the preview.** Install dependencies and run the dev server (`npm install`, then `npm run dev`) to see the form.

If the sandbox shows a blank screen, double-check the console for typos—missing file imports or mis-capitalized file names are the most common causes when copying files between environments.
