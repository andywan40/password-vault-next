import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../pages/_app";
import Page from "../components/Page";

export default function About() {
  const { username } = useAppContext();
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get("http://localhost:8000/api/passwords/passwords/", {
        headers,
      })
      .then(res => {
        console.log(res);
        setPasswords(res.data.passwords);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Page>
      <div className="container xs:px-6 sm:px-8 lg:px-20 px-36 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar xs:flex xs:flex-col xs:justify-start xs:items-center xs:pt-10 text-left">
        <h1 className="text-black font-title text-4xl text-center">
          Welcome back <span className="text-indigo-600">{username}</span> !
        </h1>
        {passwords.map(password => {
          return (
            <div
              key={password.date_added}
              className="border border-solid border-indigo-600 my-1 text-center"
            >
              <h1>{password.name}</h1>
              <h6>{password.description}</h6>
              <p>username: {password.username}</p>
              <p>password: {password.password}</p>
            </div>
          );
        })}
      </div>
    </Page>
  );
}
