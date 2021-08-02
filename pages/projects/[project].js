import Image from "next/image";
import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { ViewGridIcon } from "@heroicons/react/outline";
import Page from "../../components/Page";
import { projects } from "../../helpers/data";

export default function Project({ project }) {
  return (
    <Page>
      <div className="container mt-5 xxs:px-1 xs:px-4 sm:px-8 md:px-15 lg:px-20 px-30 py-10 flex flex-col">
        <div className="grid grid-cols-12 mb-20">
          <div className="flex flex-col col-start-1 col-span-4 lg:col-start-2 lg:col-span-10 lg:mb-10 justify-center lg:items-center items-end lg:p-5 p-16 lg:pt-2">
            <h1 className="text-black text-3xl font-title">{project?.title}</h1>
            <h6 className="text-gray-700 text-sm font-title">
              {project?.subtitle}
            </h6>
          </div>
          <div className="w-full h-full col-start-5 col-span-6 lg:col-start-2 lg:col-span-10">
            <Image
              src={project?.img}
              alt={project?.title}
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 mb-20">
          <div className="lg:hidden w-full h-full col-start-2 col-span-6 lg:col-start-2 lg:col-span-6 flex flex-col justify-center items-center p-5">
            <div className="mb-16">
              <Image
                src={project?.img1}
                alt={project?.title}
                className="w-full h-full rounded-lg"
              />
            </div>
            <Image
              src={project?.img2}
              alt={project?.title}
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col lg:col-start-2 lg:col-span-10 col-start-8 col-span-5 justify-centerjustify-start items-start text-left pt-5 sm:pt-10 px-20 md:px-5 lg:px-8 ">
            <div className="my-10 lg:my-5 lg:p-2">
              <h2 className="font-bold uppercase text-black mb-1">Year</h2>
              <h2>{project?.year}</h2>
            </div>
            <div className="my-10 lg:my-5 lg:p-2">
              <h2 className="font-bold uppercase text-black mb-1">Stack</h2>
              <ul className="ml-3">
                {project?.technology.map(tech => (
                  <li className="list-disc" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-10 lg:my-5 lg:p-2 w-1/2 lg:w-full">
              <h2 className="font-bold uppercase text-black mb-1">Mission</h2>
              <h2>{project?.description}</h2>
            </div>
            <div className="my-10 lg:my-5 lg:flex lg:flex-col lg:justify-center lg:h-full mt-10">
              <a
                href={project?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-content uppercase rounded-sm flex items-center sm:text-sm py-3 px-3 lg:py-1 lg:px-2 visit-link"
              >
                Visit Site
                <ArrowNarrowRightIcon className="w-5 h-5 ml-5 inline-block"></ArrowNarrowRightIcon>
              </a>
            </div>
          </div>
          <div className="hidden lg:block w-full h-full lg:col-start-2 lg:col-span-10 flex flex-col justify-center items-center md:p-0 p-5 lg:mt-10">
            <div className="mb-16">
              <Image
                src={project?.img1}
                alt={project?.title}
                className="w-full h-full rounded-lg"
              />
            </div>
            <Image
              src={project?.img2}
              alt={project?.title}
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center my-10">
          <Link href="/projects">
            <a>
              <ViewGridIcon className="w-8 h-8" />
            </a>
          </Link>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps(context) {
  let projectObj = {};
  for (let project of projects) {
    if (project.title.toLowerCase() === context.params.project) {
      projectObj = project;
      break;
    }
  }
  return {
    props: {
      project: projectObj,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: ["/projects/foodpicker", "/projects/wannabuy"],
    fallback: true,
  };
}
