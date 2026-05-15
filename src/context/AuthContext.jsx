import { createContext, useContext, useState } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = Cookies.get("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      Cookies.remove("user");
      return null;
    }
  });

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { data } = res.data;

    const token = data;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = {
      id: payload.id,
      role: payload.role.name.toLowerCase(),
    };

    setUser(user);
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
    Cookies.set("token", token, { expires: 7 });
    return { user, token };
  };

  const register = async (form) => {
    const res = await api.post("/api/auth/register", {
      name: form.name,
      email: form.email,
      nim: form.nim,
      password: form.password,
      passwordConfirmation: form.passwordConfirmation,
    });
    return res.data;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}