import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
const Footer = () => {
    return (
        <footer className="bg-amber-700 text-amber-50 border-t border-amber-700">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <img
                                alt="Foodie Finder"
                                className="h-6 w-6"
                                src="https://img.icons8.com/ios-filled/50/codechef.png"
                            />
                            Foodie Finder
                        </h3>
                        <p className="text-amber-200">
                            Discover, cook, and share delicious recipes from
                            around the world. Our mission is to make cooking
                            accessible and enjoyable for everyone.
                        </p>
                        <div className="flex gap-4">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 w-9 text-amber-50 hover:bg-amber-800">
                                <Facebook />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 w-9 text-amber-50 hover:bg-amber-800">
                                <Twitter />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 w-9 text-amber-50 hover:bg-amber-800">
                                <Instagram />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 w-9 text-amber-50 hover:bg-amber-800">
                                <Youtube />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Quick Links</h3>
                        <ul className="space-y-2 text-amber-200">
                            <li>
                                <a
                                    className="hover:text-amber-50 transition-colors"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-amber-50 transition-colors"
                                    href="/"
                                >
                                    Categories
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-amber-50 transition-colors"
                                    href="/favorites"
                                >
                                    Favorites
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-amber-50 transition-colors"
                                    href="/"
                                >
                                    Random meal
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Popular Categories</h3>
                        <ul className="space-y-2 text-amber-200">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-50 transition-colors"
                                >
                                    Desserts
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-50 transition-colors"
                                >
                                    Vegetarian
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-50 transition-colors"
                                >
                                    Chicken
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-50 transition-colors"
                                >
                                    Pasta
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-50 transition-colors"
                                >
                                    Quick Meals
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Newsletter</h3>
                        <p className="text-amber-200">
                            Subscribe to get weekly recipe inspiration and
                            cooking tips!
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                placeholder="Your email"
                                className="px-4 py-2 rounded bg-amber-800 border border-amber-700 text-amber-50 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                type="email"
                            />
                            <button
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow h-9 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white"
                                type="submit"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-amber-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-amber-300 text-sm mb-4 md:mb-0">
                        © 2025 Foodie Finder. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-amber-300 hover:text-amber-50 text-sm"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-amber-300 hover:text-amber-50 text-sm"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-amber-300 hover:text-amber-50 text-sm"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
