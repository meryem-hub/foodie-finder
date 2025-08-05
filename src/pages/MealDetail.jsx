import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealById } from "@/services/mealApi";
import { Flag, Tag, Heart, ArrowLeft } from "lucide-react";

import ShareButton from "@/components/ui/Buttons/ShareButton";
import IngredientsSection from "@/components/MealDetail/IngredientsSection";
import VideoSection from "@/components/MealDetail/VideoSection";
import InstructionsSection from "@/components/MealDetail/InstructionsSection";

const MealDetail = () => {
    const { id } = useParams();

    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const data = await getMealById(id);
                if (data) {
                    setMeal(data);
                    console.log("Meal data:", data);
                } else {
                    setMeal(null);
                }
            } catch (err) {
                setError("Failed to fetch meal. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading meal...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (!meal) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-400 text-center">No meal found.</p>
            </div>
        );
    }

    return (
        <main className="p-6 w-full border-4">
            <Link
                to="/recipes"
                className="flex gap-1 w-fit text-yellow-500 py-1 px-2 rounded-md hover:bg-yellow-100 transition-colors"
            >
                <ArrowLeft className="w-4" /> Back
            </Link>
            <div className="flex flex-col gap-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-full">
                    {/* meal image */}
                    <div>
                        {meal.strMealThumb ? (
                            <img
                                src={meal.strMealThumb}
                                alt={
                                    meal.strMealAlternate ||
                                    meal.strMeal ||
                                    "Meal image"
                                }
                                className="w-full object-cover rounded-lg border-4 border-yellow-500 shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg border-4 border-yellow-500 shadow-lg">
                                <span className="text-gray-400 text-center">
                                    No image available
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Meal Detail Section */}
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-bold">
                            {meal.strMeal
                                ? meal.strMeal
                                : "Meal Name Unavailable"}
                        </h1>

                        {/* meal details */}
                        <div className="flex flex-wrap gap-2 text-sm font-medium">
                            {meal.strArea ? (
                                <span className="inline-flex items-center bg-yellow-500 text-white dark:bg-yellow-900 dark:text-gray-300 rounded-sm px-3 py-1">
                                    <Flag className="mr-2 h-4 w-4" />
                                    {meal.strArea}
                                </span>
                            ) : (
                                "Unavailable"
                            )}
                            {meal.strCategory ? (
                                <span className="inline-flex items-center bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100 rounded-sm px-3 py-1">
                                    <Tag className="mr-2 h-4 w-4" />
                                    {meal.strCategory}
                                </span>
                            ) : (
                                "Unavailable"
                            )}
                        </div>

                        {/* Action buttons  */}
                        <div className="flex gap-4">
                            <button className="flex px-4 py-2 text-xs bg-white rounded-sm border-2 border-yellow-500 hover:bg-gray-100 transition-colors font-medium">
                                <Heart className="mr-2 h-4 w-4" />
                                Add to Favorites
                            </button>
                            <ShareButton className={"text-black"} />
                        </div>

                        <IngredientsSection meal={meal} />
                    </div>
                </div>

                <VideoSection url={meal.strYoutube} />

                <InstructionsSection instructions={meal.strInstructions} />
            </div>
        </main>
    );
};

export default MealDetail;
