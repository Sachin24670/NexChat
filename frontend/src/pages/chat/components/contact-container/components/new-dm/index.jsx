import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppstore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACTS,
          { searchTerm },
          { withCredentials: true }
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
      <Tooltip>
        <TooltipTrigger>
          <FaPlus
            className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            onClick={() => setOpenNewContactModel(true)}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-[#1c1b1a] border-none mb-2 p-3 text-white">
          <p>Select New Contact</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="mx-auto">Please Select Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchContacts.length > 0 && (
            <ScrollArea className="h-[250px] ">
              <div className="flex flex-col gap-5 ">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-16 h-16 relative">
                      <Avatar className="h-16 w-16  rounded-full overflow-hidden">
                        {contact.profileImage ? (
                          <AvatarImage
                            src={`${HOST}/${contact.profileImage}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-16 w-16 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(
                              contact.firstName
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split("").shift()
                              : contact.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col ">
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : ""}
                      <span>
                        <span className="text-xs">{contact.email}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all rounded-md">
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
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-xl text-3xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">! </span>
                  Search New
                  <span className="text-purple-500"> Contact. </span>
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
