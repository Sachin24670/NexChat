import { useState } from "react"
import {GrAttachment}from "react-icons/gr"
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerFill, RiEmojiStickerLine } from "react-icons/ri";
const MessageBar = () => {
  const [Message, setMessage] = useState("")
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6 ">
      <div className="flex1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message"
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-100 transition-all  cursor-pointer">
          <GrAttachment className="text-2xl " />
        </button>
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-100 transition-all  cursor-pointer">
            <RiEmojiStickerLine className="text-2xl " />
          </button>
          <div className="absolute buttom-16 right-0"></div>
        </div>
      </div>
      <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none hover:bg-[#38096e] focus:bg-[#38096e] hover:text-white duration-100 transition-all  cursor-pointer">
        <IoSend className="text-2xl " />
      </button>
    </div>
  );
}

export default MessageBar
