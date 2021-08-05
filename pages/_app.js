import "../styles/globals.css";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { CookiesProvider } from "react-cookie";
// import Cookie from "js-cookie";
// import { parseCookies } from "../helpers";
import AuthorizedRoute from "../components/AuthorizedRoute";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}

function MyApp({
  Component,
  pageProps,
  // initialUsernameValue,
  // initialTokenValue,
  // initialShowMenuValue,
}) {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const router = useRouter();
  const protectedRoutes = ["/dashboard"];

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setShowMenu(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  // useEffect(() => {
  //   Cookie.set("pv-username", username);
  // }, [username]);

  // useEffect(() => {
  //   Cookie.set("pv-token", token);
  // }, [token]);

  // useEffect(() => {
  //   Cookie.set("pv-showMenu", showMenu);
  // }, [showMenu]);

  return (
    <CookiesProvider>
      <AppContext.Provider
        value={{
          showMenu,
          setShowMenu,
          username,
          setUsername,
          token,
          setToken,
          updateCount,
          setUpdateCount,
        }}
      >
        <AuthorizedRoute protectedRoutes={protectedRoutes}>
          <ThemeProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthorizedRoute>
      </AppContext.Provider>
    </CookiesProvider>
  );
}

export default MyApp;
