export default function Landing() {
  return (
    <section id="about" className="h-screen">
      <div className="grid grid-cols-12 h-screen">
        <div className="col-start-4 col-end-8 md:col-start-5 md:col-end-9 flex justify-center items-center">
          <h1 className="font-title font-extrabold leading-0.6 xxs:text-5xl xs:text-6xl lg:text-10xl text-12xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-blue-500 via-blue-600 via-purple-500 to-purple-600">
            Password <br></br> Vault
          </h1>
        </div>
        <div className="col-start-8 col-end-12 md:col-start-9 md:col-end-13">
          {/* <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src="./coding.svg"
                    /> */}
        </div>
      </div>
    </section>
  );
}
