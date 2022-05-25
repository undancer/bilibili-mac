import { defineConfig } from 'vite'
import * as path from 'path'
import { builtinModules } from 'module'
import eslint from 'vite-plugin-eslint'
// import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // vue()
        eslint({
            cache: false
        })
    ],
    build: {
        lib: {
            entry: path.join(__dirname, 'src/main.ts'),
            name: 'app-core',
            formats: [
                'cjs'
                // 'es',
                // 'umd',
            ]
        },
        rollupOptions: {
            external: [
                'glob',
                ...builtinModules
                // ...pkg.dependencies,
            ]
        }
    }
})
