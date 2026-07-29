# Developer Portfolio 🚀

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## What is this?

This simple portfolio to showcase my past projects, career history, skill sets, and more.

![screenshot](./src/assets//images/doc/screenshot.png)

## Features

✅ Responsive design & mobile-friendly  
✅ Supports both dark and light modes
✅ Built with modern technologies (React, TypeScript, JavaScript, and SCSS)  
✅ Bundled with Vite — instant dev server start and near-instant hot reload  

## Quick Setup

1. Ensure you have [Node.js](https://nodejs.org/) **20.19+ or 22.12+** installed (required by Vite). Check your installation by running:

    ```bash
    node -v
    ```

2. In the project directory, install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

5. Customize the template by navigating to the `/src/components` directory. Modify texts, pictures, and other information as needed.

The page will reload if you make edits, and you will see any lint errors in the console.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload on http://localhost:3000 |
| `npm start` | Alias for `npm run dev` |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run lint` | ESLint over the project |
| `npm test` | Vitest in watch mode |
| `npm run test:ci` | Vitest, single run |
| `npm run build` | Typecheck, then production bundle into `build/` |
| `npm run preview` | Serve the built `build/` folder on http://localhost:5000 |
| `npm run deploy` | Build + publish to the `gh-pages` branch |

### Running from VS Code

`.vscode/launch.json` and `.vscode/tasks.json` are checked in:

- **F5 → "Run website (Chrome)"** starts the dev server and opens a debuggable
  browser on it (breakpoints in `src/` work).
- **"Preview production build"** builds and serves `build/` on port 5000.
- **"Debug tests (Vitest)"** runs the suite under the debugger.
- **Ctrl+Shift+B → "checks: all"** runs typecheck → lint → tests → build, i.e.
  everything that should be green before pushing.

## Project structure notes

- `index.html` lives at the **project root**, not in `public/` — Vite treats it
  as the real entry point and injects the bundled scripts into it at build time.
- `public/` is copied verbatim to the output root; reference those files with
  absolute paths (`/favicon.ico`), never `%PUBLIC_URL%`.
- Images and video are imported as ES modules
  (`import logo from "../assets/images/logos/x.png"`), which is what lets Vite
  hash and inline them. `require()` does not work.
- Build output goes to `build/` (configured in `vite.config.ts`) so the
  `gh-pages` deploy is unchanged.

## Deployment

You can choose your preferred service (e.g., [Netlify](https://www.netlify.com/), [Render](https://render.com/), [Heroku](https://www.heroku.com/)) for deployment. One of the easiest ways to host this portfolio is using GitHub Pages. Follow the instructions below for a production deploy.

1. **Set Up GitHub Repository**

    Create a new repository on GitHub for your portfolio app.

2. **Configure `package.json`**

    Edit the following properties in your `package.json` file:

    ```json
    {
        "homepage": "https://yourusername.github.io/your-repo-name",
        "scripts": {
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build",
            ...
        }
    }
    ```

    Replace `yourusername` with your GitHub username and `your-repo-name` with the name of your GitHub repository.

3. **Deploy to GitHub Pages**

    Run the following command to deploy your app:

    ```bash
    npm run deploy
    ```

4. **Access Your Deployed App**

    After successfully deploying, you can access your app at `https://yourusername.github.io/your-repo-name`.
