import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAppContext } from "../pages/_app";

export default function DashboardMenu() {
  const {
    checkedIds,
    setCheckedIds,
    passwords,
    token,
    setUpdateCount,
    updateCount,
  } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = () => {
    let newCheckedIds = [];
    passwords.forEach(password => {
      newCheckedIds.push(password.id);
    });
    setCheckedIds(newCheckedIds);
    handleClose();
  };

  const handleUnselectAll = () => {
    setCheckedIds([]);
    handleClose();
  };

  const handleDeleteSelected = () => {
    if (checkedIds.length === 0) {
      handleClose();
      return false;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .post(
        `https://password-vault-django.herokuapp.com/api/passwords/destroymultiple/`,
        { ids: checkedIds },
        {
          headers,
        }
      )
      .then(res => {
        console.log(res);
        setUpdateCount(() => updateCount + 1);
      })
      .catch(e => {
        console.log(e);
      });
    handleClose();
  };

  return (
    <div className="border border-indigo-600 mr-2 rounded-md font-content">
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
        <MenuItem onClick={handleSelectAll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Select All
        </MenuItem>
        <MenuItem onClick={handleUnselectAll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Unselect All</span>
        </MenuItem>
        <MenuItem onClick={handleDeleteSelected}>
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
          <span className="text-red-500">Delete Selected</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
