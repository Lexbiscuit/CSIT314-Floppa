import axios from "axios";

const login = (credentials: { email: string; password: string }) => {
  return axios.post("http://localhost:3000/auth/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
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
