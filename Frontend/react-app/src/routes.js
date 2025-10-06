import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BoardList from './components/Board/BoardList';
import BoardDetail from './components/Board/BoardDetail';
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<BoardList />} />
      <Route path="/board/:id" element={<BoardDetail />} />
    </Routes>
  </Router>
);
export default AppRoutes;