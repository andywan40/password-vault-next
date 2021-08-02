import React from "react";
import Image from "next/image";
import Link from "next/link";
import Page from "../../components/Page";
import { projects } from "../../helpers/data.js";
export default function Projects() {
  return (
    <Page>
      <div className="container h-screen xxs:px-1 xs:px-4 sm:px-8 lg:px-20 px-36 py-10 flex flex-col items-center justify-around">
        {projects.map(project => (
          <Link
            href="/projects/[title]"
            as={`/projects/${project.title.toLowerCase()}`}
            key={project.title}
          >
            <a className="h-full w-full hover:cursor-pointer">
              <div className="img-container h-full w-full flex justify-center items-center text-center my-6 group relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img rounded-lg w-full h-full"
                />
                <h1 className="text-shadow-white xs:text-1xl sm:text-2xl md:text-3xl lg:text-4xl text-5xl font-title text-black opacity-100">
                  {project.title}
                </h1>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Page>
  );
}
