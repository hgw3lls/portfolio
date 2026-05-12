import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'copy-editable-content-json',
      closeBundle() {
        const destination = resolve('dist/content.json');
        mkdirSync(dirname(destination), { recursive: true });
        copyFileSync(resolve('content.json'), destination);
      },
    },
  ],
});
