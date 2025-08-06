
import axios from 'axios';

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getMealsByFirstLetter = async (letter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?f=${letter}`);
    console.log(response.data.meals);
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

export const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    console.log(response.data.categories);
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
