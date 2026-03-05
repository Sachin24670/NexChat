import { useSocket } from "@/context/socket.context";
import { useAppstore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Paperclip, Smile, SendHorizontal } from "lucide-react";

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");

  const { selectedChatType, selectedChatData, userInfo } = useAppstore();
  const socket = useSocket();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!socket) {
      console.warn("Socket not connected yet");
      return;
    }
    if (!message.trim()) return;

    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        findUrl: undefined,
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isSendDisabled = !message.trim();

  return (
    <div className="h-[10vh] bg-[#09090b] flex justify-center items-center px-3 md:px-8 mb-4 gap-3 md:gap-6">
      <div className="flex-1 flex bg-[#111118] border border-[#1e1e2a] rounded-xl items-center gap-3 md:gap-5 pr-3 md:pr-5">
        <input
          type="text"
          className="flex-1 p-3 md:p-5 bg-transparent rounded-xl focus:border-none focus:outline-none text-gray-100 placeholder:text-gray-500 text-sm md:text-base"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Message"
        />
        <button className="text-gray-500 focus:border-none focus:outline-none hover:text-gray-200 duration-200 transition-all cursor-pointer p-1.5 rounded-lg hover:bg-[#1a1a24]">
          <Paperclip className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="relative">
          <button
            className="text-gray-500 focus:border-none focus:outline-none hover:text-gray-200 duration-200 transition-all cursor-pointer p-1.5 rounded-lg hover:bg-[#1a1a24]"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <Smile className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className={`rounded-xl flex items-center justify-center p-3 md:p-4 focus:border-none focus:outline-none transition-all duration-200 ${
          isSendDisabled
            ? "bg-[#1a1a24] text-gray-600 cursor-not-allowed opacity-50"
            : "bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer shadow-lg shadow-[#7c3aed]/20"
        }`}
        onClick={handleSendMessage}
        disabled={isSendDisabled}
      >
        <SendHorizontal className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default MessageBar;
