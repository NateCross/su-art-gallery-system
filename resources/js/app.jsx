import './bootstrap';
import '../css/app.css';
import 'react-18-image-lightbox/style.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from './Layouts/Layout';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
        page.then((module) => {
            module.default.layout ??= (page) => <Layout children={page} />;
        });
        // const page = require(`./Pages/${name}`).default;
        // const page = import(`./Pages/${name}`).default;
        // page.layout = page.layout || Header;
        return page;
    },
    // resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
});

InertiaProgress.init({ color: '#4B5563' });
