import React from "react";
import { BadgeCheckIcon, DatabaseIcon } from "@heroicons/react/solid";
import { skills } from "../helpers/data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container px-36 md:px-16 sm:p0 py-10 mx-auto">
        <div className="text-center mb-20">
          <DatabaseIcon className="w-10 inline-block mb-4 text-indigo-500" />
          <h1 className="font-title font-semibold xs:text-2xl sm:text-3xl text-4xl text-black mb-3">
            Skills &amp; Technologies
          </h1>
        </div>
        <div className="grid grid-cols-2">
          {skills.map(skill => (
            <div key={skill} className="col-span-1 lg:col-span-2 p-2 w-full">
              <div className="bg-gray-100 border border-blue-400 rounded flex p-4 h-full items-center">
                <BadgeCheckIcon className="text-blue-400 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="font-content font-black text-gray-900 xxs:text-xs md:text-sm">
                  {skill}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
