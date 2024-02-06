import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  // handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9090/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("logout successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
     
      {loggedIn ? (
        <>
        <Typography variant="h1" color={"primary"} fontWeight="bold">
        Chat-Room
      </Typography>
        <NavLink to="/login" onClick={handleLogout} p={1}>
          Logout
        </NavLink>
        </>
      ) : (
        <>
        <Typography variant="h1" color={"primary"} fontWeight="bold">
        welcome
      </Typography>
          <NavLink to="/" p={1}>
            Sign Up
          </NavLink>
          <NavLink to="/login" p={1}>
            Sign In
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
