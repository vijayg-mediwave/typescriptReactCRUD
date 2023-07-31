import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Add from './pages/add'
import Edit from './pages/Edit'
import '@picocss/pico'
import { Route, Routes,BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
     <Routes>
         <Route path="/" element={<App />} />
         <Route path="/add" element={<Add />} />
         <Route path="/edit/:id" element={<Edit />} />
     </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
