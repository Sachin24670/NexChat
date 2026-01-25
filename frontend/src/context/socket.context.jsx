import { HOST } from "@/lib/constants";
import { useAppstore } from "@/store";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo } = useAppstore();

  useEffect(() => {
    if (!userInfo) return;

    socket.current = io(HOST, {
      withCredentials: true,
      query: { userId: userInfo },
    });

    socket.current.on("connect", () => {
      console.log("Connected to Socket Server");
    });

    return () => {
      socket.current?.disconnect();
      socket.current = null;
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
