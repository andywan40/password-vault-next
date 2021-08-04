import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../pages/_app";
//import { useAuth } from '@/contexts/auth';
import Loader from "./Loader";

export default function AuthorizedRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { token, username } = useAppContext();
  //const { isAuthenticated, isLoading } = useAuth();
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if ((!token || !username) && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/login");
    }
  }, [token, username, pathIsProtected]);

  if ((!token || !username) && pathIsProtected) {
    return <Loader />;
  }

  return children;
}
