import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../pages/_app";
import Page from "../components/Page";
import FormModal from "../components/FormModal";
import PasswordItemList from "../components/PasswordItemList";

export default function Dashboard() {
  const { token, updateCount } = useAppContext();
  const [passwords, setPasswords] = useState([]);
  const [open, setOpen] = useState(false);
  const item = {
    name: "",
    description: "",
    username: "",
    password: "",
    notes: "",
    email: "",
    website: "",
  };

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
  }, [updateCount]);

  return (
    <Page>
      <div className="container grid grid-cols-12 xs:px-6 sm:px-8 lg:px-20 px-28 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar">
        <div className="col-start-2 col-span-2 border border-indigo-600 text-black h-1/2">
          SIDEBAR
        </div>
        <div className="col-span-6 px-5">
          <div className="flex justify-between mb-3 pb-2 border-b">
            <h1 className="text-black text-2xl font-title px-5 inline-block">
              My Vault
            </h1>
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md font-title text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              Add Item
            </button>
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
