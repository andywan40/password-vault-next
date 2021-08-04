import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Footer from "./Footer";
// import { useAppContext } from "../context/AppContext";
import { useAppContext } from "../pages/_app";

export default function Page({ children }) {
  const { showMenu } = useAppContext();
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Password Vault | The Most Secure Password Manager"
        ></meta>
        <link rel="icon" href="/title_logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cantarell&family=Cinzel&family=Rakkas&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
        <title>Password Vault | The Most Secure Password Manager</title>
      </Head>
      <main className="text-gray-400 bg-white body-font">
        <Navbar />
        {showMenu ? <Menu /> : children}
      </main>
      {!showMenu && <Footer />}
    </>
  );
}
