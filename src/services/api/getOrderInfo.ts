import { request } from "../../utils/checkResponse";
import { FeedOrder } from "../../types";

export const getOrderInfo = async (id: string | number) => {
  return request(`orders/${id}`, {}).then((res) => {
    return res.orders[0] as FeedOrder;
  });
};
