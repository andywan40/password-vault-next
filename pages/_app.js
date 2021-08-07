import "../styles/globals.css";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { CookiesProvider, useCookies } from "react-cookie";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthorizedRoute from "../components/AuthorizedRoute";
import theme from "../helpers/theme";

const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}

function MyApp({ Component, pageProps }) {
  const [cookie] = useCookies(["token", "username"]);
  const [username, setUsername] = useState(cookie["username"] || null);
  const [token, setToken] = useState(cookie["token"] || null);
  const [showMenu, setShowMenu] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [passwords, setPasswords] = useState([]);
  const [type, setType] = useState("all");
  const [checkedIds, setCheckedIds] = useState([]);
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
          passwords,
          setPasswords,
          type,
          setType,
          checkedIds,
          setCheckedIds,
        }}
      >
        <AuthorizedRoute protectedRoutes={protectedRoutes}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthorizedRoute>
      </AppContext.Provider>
    </CookiesProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({ req, res }) => {
  const isServer = !!req;
  const isBrowser = !req;
  let data = {};
  if (isServer) {
  } else if (isBrowser) {
  }

  return {
    data: {},
  };
};
