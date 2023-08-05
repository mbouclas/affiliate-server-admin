import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path"
import dotenv from "dotenv"
dotenv.config();
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: resolve(process.env.BUILD_DIR),
  }
})
