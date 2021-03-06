import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAppContext } from "../pages/_app";

export default function PasswordItemMenu(item) {
  const { token, updateCount, setUpdateCount } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = e => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleDelete = e => {
    e.stopPropagation();
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
        handleClose(e);
        //trigger dashboard to fetch new data
        setUpdateCount(() => updateCount + 1);
      })
      .catch(e => {
        console.log(e);
        alert("Something went wrong, please try again later!");
      });
  };

  const handleLaunch = e => {
    handleClose(e);
    window.open(item.website);
  };
  const copyUsername = e => {
    handleClose(e);
    navigator.clipboard.writeText(item.username);
  };
  const copyPassword = e => {
    handleClose(e);
    navigator.clipboard.writeText(item.password);
  };
  const toggleFavorite = e => {
    handleClose(e);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    const newItem = {
      ...item,
      is_favorite: !item.is_favorite,
    };
    axios
      .put(
        `https://password-vault-django.herokuapp.com/api/passwords/${item.id}/`,
        newItem,
        {
          headers,
        }
      )
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          //trigger dashboard to fetch new data
          setUpdateCount(() => updateCount + 1);
        } else {
          alert("Failed. Please try again.");
        }
      })
      .catch(e => {
        console.log(e);
        alert("Something went wrong, please try again later!");
      });
  };

  return (
    <div className="font-content" onClick={e => e.stopPropagation()}>
      <Button
        aria-controls="dashboard-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        id="dashboard-menu"
        className="font-content border rounded-md"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {item.username && (
          <MenuItem onClick={copyUsername}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>Copy Username</span>
          </MenuItem>
        )}
        {item.password && (
          <MenuItem onClick={copyPassword}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>Copy Password</span>
          </MenuItem>
        )}
        <MenuItem onClick={toggleFavorite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pr-2 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {item.is_favorite ? (
            <span className="text-yellow-500">Remove From Favorites</span>
          ) : (
            <span className="text-yellow-500">Add To Favorites</span>
          )}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pr-2 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="text-red-500">Delete</span>
        </MenuItem>
        {item.website && (
          <MenuItem onClick={handleLaunch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              />
            </svg>
            <span>Launch</span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
