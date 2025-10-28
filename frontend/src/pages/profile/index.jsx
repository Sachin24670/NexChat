import { useAppstore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api.client";
import {
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/lib/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo = {}, setUserInfo } = useAppstore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileInitial, setProfileInitial] = useState("?");
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.profileImage) {
      setProfileImage(`${HOST}/${userInfo.profileImage}`);
    } else {
      setProfileImage(null);
    }
  }, [userInfo.profileImage]);

  useEffect(() => {
    if (firstName && firstName.length > 0) {
      setProfileInitial(firstName.charAt(0).toUpperCase());
    } else if (userInfo.email && userInfo.email.length > 0) {
      setProfileInitial(userInfo.email.charAt(0).toUpperCase());
    } else {
      setProfileInitial("?");
    }
  }, [firstName, userInfo.email]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile Updated Successfully");
          navigate("/chat");
        }
      } catch (error) {}
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("PLease Setup the Profile");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(
        UPDATE_PROFILE_IMAGE_ROUTE,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.profileImage) {
        setUserInfo({ ...userInfo, profileImage: response.data.profileImage });
        setProfileImage(`${HOST}/${response.data.profileImage}`);
        toast.success("Image Updated Successfully");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, profileImage: null });
        setProfileImage(null);
        toast.success("Image Removed Successfully");
      }
    } catch (error) {}
  };

  return (
    <div className="h-[100vh] bg-zinc-800 flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={handleNavigate}
          />
          <div className="grid grid-cols-2">
            <div
              className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                {profileImage ? (
                  <AvatarImage
                    src={profileImage}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(
                      firstName
                    )}`}
                  >
                    {profileInitial}
                  </div>
                )}
              </Avatar>
              {hovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full cursor-pointer"
                  onClick={
                    profileImage ? handleDeleteImage : handleFileInputClick
                  }
                >
                  {profileImage ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                name="profile-image"
                accept=".png, .jpg, .jpeg, .svg, .webp"
              />
            </div>
            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <Input
                  placeholder="Email"
                  type="email"
                  disabled
                  value={userInfo.email || ""}
                  className="rounded-lg p-3 border-none bg-gray-500/60 text-white"
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  className="rounded-lg p-3 border-none bg-gray-500/60 text-white"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  className="rounded-lg p-3 border-none bg-gray-500/60 text-white"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              className="mt-5 h-11 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={saveChanges}
            >
              Save Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
