import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      setTimeout(() => {
        navigate('/');
      }, 100)
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Something went wrong');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
