import Link from "next/link";
import { useState } from "react";
import { FireIcon } from "@heroicons/react/solid";
import Modal from "./Modal1";
export default function PasswordItem(item) {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-12 border border-solid border-indigo-200 text-center p-2 flex flex-col justify-center items-center">
      <div className="col-span-1">
        <input type="checkbox" />
      </div>
      <div className="col-span-1">
        <FireIcon className="xxs:hidden w-full h-full inline-block text-indigo-500" />
      </div>
      <div className="col-span-7 text-left px-5">
        <p
          className="hover:underline cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {item.name}
        </p>
        <p>{item.description}</p>
      </div>
      <Modal open={open} setOpen={setOpen} item={item}>
        Hello from the modal!
      </Modal>
    </div>
  );
}
