import axios from "axios";

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
export const getMealCategories = async () => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching meal categories:", error);
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
  try {
    const promises = ids.map(id => getMealById(id));
    const results = await Promise.all(promises);
    return results;
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

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list.php?a=list`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getMealsByCountry = async (country) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php?a=${country}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by country:", error);
    return [];
  }
};

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    return response.data.meals[0];
  } catch (error) {
    console.error("Error generating random meal:", error);
    return null;
  }
};
