import { BASE_URL } from "../../utils/consts";
import { fetchWithRefresh } from "./fetchWithRefresh";
import { getCookie } from "../../utils/cookie";

export const createOrder = async (ingredients: string[]) => {
  const token = getCookie("access");
  return fetchWithRefresh(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: String(token),
    },
    body: JSON.stringify({ ingredients: ingredients }),
  }).then((data) => {
    if (data.success) {
      return data;
    }
    return Promise.reject(data);
  });
};
