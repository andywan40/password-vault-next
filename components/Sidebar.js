import { useAppContext } from "../pages/_app";
import axios from "axios";

export default function Sidebar() {
  const { type, setType } = useAppContext();
  const getAllItems = e => {
    setType("all");
  };

  const getFavoriteItems = e => {
    setType("favorite");
  };

  const getDeletedItems = e => {};

  return (
    <div className="col-start-1 col-span-3 md:col-start-2 md:col-span-10 border rounded-md border-gray-200 text-black h-4/6">
      <div className="w-full border-b p-3 bg-gray-100 font-content uppercase">
        Filters
      </div>
      <div>
        <div
          onClick={getAllItems}
          className={
            type === "all"
              ? "w-full py-2 px-3 pt-3 font-content uppercase flex cursor-pointer hover:bg-gray-100 hover:underline text-indigo-600 font-bold"
              : "w-full py-2 px-3 pt-3 font-content uppercase flex cursor-pointer hover:bg-gray-100 hover:underline"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="pl-2">All Items</span>
        </div>
        <div
          onClick={getFavoriteItems}
          className={
            type === "favorite"
              ? "w-full py-2 px-3 pt-3 font-content uppercase flex cursor-pointer hover:bg-gray-100 hover:underline text-indigo-600 font-bold"
              : "w-full py-2 px-3 pt-3 font-content uppercase flex cursor-pointer hover:bg-gray-100 hover:underline"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="pl-2">Favorites</span>
        </div>
        {/* <div
          onClick={getDeletedItems}
          className="w-full p-2 px-3 font-content uppercase flex cursor-pointer hover:bg-gray-100 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="pl-2">Trash</span>
        </div> */}
      </div>
    </div>
  );
}
