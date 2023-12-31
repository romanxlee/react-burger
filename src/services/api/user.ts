import { BASE_URL } from "../../utils/consts";
import { Auth, User } from "../../types";
import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "./fetchWithRefresh";

const token = getCookie("access");

export const getUser = async () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: String(token),
    },
  }).then((data: Auth) => {
    if (data.success) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const updateUser = async (user: User) => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: String(token),
    },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
      password: user.password,
    }),
  }).then((data: Auth) => {
    if (data.success) {
      return data;
    }
    return Promise.reject(data);
  });
};
