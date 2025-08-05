import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import heroImage from '../assets/images/image.png';

const HeroSection = () => {
  return (
    <section className="relative h-[84vh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Delicious food background"
          className="w-900 h-[110vh] py-4 object-cover scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-800/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl space-y-6">
<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
  Let us pick your <span className="text-orange-400">meal</span> 
  <span className="text-white"> for today!</span>
</h1>
<p className="text-xl text-gray-200 max-w-2xl mx-auto">
  Just tap and let the magic begin.
</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/random">
              <Button className="h-12 px-8 text-lg font-semibold text-white bg-gradient-to-r from-gray-800 via-gray-700 to-orange-500 hover:from-gray-700 hover:via-gray-600 hover:to-orange-400 transition-all duration-300">
                <Shuffle className="mr-2 h-5 w-5" />
                Surprise Me!
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;
