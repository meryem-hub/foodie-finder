import { ChefHat } from "lucide-react";
/**
 * IngredientsSection displays a list of ingredients and their measures for a given meal.
 * @param {Object} props
 * @param {Object} props.meal - The meal object containing ingredient and measure properties.
 */

const IngredientsSection = ({ meal }) => {
    const ingredients = Object.keys(meal)
        .filter(
            (key) =>
                key.startsWith("strIngredient") && meal[key] && meal[key].trim()
        )
        .map((key) => meal[key]);

    const measures = Object.keys(meal)
        .filter(
            (key) =>
                key.startsWith("strMeasure") && meal[key] && meal[key].trim()
        )
        .map((key) => meal[key]);

    const ingredientsList = ingredients.map((ingredient, index) => ({
        ingredient,
        measure: measures[index] || "",
    }));

    return (
        <div className="flex flex-col gap-4 p-4 max-h-96 rounded-lg bg-gray-200 border-2 border-gray-300 shadow-md">
            <p className="flex items-center font-medium text-md">
                <ChefHat className="w-5 inline-block mr-2" />
                Ingredients ({ingredients ? ingredients.length : 0})
            </p>
            <ul className="flex flex-col gap-0 h-full overflow-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {ingredientsList && ingredientsList.length > 0 ? (
                    ingredientsList.map((item, index) => (
                        <li
                            key={index}
                            className="py-4 border-b-2 border-gray-50/15"
                        >
                            <div className="flex justify-between">
                                <span className="text-md font-medium">
                                    {item.ingredient
                                        ? item.ingredient
                                        : "Unknown Ingredient"}
                                </span>
                                <span>{item.measure ? item.measure : ""}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="py-4 text-gray-400 text-center">
                        No ingredients available
                    </li>
                )}
            </ul>
        </div>
    );
}

export default IngredientsSection;