import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BoardList from './components/Board/BoardList';
import BoardDetails from './components/Board/BoardDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BoardList />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
