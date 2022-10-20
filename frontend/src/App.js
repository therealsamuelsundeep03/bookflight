import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Router from './components/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
