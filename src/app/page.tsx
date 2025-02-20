"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "@/lib/AxiosInterceptors";
import Toast from "@/components/Toast";
import { Icon } from "@iconify/react";
import login from "@/services/api";
export default function Home() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await login(email, pw);
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.user.roleId);
      localStorage.setItem("firstLogin", res.data.user.isFirst);
      localStorage.setItem("nik", res.data.employee.nik);

      toast.success(res.message);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="flex justify-center gap-16 flex-col items-center text-center">
      <Image src="/logo_vimarcha.png" width={276} height={276} alt="logo" />

      <form onSubmit={handleLogin} className="flex flex-col gap-8 items-center">
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          className="md:w-80 w-60 drop-shadow-sm outline-none focus:bg-transparent active:bg-transparent border-2 p-4 rounded-3xl focus:border-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={pw}
            className="md:w-80 w-60 drop-shadow-sm outline-none focus:bg-transparent active:bg-transparent border-2 p-4 rounded-3xl focus:border-black"
            onChange={(e) => setPw(e.target.value)}
          />

          <Icon onClick={() => setShowPw(!showPw)} icon={showPw ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>

        <button className="px-[88px] py-2 w-60 text-2xl items-center font-bold bg-blue-700 text-white rounded-3xl" type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>

      <Toast />
    </div>
  );
}
