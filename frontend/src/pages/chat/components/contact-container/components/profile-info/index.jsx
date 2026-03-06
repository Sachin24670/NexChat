import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST, LOGOUT_ROUTE } from "@/lib/constants";
import { useAppstore } from "@/store";
import { getColor } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api.client";
import { toast } from "sonner";
import { useState } from "react";

const ProfileInfo = ({ collapsed }) => {
  const { userInfo, setUserInfo } = useAppstore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logOut = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const res = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true },
      );
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

  if (collapsed) {
    return (
      <div className="absolute bottom-0 w-full bg-[#111118] border-t border-[#1e1e2a] py-4 flex flex-col items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="w-10 h-10 relative flex-shrink-0 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {userInfo.profileImage ? (
                  <AvatarImage
                    src={userInfo.profileImage}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-10 w-10 text-lg border-[2px] flex justify-center items-center rounded-full ${getColor(
                      userInfo.firstName,
                    )}`}
                  >
                    {userInfo.firstName
                      ? userInfo.firstName.split("").shift()
                      : userInfo.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200"
          >
            <p>
              {userInfo.firstName
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : userInfo.email}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <LogOut
              className={`w-4 h-4 transition-colors duration-200 ${
                isLoggingOut
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-red-400 cursor-pointer hover:text-red-300"
              }`}
              onClick={logOut}
            />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200"
          >
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 h-20 flex items-center justify-between w-full bg-[#111118] border-t border-[#1e1e2a] px-5 md:px-8">
      <div className="flex gap-3 items-center justify-center min-w-0">
        <div className="w-12 h-12 relative flex-shrink-0">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.profileImage ? (
              <AvatarImage
                src={userInfo.profileImage}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-2xl border-[2px] flex justify-center items-center rounded-full ${getColor(
                  userInfo.firstName,
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
            <Pencil
              className="w-[18px] h-[18px] text-[#a78bfa] cursor-pointer hover:text-[#8b5cf6] transition-colors duration-200"
              onClick={() => navigate("/profile")}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200">
            <p>Edit Profile</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <LogOut
              className={`w-[18px] h-[18px] transition-colors duration-200 ${
                isLoggingOut
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-red-400 cursor-pointer hover:text-red-300"
              }`}
              onClick={logOut}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProfileInfo;
