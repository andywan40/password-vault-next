import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/solid";
import Page from "../components/Page";
import { images } from "../helpers/data";

export default function About() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 1;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <Page>
      <div className="container xs:px-6 sm:px-8 lg:px-20 px-36 sm:pt-0 sm:pb-20 pt-6 pb-10 text-gray-600 h-full min-h-screen font-navbar xs:flex xs:flex-col xs:justify-start xs:items-center xs:pt-10 text-left">
        <div>
          <div className="flex items-center">
            <h1 className="xs:text-1xl sm:text-2xl md:text-3xl text-4xl text-gray-800 font-title inline-block">
              About Me
            </h1>
          </div>
          <h5 className="my-8 sm:my-6 text-1xl xs:w-10/12">
            I currently am working as a Software Engineer at{" "}
            <span className="text-pink-400">Asgard System, Inc. </span>
          </h5>
          <p className="mb-10 sm:mb-6 text-md xs:w-10/12">
            {" "}
            I am passionate about creating products that help improve the lives
            of many people. <br></br> Right now, I am working on a few side
            projects including
            <a
              href="https://react-foodpicker-app.herokuapp.com/"
              className="text-pink-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              FoodPicker{" "}
            </a>
            (a web app that generates random meals and provides recipes).
          </p>
          <p className="mb-10 sm:mb-6 text-md xs:w-10/12">
            Outside of work, I enjoy playing{" "}
            <span className="text-pink-400">basketball</span>, working out and
            travelling. <br></br> <span className="text-pink-400">Tokyo</span>{" "}
            is by far my favorite city, and I hope to visit it again once the
            pandemic ends.{" "}
          </p>
          <p className="mb-10 sm:mb-6 text-md xs:w-10/12">
            {" "}
            Scroll down to see some of my favorite places near Tokyo.
          </p>
        </div>
        <div
          className={
            isVisible
              ? "block absolute bottom-10 left-1/2"
              : "scroll block absolute bottom-10 left-1/2"
          }
        >
          <ArrowDownIcon className="h-7 w-7 ml-2 mt-4 text-pink-400 inline-block md:hidden animate-bounce" />
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-1 xxs:px-1 xs:px-4 sm:px-8 md:px-20 px-36 mb-16">
        {images.map(image => (
          <div
            className="relative group flex text-center justify-center m-1"
            key={image.title}
          >
            <Image
              src={image.src}
              className="group-hover:brightness-50 rounded-md m-5"
            />
            <div className="image-text text-2xl font-title group-hover:opacity-100 group-hover:font-medium">
              {image.title}
              <p className="text-sm">Photo By {image.author}</p>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
