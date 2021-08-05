import Link from "next/link";
export default function Landing() {
  return (
    <section id="about" className="h-screen">
      <div className="grid grid-cols-12 xs:mt-10">
        <div className="col-start-2 col-end-7 md:col-start-3 md:col-end-8 flex justify-center">
          <div>
            <h1 className="font-title leading-snug md:text-2xl text-3xl text-indigo-800">
              The Most Secure Password Manager For Personal Use
            </h1>
            <h6 className="font-content text-gray-500 md:text-base text-lg mt-3">
              Password Vault offers the safest way for individuals to store
              personal and sensitive data.
            </h6>
            <div className="mt-8">
              <Link href="/signup">
                <a>
                  <button className="sm:ml-0 ml-2 sm:px-2 sm:py-1 px-4 py-3 md:text-base text-xl border-indigo-600 border-2 rounded-md bg-indigo-500 hover:bg-indigo-700 text-white uppercase">
                    Get Started
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-start-8 col-end-12 md:col-start-9 md:col-end-13">
          <img
            className="object-cover object-center rounded lg:h-full"
            alt="hero"
            src="./landing1.svg"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 lg:hidden">
        <div className="col-start-4 col-span-5 mr-5">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="./landing2.svg"
          />
        </div>
      </div>
    </section>
  );
}
