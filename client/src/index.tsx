import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createRouter,
    RouterProvider
} from "@tanstack/react-router";


import { routeTree } from './routeTree.gen';

const router = createRouter({
    routeTree,
    //defaultPreload: 'intent',
    //defaultStaleTime: 5000,
    //scrollRestoration: true,
})

// Register things for typesafety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
