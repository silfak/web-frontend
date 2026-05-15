import { createContext, useContext, useState } from "react";
import api from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
  try {
    const saved = localStorage.getItem("user");
    return saved && saved !== "undefined" ? JSON.parse(saved) : null;
  } catch {
    localStorage.removeItem("user");
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
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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