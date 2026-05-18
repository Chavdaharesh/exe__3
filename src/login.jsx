import { useState } from 'react';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      alert('Login successful!');
      return true;
    } else {
      alert('Invalid username or password');
      return false;
    }    
  };

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      
      <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>

    </form>
  );
}

export default Login;