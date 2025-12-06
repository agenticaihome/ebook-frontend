import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Dev server configuration
    server: {
        port: 3000,
        open: true,
    },

    // Build configuration
    build: {
        outDir: 'build',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    framer: ['framer-motion'],
                },
            },
        },
    },

    // Handle CRA environment variables
    define: {
        'process.env.PUBLIC_URL': JSON.stringify(''),
    },

    // Force esbuild to treat .js files as JSX
    esbuild: {
        include: /\.[jt]sx?$/,
        exclude: [],
        loader: 'tsx',
    },

    // Pre-bundle optimization
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.ts': 'tsx',
            },
        },
    },
});
