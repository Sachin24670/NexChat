import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { useAppstore } from "@/store";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppstore();
  return (
    <div className="h-[10vh] border-b border-[#1e1e2a] flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-10 h-10 md:w-14 md:h-14 relative flex-shrink-0">
            <Avatar className="h-10 w-10 md:h-14 md:w-14 rounded-full overflow-hidden">
              {selectedChatData.profileImage ? (
                <AvatarImage
                  src={selectedChatData.profileImage}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-10 w-10 md:h-14 md:w-14 text-xl md:text-3xl border-[2px] flex justify-center items-center rounded-full ${getColor(
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
          <div className="text-gray-100 text-sm md:text-base font-medium truncate">
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName}  ${selectedChatData.lastName}`
              : `${selectedChatData.email}`}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            className="text-gray-500 focus:border-none focus:outline-none hover:text-gray-200 duration-200 transition-all cursor-pointer p-2 rounded-lg hover:bg-[#1a1a24]"
            onClick={closeChat}
          >
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
