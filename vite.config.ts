// defineConfig comes from vitest/config (not vite) so the `test` block below
// is type-checked too.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Site is served from the domain root (see CNAME / the `homepage` field).
  base: '/',

  resolve: {
    alias: [
      // MUI v5 ships deep icon paths (@mui/icons-material/GitHub) as CommonJS
      // with no "exports" map. Vite's CJS interop wraps those as
      // { default: { default: Icon } }, so <GitHubIcon /> renders as an object
      // and React blows up with "type is invalid". Point the deep imports at
      // the package's real ESM build instead.
      // NOTE: MUI v6+ drops the esm/ folder in favour of a proper exports map,
      // so this alias should be removed when @mui/icons-material is upgraded.
      {
        find: /^@mui\/icons-material\/(?!esm\/)(.+)$/,
        replacement: '@mui/icons-material/esm/$1',
      },
    ],
  },

  server: {
    // Same port CRA used, so bookmarks and .vscode/launch.json stay valid.
    port: 3000,
    open: false,
  },

  preview: {
    port: 5000,
  },

  build: {
    // `build/` rather than Vite's default `dist/`, so `npm run deploy`
    // (gh-pages -d build) and .gitignore keep working unchanged.
    outDir: 'build',
    sourcemap: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
});
