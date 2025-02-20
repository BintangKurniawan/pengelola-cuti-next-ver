import { usePathname } from "next/navigation";
const links = [
  {
    title: "History",
    link: "/home",
    access: "Get Leave History for Current User",
  },
  {
    title: "Special",
    link: "/home/special",
    access: "View Special Leave History",
  },
  {
    title: "Mandatory",
    link: "/home/mandatory",
    access: "View Mandatory Leave",
  },
  {
    title: "Optional",
    link: "/home/optional",
    access: "View Optional Leave",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="w-full hid border-b-2 md:flex items-center justify-center gap-4">
      {links.map((item) => (
        <div key={item.link} className="group relative transition-all">
          <span className={`h-[2px] inline-block absolute bg-blue-700 left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${pathname === item.link ? "w-full" : "w-0"}`}>&nbsp;</span>
          <a href={item.link} className={`${pathname === item.link ? "text-blue-700 font-semibold capitalize" : ""}`}>
            {item.title}
          </a>
        </div>
      ))}

      <style jsx>
        {`
          @media (max-width: 786px) {
            .hid {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center flex-row w-full px-4">
      {links.map((item) => (
        <div key={item.link} className={`relative group transition-all md:w-auto w-auto flex items-center gap-1 cursor-pointer pb-1 md:justify-start ${pathname === item.link ? "text-blue-700" : "text-black "}`}>
          <span className={`h-[2px] inline-block absolute bg-blue-700 left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${pathname === item.link ? "w-full" : "w-0"}`}>&nbsp;</span>
          <a href={item.link} className={`${pathname === item.link ? "text-blue-700 font-semibold " : ""} text-sm capitalize`}>
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
}
