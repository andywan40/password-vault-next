import {
  CollectionIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { desc } from "../helpers/data";

export default function Description() {
  return (
    <section id="projects" className="text-gray-400 bg-white body-font">
      <div className="font-title px-5 py-10 mx-auto text-center lg:px-20">
        <div className="-m-4">
          {desc.map((item, i) => (
            <div className="grid grid-cols-12 my-24" key={item.id}>
              <div
                className={
                  i % 2 === 0
                    ? "hidden"
                    : "col-start-2 col-span-6 md:hidden text-center text-2xl sm:text-lg text-gray-600 flex flex-col items-center justify-center px-10 sm:hidden"
                }
              >
                <h1 className="">{item.title}</h1>
                <p className="font-content text-base mt-3 text-gray-400">
                  {item.description}
                </p>
              </div>

              <div
                className={
                  i % 2 === 0
                    ? "col-start-2 col-span-4 md:col-start-2 md:col-span-10 h-96 mb-5"
                    : "col-start-8 col-span-4 md:col-start-2 md:col-span-10 h-96 mb-5"
                }
              >
                <div className="flex relative group w-full h-full">
                  <img
                    className="w-full h-full object-center border rounded-lg shadow-2xl transition ease-in-out duration-500 group-hover:brightness-40 group-hover:opacity:30"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              </div>

              <div
                className={
                  i % 2 === 0
                    ? "col-span-6 md:col-start-1 md:col-span-12 text-center text-2xl sm:text-lg text-gray-600 flex flex-col items-center justify-center px-10"
                    : "hidden md:col-start-2 md:col-span-10 md:block"
                }
              >
                <h1 className="font-title text-2xl text-gray-600 sm:text-lg sm:mt-2">
                  {item.title}
                </h1>
                <p className="font-content text-base mt-3 sm:text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
