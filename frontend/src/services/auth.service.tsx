import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

const login = async (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  if (localStorage.getItem("user") === null) {
    return null;
  }

  return JSON.parse(localStorage.getItem("user")!);
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
