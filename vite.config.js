import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx', 'resources/sass/app.scss'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            'emoji-mart': 'emoji-mart/dist/es/index.js', // エイリアスを追加
        },
    },
});
