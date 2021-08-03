import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAppContext } from "../pages/_app";
import Page from "../components/Page";

export default function Login() {
  const router = useRouter();
  const { username, setUsername, token, setToken } = useAppContext();
  useEffect(() => {
    //fetch csrf token
    // axios
    //   .get("http://localhost:8000/api/accounts/csrf/", {
    //     withCredentials: true,
    //   })
    //   .then(res => {
    //     let csrfToken = res.headers["x-csrftoken"];
    //     setToken(csrfToken);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    //login
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    };
    // axios
    //   .post("http://localhost:8000/api/accounts/login/", data, {
    //     withCredentials: true,
    //     headers: headers,
    //   })
    //   .then(res => {
    //     console.log(res);
    //     //set username and redirect to dashboard
    //     setUsername(res.data.username);
    //     router.push("/dashboard");
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };

  return (
    <Page>
      <div className="container xs:px-6 sm:px-8 lg:px-20 px-36 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar flex flex-col justify-start items-center xs:pt-10 text-left">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-start-7 col-span-6 px-8 flex flex-col w-4/6 mt-2 lg:col-start-1 lg:col-span-12"
        >
          <h2 className="text-indigo-600 xs:text-1xl sm:text-2xl text-3xl mb-2 font-medium font-title">
            Log In
          </h2>
          {/* <p className="leading-relaxed mb-5 font-content">How can I help?</p> */}
          <div className="relative mb-4">
            <label
              htmlFor="email"
              className="leading-7 text-lg text-gray-500 font-content"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.email && (
              <span className="text-red-500" role="alert">
                {errors.email.message}
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
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest"
          >
            Log In
          </button>
        </form>
      </div>
    </Page>
  );
}
