const axios = require("axios");

const githubConfig = {
  redirect_uri: "http://127.0.0.1:3000/login",
  client_id: "Ov23li6sNCoj7N0JPeD5",
  client_secret: "2ee848cb10db382be8c2a36891d2c2efbc736f6f",
};

const getAccessToken = async (code) => {
  if (!code || code.length !== 20) {
    throw new Error("code参数不正确！");
  }
  const response = await axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    params: {
      redirect_uri: githubConfig.redirect_uri,
      client_id: githubConfig.client_id,
      client_secret: githubConfig.client_secret,
      code,
    },
    headers: { accept: "application/json" },
  });
  console.log(response.data);
  return response.data;
};

const getUserInfo = async (token) => {
  const response = await axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data?.id) throw new Error("获取用户信息失败！");
  return response.data;
};

const login = async (code) => {
  const accessTokenInfo = await getAccessToken(code);
  const userInfo = await getUserInfo(accessTokenInfo.access_token);
  return userInfo;
};

module.exports = login;
