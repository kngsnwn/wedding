# Wedding Invitation Web App

A modern wedding invitation web application built with React, TypeScript, and SCSS.

## Features

- Clean and modern UI
- Responsive design
- TypeScript support
- SCSS styling
- ESLint and Prettier for code quality

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn dev
```

3. Build for production:
```bash
yarn build
```

## Project Structure

- `/src` - Source code
  - `App.tsx` - Main application component
  - `App.scss` - Global styles
  - `main.tsx` - Entry point
- `/public` - Static assets
- `/vite.config.ts` - Vite configuration

## Deploy

To publish the site to the `gh-pages` branch you can use the provided deploy
script. Make sure the project is built and then run one of the following:

```bash
npm run deploy
# or
node deploy.js
```

This will push the contents of the `dist` folder to the `gh-pages` branch so
the site is served via GitHub Pages.
