import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/gradient-loader.json";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#22c55e2a] text-[#22c55e] border-[1px] border-[#22c55ebb]",
  "bg-[#a78bfa2a] text-[#a78bfa] border-[1px] border-[#a78bfabb]",
];



export const getNameIndex = (name) => {
  if (!name) return 0;
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return sum % colors.length;
};

export const getColor = (name) => {
  const index = getNameIndex(name);
  return colors[index] || colors[0]; // fallback
};

export const animationDefaultOptions ={
  loop:true,
  autoplay:true,
  animationData
}