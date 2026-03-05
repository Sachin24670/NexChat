import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST, LOGOUT_ROUTE } from "@/lib/constants";
import { useAppstore } from "@/store";
import { getColor } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api.client";
import { toast } from "sonner";
import { useState } from "react";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppstore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logOut = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const res = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Logout Successful");
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="absolute bottom-0 h-20 flex items-center justify-between w-full bg-[#12141c] border-t border-[#1e2030] px-5 md:px-8">
      <div className="flex gap-3 items-center justify-center min-w-0">
        <div className="w-12 h-12 relative flex-shrink-0">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.profileImage ? (
              <AvatarImage
                src={`${HOST}/${userInfo.profileImage}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-2xl border-[2px] flex justify-center items-center rounded-full ${getColor(
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
        <div className="text-gray-200 text-sm font-medium truncate">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-4 flex-shrink-0">
        <Tooltip>
          <TooltipTrigger>
            <FiEdit2
              className="text-[#00B4D8] text-lg font-medium cursor-pointer hover:text-[#0077B6] transition-colors duration-200"
              onClick={() => navigate("/profile")}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1a1c28] border border-[#2a2d3a] text-gray-200">
            <p>Edit Profile</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <IoPowerSharp
              className={`text-lg font-medium transition-colors duration-200 ${
                isLoggingOut
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-red-400 cursor-pointer hover:text-red-300"
              }`}
              onClick={logOut}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1a1c28] border border-[#2a2d3a] text-gray-200">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProfileInfo;
