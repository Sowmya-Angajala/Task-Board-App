import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
    return (
  <>
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 50px',
        background: '#f0f0f0',
      }}
    >
      <h2>Board App</h2>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '20px' }}>
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  </>
);
};
export default Navbar;