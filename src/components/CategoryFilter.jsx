import React, { useEffect, useState } from "react";
import { getMealCategories } from "@/services/mealApi"; 
import { Button } from "@/components/ui/Buttons/button";

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getMealCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <Button
          key={category.idCategory}
          variant={selectedCategory === category.strCategory ? "default" : "outline"}
          className={`capitalize px-3 py-2 font-medium border-2 ${
            selectedCategory === category.strCategory
              ? "bg-yellow-400 text-white border-yellow-600"
              : "border-gray-300 hover:bg-yellow-100 hover:text-yellow-800"
          }`}
          onClick={() => onSelectCategory(category.strCategory)}
        >
          {category.strCategory}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
