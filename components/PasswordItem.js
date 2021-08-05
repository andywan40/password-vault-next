import { useState } from "react";
import { FireIcon } from "@heroicons/react/solid";
import FormModal from "./FormModal";

export default function PasswordItem(item) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = e => {
    setChecked(!checked);
  };
  return (
    <div
      onClick={handleCheckboxChange}
      className="grid grid-cols-12 border border-solid border-indigo-200 text-center p-2 flex flex-col justify-center items-center hover:bg-gray-100"
    >
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        ></input>
      </div>
      <div className="col-span-1">
        <FireIcon className="xxs:hidden w-full h-full inline-block text-indigo-500" />
      </div>
      <div className="col-span-7 text-left px-5">
        <p
          className="hover:underline cursor-pointer text-lg text-indigo-600"
          onClick={() => setOpen(true)}
        >
          {item.name}
        </p>
        <p>{item.description}</p>
      </div>
      <FormModal
        open={open}
        setOpen={setOpen}
        item={item}
        mode="update"
      ></FormModal>
    </div>
  );
}
