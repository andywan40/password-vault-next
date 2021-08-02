import React from "react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between w-full h-14 border-t px-5 text-gray-500 text-xs xs:px-2">
      <a href="https://logomakr.com/" target="_blank" rel="noopener noreferrer">
        Created my free logo at <strong>LogoMakr.com</strong>
      </a>
      <a
        className="flex items-center justify-center sm:text-xs"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
      </a>
    </footer>
  );
}
