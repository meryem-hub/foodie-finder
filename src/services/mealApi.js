import axios from "axios"

const API = "https://www.themealdb.com/api/json/v1/1"

export const searchMeals = (query) => axios.get(`${API}/search.php?s=${query}`)
export const getMealById = (id) => axios.get(`${API}/lookup.php?i=${id}`)
export const getCategories = () => axios.get(`${API}/categories.php`)
export const getCountries = () => axios.get(`${API}/list.php?a=list`)
