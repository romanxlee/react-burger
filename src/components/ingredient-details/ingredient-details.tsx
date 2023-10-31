import IngredientDetailsStyles from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks";
import { currentIngredient } from "../../services/slices/ingredientsSlice";

export const IngredientDetails = () => {
  const ingredient = useAppSelector(currentIngredient);

  return (
    <>
      <img
        src={ingredient?.image}
        alt={`Изображение ${ingredient?.name}`}
        className={IngredientDetailsStyles.image}
      />
      <span className="text text_type_main-medium mt-4 mb-8">
        {ingredient?.name}
      </span>
      <div className={IngredientDetailsStyles.details}>
        <div
          className={`${IngredientDetailsStyles.value} text text_color_inactive`}
        >
          <span className="text_type_main-small">Калории,ккал</span>
          <span className="text_type_digits-default">
            {ingredient?.calories}
          </span>
        </div>
        <div
          className={`${IngredientDetailsStyles.value} text text_color_inactive`}
        >
          <span className="text_type_main-small">Белки, г</span>
          <span className="text_type_digits-default">
            {ingredient?.proteins}
          </span>
        </div>
        <div
          className={`${IngredientDetailsStyles.value} text text_color_inactive`}
        >
          <span className="text_type_main-small">Жиры, г</span>
          <span className="text_type_digits-default">{ingredient?.fat}</span>
        </div>
        <div
          className={`${IngredientDetailsStyles.value} text text_color_inactive`}
        >
          <span className="text_type_main-small">Углеводы, г</span>
          <span className="text_type_digits-default">
            {ingredient?.carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
};
