import { useAppstore } from '@/store'
import React from 'react'

const Profile = () => {
  const {userInfo} = useAppstore()
  return (
    <div>
      Profile:
      email:{userInfo.email}
    </div>
  )
}

export default Profile
