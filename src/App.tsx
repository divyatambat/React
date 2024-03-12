import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { TodoApp } from './components/TodoApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Route path="/" element={<TodoApp />} />
        <Route path="/home" element={<TodoApp />} />
        <Route path="/add" element={<div>adddd</div>} />

      </BrowserRouter>
    </div>
  );
}

export default App;