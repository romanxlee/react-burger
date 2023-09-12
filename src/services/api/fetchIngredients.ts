import { BASE_URL } from "../../utils/consts";
import type { Ingredient } from "../../types";

export const fetchIngredients = async () => {
    return fetch(`${BASE_URL}/ingredients`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
            return res.data as Ingredient[];
        })
};