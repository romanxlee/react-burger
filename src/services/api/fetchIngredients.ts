import type { Ingredient } from "../../types";
import { request } from "../../utils/checkResponse";

export const fetchIngredients = () =>
  request("ingredients", {}).then((res) => {
    return res.data as Ingredient[];
  });
