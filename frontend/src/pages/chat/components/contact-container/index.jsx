import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";

export const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-3">
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20C20 12.268 26.268 6 34 6H66C73.732 6 80 12.268 80 20V58C80 65.732 73.732 72 66 72H50L35 88L36 72H34C26.268 72 20 65.732 20 58V20Z"
          fill="url(#paint0_linear)"
        />
        <circle cx="40" cy="45" r="4" fill="white" />
        <circle cx="50" cy="45" r="4" fill="white" />
        <circle cx="60" cy="45" r="4" fill="white" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="20"
            y1="6"
            x2="80"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#818cf8" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      <span className="text-3xl font-bold text-[#818cf8] tracking-tight">
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
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#0f1119] border-r border-[#1e2240] h-[100vh]">
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
