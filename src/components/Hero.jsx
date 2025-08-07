import React from "react";
import { useNavigate } from "react-router-dom";
import { Shuffle, Search, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/Buttons/button";
import heroImage from "../assets/images/image.png";
import { getRandomMeal } from "@/services/mealApi";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSurpriseMeClick = async () => {
    const randomMeal = await getRandomMeal();
    if (randomMeal?.idMeal) {
      navigate(`/meals/${randomMeal.idMeal}?random=true`, {
        state: { random: true },
      });
    } else {
      alert("Could not fetch a random meal. Please try again.");
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[84vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Delicious food background"
            className="w-full h-[110vh] object-cover scale-105 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-800/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Let us pick your <span className="text-yellow-400">meal</span> for today!
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Just tap and let the magic begin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={handleSurpriseMeClick}
                className="h-12 px-8 text-lg font-semibold text-white bg-gradient-to-r from-gray-800 via-gray-700 to-yellow-500 hover:from-gray-700 hover:via-gray-600 hover:to-yellow-400 transition-all duration-300"
              >
                <Shuffle className="mr-2 h-5 w-5" />
                Surprise Me!
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
        </div>
      </section>

    <section className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Explore a World of Flavors
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Browse our extensive collection of recipes from across the globe, find your next favorite dish, and cook with confidence using our easy-to-follow instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
            <Search className="w-14 h-14 text-yellow-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">1000+ Recipes</h3>
            <p className="text-gray-500 mt-2">from every corner of the world</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
            <Globe className="w-14 h-14 text-orange-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">25+ Countries</h3>
            <p className="text-gray-500 mt-2">savor international cuisine</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
            <Clock className="w-14 h-14 text-red-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">Step-by-step</h3>
            <p className="text-gray-500 mt-2">detailed, easy instructions</p>
          </div>
        </div>
      </section>    </>
  );
};

export default HeroSection;
