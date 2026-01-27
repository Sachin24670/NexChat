import { HOST } from "@/lib/constants";
import { useAppstore } from "@/store";
import { useState, createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAppstore();

  useEffect(() => {
    if (!userInfo?._id) return;

    const newSocket = io(HOST, {
      withCredentials: true,
      query: { userId: userInfo._id },
 },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket Server");
    });

    const handleReceiveMessage = (message) => {
      const { selectedChatData } = useAppstore.getState();

      if (
        selectedChatData &&
        (selectedChatData._id === message.sender._id ||
          selectedChatData._id === message.recipient._id)
      ) {
        console.log("message received", message);
        useAppstore.getState().addMessage(message);
      }
    };

    newSocket.on("receivedMessage", handleReceiveMessage);

    return () => {
      newSocket.off("receivedMessage", handleReceiveMessage);
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
