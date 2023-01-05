// import { socket } from "./io";
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivitySocketContext } from '../context/socket.context';

const Login = () => {
  const nav = useNavigate();
  const manager = useContext(ActivitySocketContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userData, setUserData] = useState<string>('');

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
      const data = await res.json();
      document.cookie = `email=${data.email}; max-age=3600;`;
      setUserData(data.email);
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await fetchData();

      const socket = manager.socket('/activity');
      socket.emit('newConnection', userData);
      nav('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
