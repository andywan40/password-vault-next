import React, { useState } from "react";
import axios from "axios";
import { HandIcon } from "@heroicons/react/solid";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
  });
  const handleSubmit = e => {
    e.preventDefault();
    const info = formData;
    setIsLoading(true);
    setFormData({ name: "", email: "", message: "" });
    const url = "https://immense-fortress-49913.herokuapp.com/messages";
    axios.post(url, info).then(res => {
      if (res.data.message) {
        setSubmitStatus({
          submitted: true,
          success: true,
        });
      } else {
        setSubmitStatus({
          submitted: true,
          success: false,
        });
      }
      setIsLoading(false);
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateButtonStyle = () => {
    let buttonStyle;
    if (isLoading) {
      buttonStyle =
        "cursor-not-allowed opacity-50 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest";
    } else if (!submitStatus.submitted) {
      buttonStyle =
        "text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest";
    } else if (!submitStatus) {
      buttonStyle =
        "text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest";
    } else {
      buttonStyle =
        "text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest";
    }
    return buttonStyle;
  };

  const updateButtonText = () => {
    let buttonText;
    if (isLoading) {
      buttonText = "Submitting...";
    } else if (!submitStatus.submitted) {
      buttonText = "Submit";
    } else if (!submitStatus) {
      buttonText = "Failed...Please Try Again Later";
    } else {
      buttonText = "Success";
    }
    return buttonText;
  };

  return (
    <section id="contact" className="relative">
      <div className="container grid grid-cols-12 md:px-10 px-36 py-10 mx-auto my-10">
        <div className="col-start-1 col-span-6 lg:hidden bg-gray-900 rounded-lg overflow-hidden p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            style={{ filter: "opacity(0.8)" }}
            src={`https://www.google.com/maps/embed/v1/place?q=dongmen+station+taipei&key=${process.env.MAP_KEY}`}
          />
          <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                LOCATION
              </h2>
              <p className="mt-1">
                Taipei, <br />
                Taiwan
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <p className="text-indigo-400 leading-relaxed">
                andywan40@gmail.com
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="col-start-7 col-span-6 px-8 flex flex-col w-full mt-2 lg:col-start-1 lg:col-span-12"
        >
          <h2 className="text-black xs:text-2xl sm:text-3xl text-4xl mb-2 font-medium font-title">
            Contact Me
            <HandIcon className="xxs:hidden w-1/12 h-1/12 inline-block mx-2 animate-wiggle text-indigo-500" />
          </h2>
          <p className="leading-relaxed mb-5 font-content">How can I help?</p>
          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="leading-7 text-sm text-gray-400 font-content"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="email"
              className="leading-7 text-sm text-gray-400 font-content"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-400 font-content"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-title tracking-widest"
            className={updateButtonStyle()}
            disabled={isLoading ? true : false}
          >
            {updateButtonText()}
          </button>
        </form>
      </div>
    </section>
  );
}
