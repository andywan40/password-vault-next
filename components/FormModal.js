import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { useAppContext } from "../pages/_app";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function FormModal({ open, setOpen, item, mode }) {
  const { token, updateCount, setUpdateCount } = useAppContext();
  const [modalStyle] = useState(getModalStyle);
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    username: item.username,
    password: item.password,
    notes: item.notes,
    email: item.email,
    website: item.website,
  });

  const [initialFormData, setInitialFormData] = useState(formData);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const handleSaveBtnClick = e => {
    if (mode === "update") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      };
      axios
        .put(`http://localhost:8000/api/passwords/${item.id}/`, formData, {
          headers,
        })
        .then(res => {
          console.log(res);
          //set initialFormData to newly saved Form Data
          setInitialFormData(formData);
          //trigger dashboard to fetch new data
          setUpdateCount(() => updateCount + 1);
          //close form
          handleClose();
        })
        .catch(e => {
          console.log(e);
          alert("Something went wrong, please try again later!");
        });
    } else if (mode === "add") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      };
      axios
        .post(`http://localhost:8000/api/passwords/`, formData, {
          headers,
        })
        .then(res => {
          console.log(res);
          //set initialFormData to newly saved Form Data
          setInitialFormData(item);
          setFormData(item);
          //trigger dashboard to fetch new data
          setUpdateCount(() => updateCount + 1);
          //close form
          handleClose();
        })
        .catch(e => {
          console.log(e);
          alert("Something went wrong, please try again later!");
        });
    }
  };

  const handleDelete = e => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .delete(`http://localhost:8000/api/passwords/${item.id}/`, {
        headers,
      })
      .then(res => {
        console.log(res);
        //trigger dashboard to fetch new data
        setUpdateCount(() => updateCount + 1);
        //close form
        handleClose();
      })
      .catch(e => {
        console.log(e);
        alert("Something went wrong, please try again later!");
      });
  };

  const body = (
    <div
      style={modalStyle}
      className="relative w-4/6 border p-5 bg-white grid grid-cols-12 max-h-85vh overflow-y-scroll"
    >
      <div className="col-span-6 p-2">
        <label
          htmlFor="name"
          className="leading-7 text-md text-gray-600 font-content"
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
      </div>
      <div className="col-span-6 p-2">
        <label
          htmlFor="description"
          className="leading-7 text-md text-gray-600 font-content"
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
      </div>
      <div className="col-span-6 p-2">
        <label
          htmlFor="username"
          className="leading-7 text-md text-gray-600 font-content"
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
      </div>
      <div className="col-span-6 p-2">
        <label
          htmlFor="password"
          className="leading-7 text-md text-gray-600 font-content"
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
      </div>
      <div className="col-span-6 p-2">
        <label
          htmlFor="website"
          className="leading-7 text-md text-gray-600 font-content"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="col-span-6 p-2">
        <label
          htmlFor="website"
          className="leading-7 text-md text-gray-600 font-content"
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
      </div>
      <div className="col-span-12 p-2">
        <label
          htmlFor="notes"
          className="leading-7 text-md text-gray-600 font-content"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          cols="30"
          rows="5"
          value={formData.notes}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="mt-2 flex justify-between col-span-12 px-2">
        <div>
          <button
            onClick={handleSaveBtnClick}
            className="font-content h-full text-lg rounded-md mx-1 px-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="h-full text-lg rounded-md mx-1 px-2 bg-white hover:bg-indigo-700 text-gray-600 border border-gray-600 hover:bg-gray-300 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
        {mode === "update" && (
          <button
            onClick={handleDelete}
            className="rounded-md p-3 text-red-500 group hover:bg-red-500 border border-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}