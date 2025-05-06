import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null); // You can type this properly if desired

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        credentials: 'include', // 👈 Needed for cookies/session
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError('Invalid credentials');
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Login </h2>
      {error && <p style={{ color: 'red' }}> {error} </p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />
        < input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />
        < button type="submit" > Log In </button>
      </form>

      {user && <p>Welcome, {user.email}! </p>}
    </div>
  );
};

export default LoginForm;
