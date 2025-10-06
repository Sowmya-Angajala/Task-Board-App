import React, { useState } from 'react';
import API from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" style={{ width: '100%', padding: '10px' }}>
            Register
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default Register;
