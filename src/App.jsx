import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './views/MyNotes';
import CreateNote from './views/CreateNote';
import ArchivedNotes from './views/ArchivedNotes';
import EditNote from './views/EditNote';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<MyNotes />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/archived" element={<ArchivedNotes />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
    </div>
  )
}

export default App
