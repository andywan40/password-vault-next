import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAppContext } from "../pages/_app";
import logo from "../public/logo.png";
import whiteLogo from "../public/white_logo.png";

export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;
  const [cookie, setCookie, removeCookie] = useCookies(["token", "username"]);
  const { showMenu, setShowMenu, username, setUsername, token, setToken } =
    useAppContext();
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
    <header
      className={
        showMenu
          ? "font-content bg-black sticky top-0 z-10 h-1/2"
          : "font-content bg-white sticky top-0 z-10 h-1/2"
      }
    >
      <div className="mx-auto p-5 flex justify-between items-start ">
        <Link
          href="/"
          className="title-font font-medium text-black mb-4 md:mb-0 logo"
        >
          <a>
            <Image
              className="logo absolute object-center cursor-pointer"
              src={showMenu ? whiteLogo : logo}
              alt="logo"
            />
          </a>
        </Link>{" "}
        <nav className="title-font font-bold text-sm tracking-wide flex justify-end items-center pt-5">
          {!showMenu && (
            <>
              {!username && (
                <Link href="/login">
                  <a
                    className={
                      pathname === "/login"
                        ? "md:hidden mr-5 text-black uppercase active"
                        : "md:hidden mr-5 text-black uppercase strike"
                    }
                  >
                    Log in
                  </a>
                </Link>
              )}
              {!username && (
                <Link href="/signup">
                  <a
                    className={
                      pathname === "/signup"
                        ? "md:hidden mr-5 text-black uppercase active"
                        : "md:hidden mr-5 text-black uppercase strike"
                    }
                  >
                    Sign up
                  </a>
                </Link>
              )}
              {username && (
                <p className="md:hidden mr-5 text-indigo-600 uppercase">
                  {username}
                </p>
              )}
              {username && (
                <p
                  className="md:hidden mr-5 text-black uppercase strike cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </p>
              )}
            </>
          )}
          {!showMenu ? (
            <MenuIcon
              onClick={() => setShowMenu(true)}
              className="hidden md:block mr-5 text-black h-1/12 w-1/12 cursor-pointer"
            />
          ) : (
            <XIcon
              onClick={() => setShowMenu(false)}
              className="block mr-5 text-white h-1/12 w-1/12 cursor-pointer motion-safe:animate-wiggle"
            />
          )}
        </nav>
      </div>
    </header>
  );
}
