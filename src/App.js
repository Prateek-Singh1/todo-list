import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './dashboard';
import TodoDetails from './components/todoDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/todo-details/:title' element={<TodoDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
