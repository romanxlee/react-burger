import { BASE_URL } from "../../utils/consts";
import { FeedOrder } from "../../types";

export const getOrderInfo = async (id: string | number) => {
  return fetch(`${BASE_URL}/orders/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((res) => {
      return res.orders[0] as FeedOrder;
    });
};
