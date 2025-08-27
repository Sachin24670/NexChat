import { useAppstore } from '@/store'
import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Chat = () => {
  const { userInfo}= useAppstore()
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast("Please setup Profile to continue");
      navigate("/profile");
    }

  }, [userInfo,navigate])
  

  return (
    <div>
      Chat
    </div>
  )
}

export default Chat
