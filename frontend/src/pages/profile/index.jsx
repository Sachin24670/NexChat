import { useAppstore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
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
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center flex-col gap-8 p-4 sm:p-8">
      <div className="flex flex-col gap-6 w-full max-w-[700px]">
        <div className="flex items-center gap-4">
          <button
            onClick={handleNavigate}
            className="p-2 rounded-lg hover:bg-[#1a1a24] text-gray-400 hover:text-[#a78bfa] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-100">Edit Profile</h1>
        </div>

        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(124,58,237,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <div
                className="h-36 w-36 md:w-44 md:h-44 relative flex items-center justify-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Avatar className="h-36 w-36 md:w-44 md:h-44 rounded-full overflow-hidden">
                  {profileImage ? (
                    <AvatarImage
                      src={profileImage}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase h-36 w-36 md:w-44 md:h-44 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(
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
                      <Trash2 className="text-white w-6 h-6" />
                    ) : (
                      <Plus className="text-white w-6 h-6" />
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
            <div className="flex flex-col gap-5 text-gray-100 justify-center">
              <div className="w-full">
                <label className="text-xs text-gray-500 mb-1.5 block pl-1">Email</label>
                <Input
                  placeholder="Email"
                  type="email"
                  disabled
                  value={userInfo.email || ""}
                  className="rounded-lg p-3 border-[#2a2a3a] bg-[#1a1a24] text-gray-400 placeholder:text-gray-600"
                />
              </div>
              <div className="w-full">
                <label className="text-xs text-gray-500 mb-1.5 block pl-1">First Name</label>
                <Input
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  className="rounded-lg p-3 border-[#2a2a3a] bg-[#1a1a24] text-gray-100 placeholder:text-gray-600 focus:border-[#a78bfa]"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="text-xs text-gray-500 mb-1.5 block pl-1">Last Name</label>
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  className="rounded-lg p-3 border-[#2a2a3a] bg-[#1a1a24] text-gray-100 placeholder:text-gray-600 focus:border-[#a78bfa]"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-8">
            <Button
              className="h-11 w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
