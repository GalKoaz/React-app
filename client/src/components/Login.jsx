import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Send cookies with the request
      });

      if (response.ok) {
        console.log('Login successful');
        toast.success("Login successful");
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        console.error('Login failed');
        setPassword('');
        response.json().then((data) => toast.error(data.error));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error: ' + error);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
        <PersonIcon />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="input-field">
        <LockIcon />
          <label htmlFor="password"><span>Password:</span></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <>
      <p>Don't have an account? <Link to="/register">Register HERE!</Link></p>
      </>
      <ToastContainer />
    </div>
  );
}