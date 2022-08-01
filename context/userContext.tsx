import React from "react";
import { User } from "@typesData/user";
import { json } from "stream/consumers";

type Props = {
  children: React.ReactNode;
};

type UserCTXType = {
  getUser: () => User | null;
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

const UserContext = React.createContext<UserCTXType | null>(null);

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);

  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else return null;
  };

  const loginUser = (user: User) => {
    const newUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    setUser(newUser);
    localStorage.setItem(
      "user",
      JSON.stringify({ id: user.id, name: user.name, email: user.email })
    );
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const memoedValue = React.useMemo(
    () => ({
      getUser,
      user,
      loginUser,
      logoutUser,
    }),
    [user]
  );
  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
