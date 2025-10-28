import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST, LOGOUT_ROUTE } from "@/lib/constants";
import { useAppstore } from "@/store";
import { getColor } from "@/lib/utils";
import { Tooltip,TooltipContent,TooltipTrigger } from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import {IoPowerSharp} from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api.client";
import { toast } from "sonner";


const ProfileInfo = () => {
  // const userInfo = useAppstore((state) => state.userInfo);
  const {userInfo, setUserInfo} = useAppstore()
  const Navigate = useNavigate()

  const logOut = async ()=>{
    try {
      const res = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
      console.log(res)
      if(res.status===200){
        toast.success("Logout SuccessFull")
        Navigate("/auth")
        setUserInfo(null)
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="absolute bottom-0 h-20 flex items-center justify-between w-full bg-[#2a2b33] px-10">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-16 h-16 relative">
          <Avatar className="h-16 w-16  rounded-full overflow-hidden">
            {userInfo.profileImage ? (
              <AvatarImage
                src={`${HOST}/${userInfo.profileImage}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-16 w-16 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(
                  userInfo.firstName
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5 ">
        <Tooltip>
          <TooltipTrigger>
            <FiEdit2
              className="text-purple-400 text-xl font-medium"
              onClick={() => Navigate("/profile")}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white">
            <p>Edit Profile</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <IoPowerSharp
              className="text-red-400 text-xl font-medium"
              onClick={logOut}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default ProfileInfo
