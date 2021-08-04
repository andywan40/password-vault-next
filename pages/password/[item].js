import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../_app";
import Page from "../../components/Page";
import axios from "axios";
import { useRouter } from "next/router";

export default function Item() {
  const router = useRouter();
  const id = router.query.item;
  const { token } = useAppContext();
  const [item, setItem] = useState({});
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .get(`http://localhost:8000/api/passwords/${id}`, {
        headers,
      })
      .then(res => {
        console.log(res);
        setItem(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <Page>
      <div className="container xs:px-6 sm:px-8 lg:px-20 px-36 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar xs:flex xs:flex-col xs:justify-start xs:items-center xs:pt-10 text-left">
        <h1 className="font-title text-3xl text-indigo-600">{item.name}</h1>
        <h6 className="text-sm">{item.description}</h6>
        <h2>username: {item.username}</h2>
        <h2>password: {item.password}</h2>
        <textarea value={item.notes}></textarea>
        <h5>website: {item.website}</h5>
      </div>
    </Page>
  );
}
