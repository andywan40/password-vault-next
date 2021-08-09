import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAppContext } from "../pages/_app";
import Page from "../components/Page";
import Loader from "../components/Loader";

export default function Login() {
  const router = useRouter();
  const { username, setUsername, token, setToken } = useAppContext();
  const [cookie, setCookie] = useCookies(["token", "username"]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && username) {
      router.push("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    //login
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://password-vault-django.herokuapp.com/api/accounts/login/",
        data,
        {
          headers: headers,
        }
      )
      .then(res => {
        console.log(res);
        //set token
        setCookie("token", res.data.token);
        setToken(res.data.token);
        //set username
        setCookie("username", res.data.username);
        setUsername(res.data.username);
        //route to dashboard
        router.push("/dashboard");
      })
      .catch(e => {
        setError("Invalid Credentials");
        console.log(e);
      });
  };

  if (token && username) {
    return <Loader />;
  }

  return (
    <Page>
      <div className="container xs:px-6 sm:px-8 lg:px-20 px-36 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar flex flex-col justify-start items-center xs:pt-10 text-left">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-start-7 col-span-6 px-8 flex flex-col w-1/2 lg:w-5/6 mt-2 lg:col-start-1 lg:col-span-12"
        >
          <h2 className="text-indigo-600 xs:text-1xl sm:text-2xl text-3xl mb-2 font-medium font-title">
            Log In
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="username"
              className="leading-7 text-lg text-gray-500 font-content"
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              autoComplete="off"
              {...register("username", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.username && (
              <span className="text-red-500" role="alert">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-lg text-gray-500 font-content"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", { required: "Password is required" })}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.password && (
              <span className="text-red-500" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>
          <span className="text-red-500" role="alert">
            {error}
          </span>
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest"
          >
            Log In
          </button>
          <p className="p-1">
            Don't have an account yet?{" "}
            <Link href="/signup">
              <a className="text-indigo-600 font-medium underline">Sign Up</a>
            </Link>
          </p>
        </form>
      </div>
    </Page>
  );
}
