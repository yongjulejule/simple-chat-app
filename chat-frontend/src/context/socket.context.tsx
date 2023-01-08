import React, { createContext } from 'react';
import { io, Socket, Manager } from 'socket.io-client';

const activitySocket = new Manager('http://localhost:4000', {
  autoConnect: false,
});
const ActivitySocketContext = createContext<Manager>(activitySocket);

const ActivitySocketProvider = ({ children }: any) => {
  return (
    <ActivitySocketContext.Provider value={activitySocket}>
      {children}
    </ActivitySocketContext.Provider>
  );
};

export { ActivitySocketContext, ActivitySocketProvider };
