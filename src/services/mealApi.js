import axios from 'axios';

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getMealsByFirstLetter = async (letter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?f=${letter}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by first letter:", error);
    return [];
  }
};

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
};

export const getMealsListById = async (ids) => {
  const meals = [];
  try {
    for(const id of ids) {
      const meal = await getMealById(id);
      if (meal) {
        meals.push(meal);
      }
    }
    return meals;
  }
  catch(error){
    console.error("Error fetching meals list by IDs:", error);
    return [];
  }
}

export const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};

export const getRandomMeal = async () =>{
  try{
    const response = await axios.get(`${API_BASE_URL}/random.php`)
    return response.data.meals[0];
  }
  catch(error){
    console.error("Error generating random meal:", error);
    return null;
  }
}