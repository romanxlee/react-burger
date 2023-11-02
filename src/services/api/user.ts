import { BASE_URL } from "../../utils/consts";
import { Auth, User } from "../../types";
import { getCookie } from "../../utils/cookie";

export const getUser = async () => {
  return fetch(`${BASE_URL}/auth/user`, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((res) => {
      return res as Auth;
    });
};

export const updateUser = async (user: User) => {
  const token = getCookie("access");
  return fetch(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      user: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((res) => {
      return res as Auth;
    });
};
