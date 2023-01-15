import { useEffect, useState, useContext } from 'react';
import { ActivitySocketContext } from '../context/socket.context';
import { nanoid } from 'nanoid';
import { Manager, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router';

interface User {
  email: string;
}

interface UserBoxProps {
  email: User['email'];
}

const UserBox = ({ email }: UserBoxProps) => {
  return <div>{email}</div>;
};

const Activity = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const manager = useContext<Manager>(ActivitySocketContext);
  const nav = useNavigate();
  useEffect(() => {
    const fetchVerify = async () => {
      try {
        const res = await fetch('http://localhost:4000/auth/verification', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.status !== 200) {
          throw new Error('User not logged in');
        }
        alert('hi');
        const { email } = await res.json();
        const socket: Socket = manager
          .socket('/activity', { auth: { email } })
          .connect();
        socket.emit('newConnection');
        socket.on('clientHello', (data: any) => {
          socket.auth = { email: data };
          const userData: User[] = data.map((item: string): User => {
            return { email: item };
          });
          setActiveUsers(userData);
        });
        return () => {
          socket.off('connected');
          socket.off('clientHello');
          socket.off('newConnection');
        };
      } catch (error) {
        alert(error);
        nav('/login');
        return <></>;
      }
    };
    fetchVerify();
    return;
    // return () => {
    //   socket.off('connected');
    //   socket.off('clientHello');
    //   socket.off('userConnected');
    // };
  }, []);

  return (
    <div>
      {activeUsers.map((item) => (
        <UserBox key={nanoid()} email={item.email} />
      ))}
    </div>
  );
};

export default Activity;
