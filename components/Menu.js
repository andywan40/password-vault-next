import Link from "next/link";
import { useRouter } from "next/router";
// import { useAppContext } from "../pages/_app.js";

export default function Menu() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <nav className="h-screen bg-black flex flex-col justify-center items-start title-font font-medium sm:text-2xl text-3xl tracking-widest p-10">
      <Link href="/about">
        <a
          className={
            pathname === "/about"
              ? "mr-5 text-white uppercase active-white"
              : "mr-5 text-white uppercase strike-white"
          }
        >
          About
        </a>
      </Link>
      <Link href="/projects">
        <a
          className={
            pathname === "/projects"
              ? "mr-5 text-white uppercase active-white"
              : "mr-5 text-white uppercase strike-white"
          }
        >
          Projects
        </a>
      </Link>
      <a
        href="/andrew_wan_resume.pdf"
        download
        className="mr-5 text-white uppercase strike-white"
      >
        Resume
      </a>
      <Link href="/#contact" scroll={false}>
        <a className="mr-5 text-white uppercase strike-white">Contact</a>
      </Link>
    </nav>
  );
}
