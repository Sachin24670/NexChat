import { MessageCircle } from "lucide-react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";

export const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center">
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      <span className="text-3xl font-bold text-[#a78bfa] tracking-tight">
        NexChat
      </span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-gray-500 text-opacity-90 font-light pl-10 text-xs">
      {text}
    </h6>
  );
};

const ContactContainer = () => {
  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#0e0e14] border-r border-[#1e1e2a] h-[100vh]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;
