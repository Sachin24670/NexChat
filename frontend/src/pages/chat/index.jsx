import { useAppstore } from "@/store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactConatiner from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";
import BottomNavbar from "./components/bottom-navbar";
import { Logo } from "./components/contact-container";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api.client";
import { HOST, SEARCH_CONTACTS } from "@/lib/constants";
import Lottie from "lottie-react";
import Loader from "@/assets/Loader.json";

const MobileContent = () => {
  const {
    activeMobileTab,
    setSelectedChatType,
    setSelectedChatData,
  } = useAppstore();
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACTS,
          { searchTerm },
          { withCredentials: true },
        );
        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const selectContact = (contact) => {
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <div className="flex flex-col h-full md:hidden bg-[#0e0e14]">
      <div className="pt-3">
        <Logo />
      </div>

      {activeMobileTab === "chats" && (
        <div className="flex-1 flex flex-col px-4">
          <Input
            placeholder="Search Contacts"
            className="rounded-lg p-6 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
            onChange={(e) => searchContacts(e.target.value)}
          />
          {searchedContacts.length > 0 ? (
            <ScrollArea className="flex-1 mt-4">
              <div className="flex flex-col gap-2">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer hover:bg-[#1a1a24] p-3 rounded-lg transition-colors duration-200"
                    onClick={() => selectContact(contact)}
                  >
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.profileImage ? (
                          <AvatarImage
                            src={contact.profileImage}
                            alt="profile"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12 text-2xl border-[2px] flex justify-center items-center rounded-full ${getColor(
                              contact.firstName,
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split("").shift()
                              : contact.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-100 text-sm font-medium truncate">
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : ""}
                      </span>
                      <span className="text-gray-500 text-xs truncate">
                        {contact.email}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <Lottie
                animationData={Loader}
                loop={true}
                style={{ width: 150, height: 150 }}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                  clearCanvas: true,
                  progressiveLoad: false,
                  hideOnTransparent: true,
                }}
              />
              <div className="text-opacity-80 text-gray-300 flex flex-col gap-3 items-center mt-5 text-lg text-center">
                <h3 className="poppins-medium">
                  Search for a<span className="text-[#a78bfa]"> Contact </span>
                  to start chatting
                </h3>
              </div>
            </div>
          )}
        </div>
      )}

      {activeMobileTab === "channels" && (
        <div className="flex-1 flex flex-col px-4">
          <div className="flex-1 flex flex-col justify-center items-center">
            <Lottie
              animationData={Loader}
              loop={true}
              style={{ width: 150, height: 150 }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
                clearCanvas: true,
                progressiveLoad: false,
                hideOnTransparent: true,
              }}
            />
            <div className="text-opacity-80 text-gray-300 flex flex-col gap-3 items-center mt-5 text-lg text-center">
              <h3 className="poppins-medium">
                <span className="text-[#a78bfa]">Channels </span>
                coming soon
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
      {/* Desktop sidebar - hidden on mobile */}
      <div
        className={`${
          selectedChatType !== undefined ? "hidden md:block" : "hidden md:block"
        }`}
      >
        <ContactConatiner />
      </div>

      {/* Mobile content area - shown on mobile when no chat selected */}
      {selectedChatType === undefined && (
        <div className="flex-1 md:hidden pb-16">
          <MobileContent />
        </div>
      )}

      {/* Desktop empty state */}
      {selectedChatType === undefined && <EmptyChatContainer />}

      {/* Chat container - both mobile and desktop */}
      {selectedChatType !== undefined && <ChatContainer />}

      {/* Mobile bottom navbar */}
      <BottomNavbar />
    </div>
  );
};

export default Chat;
