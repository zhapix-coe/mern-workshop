import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CourseProvider } from './CourseContext';
import './index.css';
import App from './App.jsx';
import Stream from './Stream.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CourseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/add-stream" element={<Stream />} />
        </Routes>
      </BrowserRouter>
    </CourseProvider>
  </React.StrictMode>
);