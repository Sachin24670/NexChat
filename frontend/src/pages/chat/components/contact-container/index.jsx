import { MessageCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { useAppstore } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Logo = ({ collapsed }) => {
  return (
    <div
      className={`flex p-5 items-center gap-3 ${
        collapsed ? "justify-center" : "justify-start"
      }`}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      {!collapsed && (
        <span className="text-3xl font-bold text-[#a78bfa] tracking-tight">
          NexChat
        </span>
      )}
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
  const { sidebarCollapsed, setSidebarCollapsed } = useAppstore();

  return (
    <div
      className={`relative hidden md:block bg-[#0e0e14] border-r border-[#1e1e2a] h-[100vh] transition-all duration-300 ${
        sidebarCollapsed ? "w-[68px]" : "md:w-[35vw] lg:w-[30vw] xl:w-[20vw]"
      }`}
    >
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <Logo collapsed={sidebarCollapsed} />
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="text-gray-500 hover:text-[#a78bfa] cursor-pointer transition-colors duration-200 mr-3 flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>
        {sidebarCollapsed && (
          <div className="flex justify-center pb-2">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="text-gray-500 hover:text-[#a78bfa] cursor-pointer transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {sidebarCollapsed ? (
        <div className="flex flex-col items-center gap-6 mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 rounded-lg bg-[#1a1a24] flex items-center justify-center cursor-pointer hover:bg-[#252532] transition-colors duration-200">
                <MessageCircle className="w-5 h-5 text-[#a78bfa]" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200"
            >
              <p>Direct Messages</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 rounded-lg bg-[#1a1a24] flex items-center justify-center cursor-pointer hover:bg-[#252532] transition-colors duration-200">
                <Users className="w-5 h-5 text-gray-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-[#1a1a24] border border-[#2a2a3a] text-gray-200"
            >
              <p>Channels</p>
            </TooltipContent>
          </Tooltip>

          <NewDM collapsed />
        </div>
      ) : (
        <>
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
        </>
      )}

      <ProfileInfo collapsed={sidebarCollapsed} />
    </div>
  );
};

export default ContactContainer;
