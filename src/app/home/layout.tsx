"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Setting from "@/components/Setting";
import Logout from "@/components/Logout";
import Navigation from "@/components/NavigationHome";
import { BottomNav } from "@/components/NavigationHome";
import { useState } from "react";
import { getUserData } from "@/services/api";
import { toast } from "react-toastify";
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [openNav, setOpenNav] = useState(false);
  const [name, setName] = useState("");
  const [leaveNow, setLeaveNow] = useState(0);
  const [leaveThen, setLeaveThen] = useState(0);
  const [leaveAmountCount, setLeaveAmountCount] = useState(0);
  const getUser = async () => {
    try {
      const userData = await getUserData();
      setName(userData.data.name);
      setLeaveNow(userData.data.amountOfLeave[0].amount);
      setLeaveThen(userData.data.amountOfLeave[1].amount);

      setLeaveAmountCount(userData.data.amountOfLeave.length);

      localStorage.setItem("nik", userData.data.employee.nik);
    } catch (err) {
      toast.error(err);
    }
  };

  getUser();

  return (
    <div>
      <div>
        <div className="flex justify-between p-4 items-center ">
          <Image src="/logo_vimarcha.png" width={130} height={130} alt="logo" />

          <div className="md:hidden">
            <button onClick={() => setOpenNav(!openNav)}>
              <Icon icon={openNav ? "mdi:close" : "mdi:menu"} width={24} height={24} />
            </button>
          </div>

          <div className="md:flex hid">
            <button className="flex items-start w-full md:w-fit hover:bg-gray-100 p-4 transition-all duration-200">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:view-dashboard-outline" width={24} height={24} />
                <p className="capitalize">Admin Side</p>
              </div>
            </button>
            <Setting />
            <Logout />
          </div>
        </div>

        {openNav && (
          <div className="transition-all absolute w-full">
            <div className="w-full bg-white h-[150px">
              <button className="flex items-start w-full md:w-fit hover:bg-gray-100 p-4">
                <div className="flex items-center gap-4">
                  <Icon icon="mdi:view-dashboard-outline" width={24} height={24} />
                  <p className="capitalize">Admin Side</p>
                </div>
              </button>
              <Setting />
              <Logout />
            </div>
          </div>
        )}
      </div>

      <div className="md:flex md:justify-between md:gap-4 md:flex-row  px-4 max-w-full">
        <div className={`flex flex-col items-center ${leaveAmountCount === 1 ? "justify-start" : ""}`}>
          <h1 className="md:text-3xl text-2xl font-bold text-center">Welcome, {name || "User"}</h1>

          <div className="flex md:flex-col w-full items-center justify-center gap-4">
            <div className={`bg-[#EBF9F1] h-[184px] md:p-0 p-4 rounded-2xl flex flex-col items-center justify-center ${leaveAmountCount === 1 ? `w-full` : `w-[45%] md:w-[366px]`} `}>
              <h1 className="text-center font-bold md:text-5xl text-3xl">{leaveNow || 0}</h1>
              <p className="text-center text-sm md:text-base">Is your remaining leave</p>
            </div>
            <div className="bg-[#624de3] h-[184px] md:p-0 p-4 rounded-2xl flex flex-col items-center justify-center w-[45%] md:w-[366px] text-white">
              <h1 className="text-center font-bold md:text-5xl text-3xl">{leaveThen || 0}</h1>
              <p className="text-center text-sm md:text-base">
                Is your remaining leave from
                <span className="underline"> last year</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full bg-orange-200 text-black font-bold px-4">
            <h3>Password has not been change, change it now.</h3>
          </div>

          <Navigation />

          {children}
        </div>
      </div>

      <div className="bg-white text-black md:hidden absolute bottom-0 w-full">
        <BottomNav />
      </div>
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
