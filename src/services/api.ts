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

export const getTableHome = async (page: number, perPage: number) => {
  // const perPage = window.innerWidth >= 768 ? 8 : 5;

  try {
    const res = await api.get(`/leave/history/self?page=${page}&perPage=${perPage}`);

    return res.data;
  } catch (err) {
    if (err.response) {
      throw err.response?.data?.message || "Something wrong";
    }
  }
};

export const getTableHomeSpecial = async (page: number, perPage: number) => {
  try {
    const res = await api.get(`leave/employee-special-leave/history/me?page=${page}&perPage=${perPage}`);

    return res.data;
  } catch (err) {
    if (err.response) {
      throw err.response?.data?.message || "Something wrong";
    }
  }
};

export const getMandatoryLeave = async (page: number) => {
  try {
    const res = await api.get(`/leave/mandatory?page=${page}&perPage=10`);

    return res.data;
  } catch (err) {
    if (err.response) {
      throw err.response?.data?.message || "Something wrong";
    }
  }
};

export const getOptionalLeave = async (page: number) => {
  try {
    const res = await api.get(`/leave/optional?page=${page}&perPage=10`);

    return res.data;
  } catch (err) {
    if (err.response) {
      throw err.response?.data?.message || "Something wrong";
    }
  }
};
