import Link from "next/link";
import { useAppContext } from "../pages/_app";
export default function Landing() {
  const { token, username } = useAppContext();
  return (
    <section id="about" className="mb-10">
      <div className="grid grid-cols-12 mt-10">
        <div className="col-start-2 col-span-6 flex justify-center items-center">
          <div>
            <h1 className="font-title leading-snug md:text-2xl text-3xl text-indigo-800">
              The Most Secure Password Manager For Personal Use
            </h1>
            <h6 className="font-content text-gray-500 md:text-base text-lg mt-3">
              Password Vault offers the safest way for individuals to store
              personal and sensitive data.
            </h6>
            <div className="mt-8">
              <Link href={token && username ? "/dashboard" : "/signup"}>
                <a>
                  <button className="font-content sm:ml-0 ml-2 sm:px-2 sm:py-1 px-4 py-3 md:text-base text-xl border-indigo-600 border-2 rounded-md bg-indigo-500 hover:bg-indigo-700 text-white uppercase">
                    {token && username ? "Dashboard" : "Get Started"}
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-start-8 col-span-4">
          <img
            className="object-center rounded lg:h-full"
            alt="hero"
            src="./landing1.svg"
          />
        </div>
      </div>
    </section>
  );
}
