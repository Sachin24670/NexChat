import { useAppstore } from '@/store'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {IoArrowBack} from "react-icons/io5"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import  {getColor } from '@/lib/utils'
import {FaPlus, FaTrash} from "react-icons/fa"
import { Input } from '@/components/ui/input'

const Profile = () => {
  const navigate = useNavigate()
  const {userInfo,setUserInfo} = useAppstore()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)

  const saveChanges = async()=>{}

  return (
    <div className="h-[100vh] bg-zinc-800 flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
          <div className="grid grid-cols-2">
            <div
              className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
              }}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden"> 
                {image ? (
                  <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black"  />
                ) : (
                  <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[3px] flex justify-center items-center rounded-full ${getColor(userInfo.firstName)}`}>
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo.email.split("").shift()}
                  </div>
                )}
              </Avatar>{
                hovered && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full cursor-pointer">
                    {
                      image? (<faTrash className="text-white text-3xl cursor-pointer" /> ): (<FaPlus className="text-white text-3xl cursor-pointer" />)
                    }

                  </div>
                )
              }
              {/* <input type="text" /> */}
            </div>
            <div className="flex min-w-32 md:min-win-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-3 border-none bg-gray-500/60 text-white" ></Input> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
