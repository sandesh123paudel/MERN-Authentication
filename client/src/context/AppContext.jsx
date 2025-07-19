import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backEndUrl = import.meta.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const value = {
    backEndUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
