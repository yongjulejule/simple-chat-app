import { useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Manager, Socket } from 'socket.io-client';
import { ActivitySocketContext } from '../context/socket.context';

export const Queue = () => {
  const nav = useNavigate();
  const manager = useContext<Manager>(ActivitySocketContext);
  const socket: Socket = manager.socket('/queue').connect();
  // const [queue, setQueue] = useState<string[]>([]);

  const enRollQueue = useCallback(async () => {
    socket.emit('joinQueue', window.localStorage.getItem('email'));
    const res = await fetch('http://localhost:4000/queue/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.status !== 201) {
      socket.emit('leaveQueue');
      alert('queue failed');
      return;
    }
  }, []);
  useEffect(() => {
    socket.on('queueMatched', (data: any) => {
      alert(data);
      socket.disconnect();
      nav('/chat/' + data);
    });
    return () => {
      socket.off('queueMatched');
      socket.off('joinQueue');
      socket.off('leaveQueue');
      socket.off('connected');
    };
  }, []);
  return (
    <div>
      <button onClick={enRollQueue}>start random chat</button>
    </div>
  );
};
