// import { socket } from "./io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const fetchData: () => Promise<void> = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
      });
      if (res.status !== 200) {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await fetchData();
      nav('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
