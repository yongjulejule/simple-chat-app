import React, {useEffect, useRef, useState} from "react";
import {socket} from "./io";
import {nanoid} from "nanoid";

interface User {
  email: string;
}

interface UserBoxProps {
  email: User["email"];
}

const UserBox = ({email}: UserBoxProps) => {
  return <div>{email}</div>;
};

const Activity = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const socketRef = useRef(socket);

  useEffect(() => {
    socketRef.current.on("connected", (data: any) => {
      alert("connected");
      const user: string | null = window.localStorage.getItem("user");
      if (user) {
        alert("user: " + user);
        socketRef.current.emit("newConnection", user);
      }
    });
    socketRef.current.on("clientHello", (data: any) => {
      const userData: User[] = data.map((item: string): User => {
        return {email: item};
      });
      setActiveUsers(userData);
    });
    return () => {
      socket.off("connected");
      socket.off("clientHello");
      socket.off("userConnected");
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
