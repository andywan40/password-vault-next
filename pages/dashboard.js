import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../pages/_app";
import Page from "../components/Page";
import FormModal from "../components/FormModal";
import Sidebar from "../components/Sidebar";
import DashboardMenu from "../components/DashboardMenu";
import PasswordItemList from "../components/PasswordItemList";

export default function Dashboard() {
  const { token, updateCount, passwords, setPasswords, type } = useAppContext();
  const [open, setOpen] = useState(false);

  const item = {
    name: "",
    description: "",
    username: "",
    password: "",
    notes: "",
    email: "",
    website: "",
    is_favorite: false,
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .get(
        `https://password-vault-django.herokuapp.com/api/passwords/?type=${type}`,
        {
          headers,
        }
      )
      .then(res => {
        console.log(res);
        setPasswords(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [updateCount, type]);

  return (
    <Page>
      <div className="container grid grid-cols-12 xs:px-6 sm:px-8 lg:px-20 px-28 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar">
        <Sidebar />
        <div className="md:col-start-1 md:col-span-12 col-span-9 px-5">
          <div className="flex justify-between mb-3 pb-2 border-b">
            <h1 className="text-black xs:text-lg lg:text-xl text-2xl font-content uppercase px-5 inline-block">
              My Vault
            </h1>
            <div className="flex items-center justify-center">
              <DashboardMenu />
              <button
                onClick={() => setOpen(true)}
                className="text-sm md:text-xs flex items-center justify-center font-bold font-content p-2 rounded-md text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 xs:hidden"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="uppercase xs:text-xs">Add Item</p>
              </button>
            </div>
          </div>
          <PasswordItemList passwords={passwords} />
        </div>
        <FormModal
          open={open}
          setOpen={setOpen}
          item={item}
          mode="add"
        ></FormModal>
      </div>
    </Page>
  );
}
