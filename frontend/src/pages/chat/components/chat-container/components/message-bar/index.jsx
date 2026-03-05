import { useSocket } from "@/context/socket.context";
import { useAppstore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

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
    <div className="h-[10vh] bg-[#0a0c14] flex justify-center items-center px-3 md:px-8 mb-4 gap-3 md:gap-6">
      <div className="flex-1 flex bg-[#12141c] border border-[#1e2030] rounded-xl items-center gap-3 md:gap-5 pr-3 md:pr-5">
        <input
          type="text"
          className="flex-1 p-3 md:p-5 bg-transparent rounded-xl focus:border-none focus:outline-none text-gray-100 placeholder:text-gray-500 text-sm md:text-base"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Message"
        />
        <button className="text-gray-500 focus:border-none focus:outline-none hover:text-gray-200 duration-200 transition-all cursor-pointer p-1.5 rounded-lg hover:bg-[#1a1c28]">
          <GrAttachment className="text-xl md:text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-gray-500 focus:border-none focus:outline-none hover:text-gray-200 duration-200 transition-all cursor-pointer p-1.5 rounded-lg hover:bg-[#1a1c28]"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-xl md:text-2xl" />
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
            ? "bg-[#1a1c28] text-gray-600 cursor-not-allowed opacity-50"
            : "bg-[#00B4D8] hover:bg-[#0077B6] text-white cursor-pointer shadow-lg shadow-[#00B4D8]/20"
        }`}
        onClick={handleSendMessage}
        disabled={isSendDisabled}
      >
        <IoSend className="text-xl md:text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
