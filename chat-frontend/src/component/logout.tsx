import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ActivitySocketContext } from '../context/socket.context';

export const Logout = () => {
  const nav = useNavigate();
  const manager = useContext(ActivitySocketContext);
  const socket = manager.socket('/activity');

  const fetchData: () => Promise<void> = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (res.status !== 200) {
        throw new Error('Logout failed');
      }
      socket.disconnect();
      nav('/login');
    } catch (error) {
      alert(error);
    }
  };
  fetchData();
  return <></>;
};
