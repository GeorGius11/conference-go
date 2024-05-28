import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createUser, signIn } from "../dbManager/dbManager";

const AuthView = () => {
  const location = useLocation();
  const state = location.state || {};

  useEffect(() => {
    if (state.signUp) setSignUp(true);
  }, [state]);

  const [signUp, setSignUp] = useState(false);

  const [value, setValue] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordsMatch = password === confirmPassword;

  const clearTextFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setShowPassword(false);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function httpGet(url: string) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  // const reportsResponse = httpGet(`../baseUser/reports/${id}`);
  // const reports = JSON.parse(reportsResponse);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "400px",
          height: "600px",
          backgroundColor: "#FFF",
          flexDirection: "column",
          borderRadius: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <IconButton
            color="primary"
            onClick={handleBackClick}
            sx={{ width: "40px" }}
          >
            <ArrowBackIcon />
          </IconButton>
          {signUp ? (
            <div
              style={{
                display: "flex",

                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Typography>Sign Up</Typography>
              <TextField
                value={username}
                label="Username"
                sx={{
                  width: "260px",
                }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></TextField>
              <TextField
                value={password}
                label="Password"
                sx={{
                  width: "260px",
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></TextField>
              <TextField
                value={confirmPassword}
                error={!passwordsMatch}
                label="Confirm Password"
                sx={{
                  width: "260px",
                }}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></TextField>
              <TextField
                value={email}
                label="Email"
                sx={{
                  width: "260px",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>

              <Button
                variant="contained"
                onClick={async () => {
                  console.log("UserName", username);
                  console.log("Password", password);
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: username,
                      password: password,
                    })
                  );
                  await createUser(username, password);
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={async () => {
                  clearTextFields();
                  setSignUp(false);
                }}
              >
                Sign In
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography>Sign In</Typography>
              <TextField
                value={username}
                label="Username"
                sx={{
                  width: "260px",
                }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></TextField>
              <TextField
                sx={{
                  width: "260px",
                }}
                value={password}
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={async () => {
                  console.log("UserName", username);
                  console.log("Password", password);
                  console.log("Confirmed password", confirmPassword);
                  console.log("Email", email);
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: username,
                      password: password,
                    })
                  );
                  await signIn(username, password);
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  clearTextFields();
                  setSignUp(true);
                  console.log(JSON.parse(localStorage.getItem("user")!));
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
