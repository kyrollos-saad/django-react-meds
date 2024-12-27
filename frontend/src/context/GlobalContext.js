import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [user, setUserSuper] = useState(null);

  const redirectIfNoUser = () => {
    // go to /login if user is empty and current path is neither /login nor /register
    if (
      !user &&
      !window.location.href.endsWith("/login") &&
      !window.location.href.endsWith("/register")
    ) {
      window.location.href = "/login";
    }
  };

  const setUser = (userData) => {
    try {
      // set user and token in local storage because plain JS files cannot access the global store also used to init the global store
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
    } catch (err) {}
    setUserSuper(userData);
    if (!userData) {
      redirectIfNoUser();
    }
  };

  useEffect(() => {
    // init the user object of the global store on fresh start from the local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    if (!storedUser) {
      redirectIfNoUser();
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
