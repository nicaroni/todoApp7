import './App.css';
import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './containers/SignUpPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import TodoPage from './containers/TodoPage.jsx';
import ThemePage from './containers/ThemePage.jsx';
import HomePage from './containers/HomePage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen flex items-center justify-center bg-primary text-white text-3xl font-bold">
    ✅ Tailwind is working!

    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="*" element={<div className="p-4 text-red-500">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
