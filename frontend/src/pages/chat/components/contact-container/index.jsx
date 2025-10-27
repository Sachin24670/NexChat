
// export const Logo = () => {
//   return (
//     <div className="flex p-5 justify-start items-center gap-3">
//       <svg
//         width="56"
//         height="56"
//         viewBox="0 0 100 100"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* Chat bubble background */}
//         <path
//           d="M20 20C20 12.268 26.268 6 34 6H66C73.732 6 80 12.268 80 20V58C80 65.732 73.732 72 66 72H50L35 88L36 72H34C26.268 72 20 65.732 20 58V20Z"
//           fill="url(#paint0_linear)"
//         />

//         {/* Three chat dots */}
//         <circle cx="40" cy="45" r="5" fill="white" />
//         <circle cx="52" cy="45" r="5" fill="white" />
//         <circle cx="64" cy="45" r="5" fill="white" />

//         {/* Gradient definition */}
//         <defs>
//           <linearGradient
//             id="paint0_linear"
//             x1="20"
//             y1="6"
//             x2="80"
//             y2="88"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#00B4D8" />
//             <stop offset="1" stopColor="#0077B6" />
//           </linearGradient>
//         </defs>
//       </svg>

//       <span className="text-4xl font-semibold text-[#0077B6] tracking-tight">
//         NexChat
//       </span>
//     </div>
//   );
// };

export const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-3">
      <svg
        width="56"
        height="56"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chat bubble background */}
        <path
          d="M20 20C20 12.268 26.268 6 34 6H66C73.732 6 80 12.268 80 20V58C80 65.732 73.732 72 66 72H50L35 88L36 72H34C26.268 72 20 65.732 20 58V20Z"
          fill="url(#paint0_linear)"
        />

        {/* Three chat dots */}
        <circle cx="40" cy="45" r="4" fill="white" />
        <circle cx="50" cy="45" r="4" fill="white" />
        <circle cx="60" cy="45" r="4" fill="white" />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="20"
            y1="6"
            x2="80"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00B4D8" /> {/* Vibrant Teal */}
            <stop offset="1" stopColor="#0077B6" /> {/* Deep Blue */}
          </linearGradient>
        </defs>
      </svg>

      <span className="text-4xl font-bold text-[#0077B6] tracking-tight">
        NexChat
      </span>
    </div>
  );
};



const Title = ({text})=>{
  return(
    <h6 className="uppercase tracking-widest text-neutral-400 text-opacity-90 font-light pl-10 text-small">
      {text}
      </h6>
  )
}

const ContactContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[32vw] xl:w-[20vw] bg-neutral-800 border-r-2 border-gray-400 p-4 ">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
