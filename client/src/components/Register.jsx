import React, { useState } from 'react';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      toast.error("Passwords do not match", {
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        toast.success("Registration successful");
        setTimeout(() => {
          toast.success("Moving to the Login Page!", {
            style: {
              backgroundColor: 'black',
              color: 'white',
            },
          });
        }, 1000);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        console.error('Registration failed');
        setPassword('');
        setConfirmPassword('');
        response.json().then((data) => toast.error(data.error));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error: ' + error);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
}