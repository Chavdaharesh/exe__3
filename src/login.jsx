import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

 useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load users: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users || []);
        console.log(data.users || []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.firstName === username && u.password === password);

    console.log("Username:", username);
    console.log("Password:", password);

    if (user) {
      alert('Login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/dashboard');
      return;
    }

    alert('Invalid username or password');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(135deg, rgba(207, 209, 186, 0.95), rgba(255, 255, 255, 0.95))' }}>
      <div className="card shadow-lg rounded-4" style={{ width: '100%', maxWidth: '440px', backgroundColor: 'rgba(185, 199, 181, 0.18)' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Recipe Finder</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-2 form-floating">
              <input
                type="text"
                id="username"
                className="form-control form-control-lg rounded-4 text-muted"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="mb-2 form-floating">
              <input
                type="password"
                id="password"
                className="form-control form-control-lg rounded-4 text-muted"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="mb-4 form-check d-flex align-items-start gap-2">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-4">
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              Don't have an account? <a href="#" className="text-decoration-none fw-semibold">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;