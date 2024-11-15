import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth } from "./Auth";

const Login: React.FC = () => {
  const auth = useContext(Auth);
  const navigate = useNavigate();

  const config = {
    redirect_uri: "http://127.0.0.1:3000/login",
    client_id: "Ov23li6sNCoj7N0JPeD5",
  };

  const oauth = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
    window.location.href = url;
  };

  const goToLogin = async (code: string) => {
    await axios.post("http://127.0.0.1:4000/login", { code });
    auth?.login(true);
    navigate("/list");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      goToLogin(code);
    }
  }, []);

  return <input type="button" value="登录" onClick={oauth} />;
};

export default Login;
