import { useState } from 'react';
import './App.scss';

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
    <div className="d-flex justify-content-center align-items-center vh-100" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="card shadow-lg border-0" style={{width: '100%', maxWidth: '400px'}}>
        <div className="card-body p-5">
          <h2 className="text-center mb-2 fw-bold text-dark">Recipe Finder</h2>
          <p className="text-center text-muted mb-4">Sign in to your account</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Username</label>
              <input
                type="text"
                id="username"
                className="form-control form-control-lg"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Login</button>
          </form>
          
          <hr className="my-4" />
          
          <p className="text-center text-muted">
            Don't have an account? <a href="#" className="text-decoration-none fw-semibold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;