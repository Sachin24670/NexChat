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
  const [isSaving, setIsSaving] = useState(false);
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
    if (isSaving) return;
    if (validateProfile()) {
      setIsSaving(true);
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
      } catch (error) {
        toast.error("Failed to update profile");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please Setup the Profile");
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
    <div className="min-h-screen bg-[#0b0d14] flex items-center justify-center flex-col gap-8 p-4 sm:p-8">
      <div className="flex flex-col gap-8 w-full max-w-[600px]">
        <div>
          <IoArrowBack
            className="text-3xl lg:text-4xl text-gray-300 cursor-pointer hover:text-[#818cf8] transition-colors duration-200"
            onClick={handleNavigate}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="flex justify-center">
              <div
                className="h-32 w-32 md:w-40 md:h-40 relative flex items-center justify-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Avatar className="h-32 w-32 md:w-40 md:h-40 rounded-full overflow-hidden">
                  {profileImage ? (
                    <AvatarImage
                      src={profileImage}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase h-32 w-32 md:w-40 md:h-40 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(
                        firstName
                      )}`}
                    >
                      {profileInitial}
                    </div>
                  )}
                </Avatar>
                {hovered && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer transition-all duration-200"
                    onClick={
                      profileImage ? handleDeleteImage : handleFileInputClick
                    }
                  >
                    {profileImage ? (
                      <FaTrash className="text-white text-2xl cursor-pointer" />
                    ) : (
                      <FaPlus className="text-white text-2xl cursor-pointer" />
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
            </div>
            <div className="flex flex-col gap-4 text-gray-100 items-center justify-center">
              <div className="w-full">
                <Input
                  placeholder="Email"
                  type="email"
                  disabled
                  value={userInfo.email || ""}
                  className="rounded-lg p-3 border-[#262a40] bg-[#1a1d2e] text-gray-400 placeholder:text-gray-500"
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  className="rounded-lg p-3 border-[#262a40] bg-[#1a1d2e] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  className="rounded-lg p-3 border-[#262a40] bg-[#1a1d2e] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <Button
              className="h-11 w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={saveChanges}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
