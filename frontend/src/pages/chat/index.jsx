import { useAppstore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactConatiner from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
  const { userInfo, selectedChatType } = useAppstore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast("Please setup Profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-gray-100 overflow-hidden bg-[#09090b]">
      <div className={`${selectedChatType !== undefined ? "hidden md:block" : "w-full md:w-auto"}`}>
        <ContactConatiner />
      </div>
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
