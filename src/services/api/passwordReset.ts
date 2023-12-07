import { request } from "../../utils/checkResponse";

export const passwordForgot = async (email: string) => {
  return request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: email }),
  });
};

export const passwordReset = async (password: string, token: string) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password: password, token: token }),
  });
};
