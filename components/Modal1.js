import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import { TrashIcon } from "@heroicons/react/solid";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "40%",
    height: "60%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModal({ open, setOpen, item }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    username: item.username,
    password: item.password,
    notes: item.notes,
    website: item.website,
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <label
        htmlFor="name"
        className="leading-7 text-sm text-gray-600 font-content"
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
      <label
        htmlFor="description"
        className="leading-7 text-sm text-gray-600 font-content"
      >
        Description
      </label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <label
        htmlFor="username"
        className="leading-7 text-sm text-gray-600 font-content"
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />

      <label
        htmlFor="password"
        className="leading-7 text-sm text-gray-600 font-content"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <label
        htmlFor="notes"
        className="leading-7 text-sm text-gray-600 font-content"
      >
        Notes
      </label>
      <input
        type="text"
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <label
        htmlFor="website"
        className="leading-7 text-sm text-gray-600 font-content"
      >
        Website
      </label>
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <div className="mt-16 flex justify-between">
        <button className="text-md rounded-md px-3 bg-indigo-600 text-white">
          Save
        </button>
        <button className="rounded-md p-3 text-red-500 group hover:bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 group-hover:text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
