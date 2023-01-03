import React, { useEffect, useRef, useState, useContext } from "react";
import { ActivitySocketContext } from "../context/socket.context";
// import io from "socket.io-client";
import { nanoid } from "nanoid";

interface User {
  email: string;
}

interface UserBoxProps {
  email: User["email"];
}

const UserBox = ({ email }: UserBoxProps) => {
  return <div>{email}</div>;
};

const Activity = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const socket = useContext(ActivitySocketContext);

  useEffect(() => {
    const fetchVerify = async () => {
      try {
        const res = await fetch("http://localhost:4000/auth/verification", {
          method: "GET",
          credentials: "include",
        });
        if (res.status !== 200){
          throw new Error("User not logged in");
        }
        socket.on("connected", (data: any) => {
            socket.emit("newConnection", 'TODO: put email... from... where?');
        });
        socket.on("clientHello", (data: any) => {
          const userData: User[] = data.map((item: string): User => {
            return { email: item };
          });
          setActiveUsers(userData);
        });
        return () => {
          socket.off("connected");
          socket.off("clientHello");
          socket.off("userConnected");
          socket.off("newConnection");
        };
      } catch (error) {
        alert(error);
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
