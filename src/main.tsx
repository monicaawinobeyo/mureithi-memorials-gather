
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element and create a React root
const rootElement = document.getElementById("root");

// Make sure the root element exists
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create a root instance and render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
