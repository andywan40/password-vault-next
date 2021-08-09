import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "../pages/_app";
import { useCookies } from "react-cookie";
import axios from "axios";
export default function Menu() {
  const router = useRouter();
  const { pathname } = router;
  const { username, setUsername, token, setToken } = useAppContext();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(
        "https://password-vault-django.herokuapp.com/api/accounts/logout/",
        {},
        {
          headers,
        }
      )
      .then(res => {
        console.log(res);
        removeCookie("token");
        removeCookie("username");
        setUsername(null);
        setToken(null);
        router.push("/login");
      })
      .catch(e => {
        console.log(e);
        alert("something went wrong. try again later");
      });
  };
  return (
    <nav className="h-screen bg-black flex flex-col justify-center items-start title-font font-medium sm:text-2xl text-3xl tracking-widest p-10">
      {!username || !token ? (
        <>
          <Link href="/login">
            <a
              className={
                pathname === "/login"
                  ? "mr-5 text-white uppercase active-white"
                  : "mr-5 text-white uppercase strike-white"
              }
            >
              Log In
            </a>
          </Link>
          <Link href="/signup">
            <a
              className={
                pathname === "/signup"
                  ? "mr-5 text-white uppercase active-white"
                  : "mr-5 text-white uppercase strike-white"
              }
            >
              Sign Up
            </a>
          </Link>
        </>
      ) : (
        <>
          <p className="mr-5 text-white uppercase">{username}</p>
          <p
            className="mr-5 text-white uppercase strike-white cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </p>
        </>
      )}
    </nav>
  );
}
