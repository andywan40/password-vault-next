import { createContext, useState, useContext } from "react";
const AppContext = createContext();

export function AppWrapper({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <AppContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
