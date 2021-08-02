import "../styles/globals.css";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setShowMenu(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ showMenu, setShowMenu, username, setUsername, token, setToken }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
