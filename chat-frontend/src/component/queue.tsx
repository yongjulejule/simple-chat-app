import { useState, useContext, useEffect } from 'react';
import { Manager, Socket } from 'socket.io-client';
import { ActivitySocketContext } from '../context/socket.context';

export const Queue = () => {
  const manager = useContext<Manager>(ActivitySocketContext);
  const socket: Socket = manager.socket('/queue').connect();
  const [queue, setQueue] = useState<string[]>([]);
  const enRollQueue = async () => {
    const res = await fetch('http://localhost:4000/queue/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.status !== 201) {
      alert('queue failed');
      return;
    }
    const email: string = (await res.json()).email;
    setQueue([...queue, email]);
  };
  useEffect(() => {
    socket.on('queueMatched', (data: any) => {
      setQueue([]);
      alert(data[0] + ' ' + data[1]);
      socket.disconnect();
    });
    return () => {
      socket.off('queueMatched');
      socket.off('connected');
    };
  }, []);
  return (
    <div>
      <button onClick={enRollQueue}>Enroll</button>
    </div>
  );
};
