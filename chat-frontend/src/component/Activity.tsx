import React, { useEffect, useRef, useState } from 'react';
import { socket } from './io';
import { nanoid } from 'nanoid';
import { useFetch } from 'react-async';

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
  const socketRef = useRef(socket);

  useEffect(() => {
    const fetchVerify = async () => {
      try {
        const res = await fetch('http://localhost:4000/auth/verification', {
          method: 'GET',
          credentials: 'include',
        });
        socketRef.current.on('connected', (data: any) => {
          const user: string | null = window.localStorage.getItem('user');
          if (user) {
            alert('user: ' + user);
            socketRef.current.emit('newConnection', user);
          }
        });
        socketRef.current.on('clientHello', (data: any) => {
          const userData: User[] = data.map((item: string): User => {
            return { email: item };
          });
          setActiveUsers(userData);
        });
      } catch (error) {
        alert(error)
      }
    };
    fetchVerify();
    return () => {
      socket.off('connected');
      socket.off('clientHello');
      socket.off('userConnected');
    };
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
