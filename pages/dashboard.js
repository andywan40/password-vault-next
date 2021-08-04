import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../pages/_app";
import Page from "../components/Page";
import PasswordItemList from "../components/PasswordItemList";

export default function Dashboard() {
  const { username, token } = useAppContext();
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .get("http://localhost:8000/api/passwords/", {
        headers,
      })
      .then(res => {
        console.log(res);
        setPasswords(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Page>
      <div className="container grid grid-cols-12 xs:px-6 sm:px-8 lg:px-20 px-36 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar">
        <div className="col-start-3 col-span-2 border border-indigo-600 text-black h-1/2">
          SIDEBAR
        </div>
        <div className="col-span-5">
          <h1 className="text-black text-3xl font-title px-5">My Vault</h1>
          <PasswordItemList passwords={passwords} />
        </div>
      </div>
    </Page>
  );
}
