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
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    website: "",
  });
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    username: item.username,
    password: item.password,
    notes: item.notes,
    email: item.email,
    website: item.website,
    is_favorite: item.is_favorite,
  });

  const [initialFormData, setInitialFormData] = useState(formData);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitted) handleValidation();
  };

  const handleClose = () => {
    setErrors({
      name: "",
      email: "",
      website: "",
    });
    setOpen(false);
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const handleValidation = () => {
    let nameError = false;
    let emailError = false;
    let websiteError = false;
    //name
    if (!formData.name) {
      nameError = true;
    }
    //email
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (formData.email && !formData.email.match(emailPattern)) {
      emailError = true;
    }
    //website
    const websitePattern =
      /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (formData.website && !formData.website.match(websitePattern)) {
      websiteError = true;
    }

    setErrors({
      name: nameError ? "Name is Required" : "",
      email: emailError ? "Please Enter a Valid Email" : "",
      website: websiteError ? "Please Enter a Valid Website" : "",
    });

    return nameError || emailError || websiteError;
  };

  const handleSaveBtnClick = e => {
    setSubmitted(true);
    //validation
    const hasError = handleValidation();
    if (hasError) return false;
    //update password item
    if (mode === "update") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      };
      axios
        .put(
          `https://password-vault-django.herokuapp.com/api/passwords/${item.id}/`,
          formData,
          {
            headers,
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            //set initialFormData to newly saved Form Data
            setInitialFormData(formData);
            setFormData(formData);
            //trigger dashboard to fetch new data
            setUpdateCount(() => updateCount + 1);
            //close form
            handleClose();
          } else {
            alert("Failed");
          }
        })
        .catch(e => {
          console.log(e);
          alert("Something went wrong, please try again later!");
        });
      //add new password item
    } else if (mode === "add") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      };
      axios
        .post(
          `https://password-vault-django.herokuapp.com/api/passwords/`,
          formData,
          {
            headers,
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.status === 201) {
            //set initialFormData to newly saved Form Data
            setInitialFormData(item);
            setFormData(item);
            //trigger dashboard to fetch new data
            setUpdateCount(() => updateCount + 1);
            //close form
            handleClose();
          } else {
            alert("Failed");
          }
        })
        .catch(e => {
          console.log(e);
          alert("Something went wrong, please try again later!");
        });
    }
  };

  const generateRandomPassword = e => {
    const randomPassword = Math.random().toString(36).substr(2, 8);
    setFormData({
      ...formData,
      password: randomPassword,
    });
  };

  const toggleFavorite = e => {
    setFormData({
      ...formData,
      is_favorite: !formData.is_favorite,
    });
  };

  const handleDelete = e => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .delete(
        `https://password-vault-django.herokuapp.com/api/passwords/${item.id}/`,
        {
          headers,
        }
      )
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
      <div className="md:col-span-12 col-span-6 p-2">
        <label
          htmlFor="name"
          className="leading-7 text-base text-gray-600 font-content"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errors.name && (
          <span className="text-red-500" role="alert">
            {errors.name}
          </span>
        )}
      </div>
      <div className="md:col-span-12 col-span-6 p-2">
        <label
          htmlFor="description"
          className="leading-7 text-base text-gray-600 font-content"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          autoComplete="off"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="md:col-span-12 col-span-6 p-2">
        <label
          htmlFor="username"
          className="leading-7 text-base text-gray-600 font-content"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="md:col-span-12 col-span-6 p-2">
        <div className="flex justify-between">
          <label
            htmlFor="password"
            className="leading-7 text-base text-gray-600 font-content"
          >
            Password
          </label>
          <label
            className="text-base text-white font-content bg-gray-600 rounded-sm px-1 cursor-pointer mb-1 xs:text-sm"
            onClick={generateRandomPassword}
          >
            Random{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block xs:h-4 xs:w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          </label>
        </div>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            className="block w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 password-label rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 password-label rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-12 col-span-6 p-2">
        <label
          htmlFor="website"
          className="leading-7 text-base text-gray-600 font-content"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errors.email && (
          <span className="text-red-500" role="alert">
            {errors.email}
          </span>
        )}
      </div>
      <div className="md:col-span-12 col-span-6 p-2">
        <label
          htmlFor="website"
          className="leading-7 text-base text-gray-600 font-content"
        >
          Website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errors.website && (
          <span className="text-red-500" role="alert">
            {errors.website}
          </span>
        )}
      </div>
      <div className="md:col-span-12 col-span-12 p-2">
        <label
          htmlFor="notes"
          className="leading-7 text-base text-gray-600 font-content"
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
      <div className="mt-2 pb-5 flex justify-between col-span-12 px-2 xs:grid xs:grid-cols-12">
        <div className="xs:col-span-12 flex justify-between xs:mb-2">
          <button
            onClick={handleSaveBtnClick}
            className="font-content h-full xs:text-sm text-lg rounded-md mx-1 px-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="font-content h-full xs:text-sm text-lg rounded-md mx-1 px-2 bg-white hover:bg-indigo-700 text-gray-600 border border-gray-600 hover:bg-gray-300 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
        <div className="xs:col-span-12 flex justify-between">
          <button
            onClick={toggleFavorite}
            className={
              formData.is_favorite
                ? "rounded-md p-3 text-indigo-600 border border-indigo-600 mx-1"
                : "rounded-md p-3 text-gray-300 border border-gray-500 mx-1"
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
          </button>
          {mode === "update" && (
            <button
              onClick={handleDelete}
              className="rounded-md p-3 mx-1 text-red-500 group hover:bg-red-500 border border-red-500"
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
