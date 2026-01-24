import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { useAppstore } from "@/store";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppstore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex items-center gap-5  w-full justify-between ">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-16 h-16 relative">
            <Avatar className="h-16 w-16  rounded-full overflow-hidden">
              {selectedChatData.profileImage ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.profileImage}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-16 w-16 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(
                    selectedChatData.firstName
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName}  ${selectedChatData.lastName}`
              : `${selectedChatData.email}`}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-100 transition-all  cursor-pointer"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
