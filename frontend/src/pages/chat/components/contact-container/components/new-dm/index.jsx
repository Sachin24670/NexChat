import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import Loader from "@/assets/Loader.json";
import { apiClient } from "@/lib/api.client";
import { HOST, SEARCH_CONTACTS } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getColor } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppstore } from "@/store";

const NewDM = ({ collapsed }) => {
  const { setSelectedChatType, setSelectedChatData } = useAppstore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
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

  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };
  return (
    <>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-200"
              onClick={() => setOpenNewContactModel(true)}
            >
              <Plus className="w-5 h-5 text-white" />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200"
          >
            <p>New Message</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <Plus
              className="w-4 h-4 text-gray-500 hover:text-[#a78bfa] cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1a1a24] border border-[#2a2a3a] mb-2 p-3 text-gray-200">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#111118] border border-[#1e1e2a] text-gray-100 w-[90vw] max-w-[400px] h-[400px] flex flex-col rounded-xl">
          <DialogHeader>
            <DialogTitle className="mx-auto text-gray-100">
              Please Select Contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer hover:bg-[#1a1a24] p-2 rounded-lg transition-colors duration-200"
                    onClick={() => selectNewContact(contact)}
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
          )}
          {searchedContacts.length <= 0 && (
            <div className="flex-1 bg-[#09090b] flex flex-col justify-center items-center duration-1000 transition-all rounded-lg">
              <Lottie
                animationData={Loader}
                loop={true}
                style={{ width: 120, height: 120 }}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                  clearCanvas: true,
                  progressiveLoad: false,
                  hideOnTransparent: true,
                }}
              />
              <div className="text-opacity-80 text-gray-300 flex flex-col gap-3 items-center mt-3 text-lg transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-[#a78bfa]">! </span>
                  Search New
                  <span className="text-[#a78bfa]"> Contact. </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
