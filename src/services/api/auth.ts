import { request } from "../../utils/checkResponse";
import { Auth } from "../../types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
export const userRegister = async (
  email: string,
  password: string,
  name: string,
) => {
  return request("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
  }).then((res) => res as Auth);
};

export const userLogin = async (email: string, password: string) => {
  return request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((res: Auth) => {
    setCookie("refresh", res.refreshToken, { expires: 1200 });
    setCookie("access", res.accessToken, { expires: 1200 });
    return res;
  });
};

export const refreshToken = async (token: string) => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  });
};

export const userLogout = async () => {
  const token = getCookie("refresh");
  return request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  }).then(() => {
    deleteCookie("refresh");
    deleteCookie("access");
  });
};
