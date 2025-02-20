import api from "@/lib/AxiosInterceptors";

export const login = async (email: any, pw: any) => {
  try {
    const res = await api.post("/auth/login", { email: email, password: pw }, { withCredentials: true });

    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Login Failed";
  }
};

export const getUserData = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.get("/employee/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response) {
      throw err.response?.data?.message || "Something wrong";
    }
  }
};
