import React, { useContext, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { compStyle } from "./compStyle";
import { myContext } from "../ContextProvider/AppContext";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";

const Login = () => {
  const { setIsAuth } = useContext(myContext);
  const [userData, setUserData] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const [userCred] = useLocalStorage(
    "user-cred",
    JSON.stringify({
      id: "ankit@g.com",
      pass: "1234",
    })
  );
  useLocalStorage("task", "");

  const login = () => {
    const { id, pass } = JSON.parse(userCred);
    if (userData.name === id && userData.password === pass) {
      setIsAuth(true);
      
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Stack style={compStyle.stackStyle}>
      <TextField
        style={compStyle.field}
        id="outlined-basic"
        label="Name"
        name="name"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        style={compStyle.field}
        id="outlined-basic"
        name="password"
        label="Password"
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        style={compStyle.buttonStyle}
        variant="contained"
        size="lg"
        onClick={login}
      >
        Login
      </Button>
    </Stack>
  );
};

export default Login;
