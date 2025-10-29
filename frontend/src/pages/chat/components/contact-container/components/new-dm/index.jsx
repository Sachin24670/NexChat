import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {FaPlus} from "react-icons/fa"
import {useState} from "react"
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

const NewDM = () => {

  const [openNewContactModel, setOpenNewContactModel] = useState(false)
  const [searchedContacts, setSearchedContacts] = useState([])

  const searchContacts = async(search_term)=>{

  }
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
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all rounded-md">
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
}

export default NewDM
