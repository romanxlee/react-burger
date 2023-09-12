import { BASE_URL } from "../../utils/consts";
import type { Order } from "../../types";

export const createOrder = async (ingredients: string[]) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: ingredients})})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
            console.log(res)
            return res as Order;
        })
}
