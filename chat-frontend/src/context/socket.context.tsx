import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const activitySocket = io("http://localhost:4000/activity");
const ActivitySocketContext = createContext<Socket>(activitySocket);

activitySocket.on("connect", () => {
  console.log("connected");
});

const ActivitySocketProvider = ({ children }: any) => {
  return (
    <ActivitySocketContext.Provider value={activitySocket}>
      {children}
    </ActivitySocketContext.Provider>
  );
};

export { ActivitySocketContext, ActivitySocketProvider}
