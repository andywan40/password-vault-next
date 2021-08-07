import { useState, useEffect } from "react";
import { GlobeIcon } from "@heroicons/react/solid";
import { useAppContext } from "../pages/_app";
import PasswordItemMenu from "./PasswordItemMenu";
import FormModal from "./FormModal";

export default function PasswordItem(item) {
  const { checkedIds, setCheckedIds } = useAppContext();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = e => {
    e.stopPropagation();
    if (!checked) {
      let newCheckedIds = checkedIds;
      newCheckedIds.push(item.id);
      setCheckedIds(newCheckedIds);
    } else {
      let newCheckedIds = checkedIds;
      newCheckedIds.filter(id => id !== item.id);
      setCheckedIds(newCheckedIds);
    }
    setChecked(!checked);
  };

  useEffect(() => {
    if (checkedIds.includes(item.id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checkedIds]);

  return (
    <div
      onClick={handleCheckboxChange}
      className="group hover grid grid-cols-12 border-b border-solid border-gray-200 text-center p-2 flex flex-col justify-center items-center hover:bg-gray-100"
    >
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          // onChange={handleCheckboxChange}
        ></input>
      </div>
      <div className="col-span-1">
        <GlobeIcon className="xxs:hidden w-4/6 h-4/6 inline-block text-gray-500" />
      </div>
      <div className="col-span-7 text-left px-5">
        <span
          className="hover:underline cursor-pointer text-lg text-indigo-600 font-medium"
          onClick={() => setOpen(true)}
        >
          {item.name}
        </span>
        <p>{item.description}</p>
      </div>
      <div className="hidden group-hover:block col-start-11 col-span-1">
        <PasswordItemMenu {...item} />
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
