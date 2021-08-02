import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useAppContext } from "../pages/_app";
import logo from "../public/logo_colored.png";
import whiteLogo from "../public/logo.png";

export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;
  const state = useAppContext();
  const { showMenu, setShowMenu } = state;
  return (
    <header
      className={
        showMenu
          ? "font-content bg-black sticky top-0 z-10"
          : "font-content bg-white sticky top-0 z-10"
      }
    >
      <div className="mx-auto p-2 flex justify-between items-start">
        <div className="title-font font-medium text-black mb-4 md:mb-0">
          <Link href="/">
            <a>
              <Image
                className="absolute inset-0 object-center cursor-pointer"
                src={showMenu ? whiteLogo : logo}
                alt="logo"
              />
            </a>
          </Link>{" "}
        </div>
        <nav className="title-font font-medium text-sm tracking-wide flex justify-end items-center pt-5">
          {!showMenu && (
            <>
              <Link href="/login">
                <a
                  className={
                    pathname === "/about"
                      ? "md:hidden mr-5 text-black uppercase active"
                      : "md:hidden mr-5 text-black uppercase strike"
                  }
                >
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a
                  className={
                    pathname === "/projects"
                      ? "md:hidden mr-5 text-black uppercase active"
                      : "md:hidden mr-5 text-black uppercase strike"
                  }
                >
                  Sign up
                </a>
              </Link>
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
