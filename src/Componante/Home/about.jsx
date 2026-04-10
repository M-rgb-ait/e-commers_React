import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const features = [
    "Competitive Shopping",
    "Premium Quality",
    "Perfect Occasion Gifts",
    "Fast Delivery",
  ];

  return (
    <main className="mt-16 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Images Section */}
        <div className="flex items-center justify-center gap-6 max-sm:flex-col">
          <img
            src="/assets/images/951.png"
            alt="Box Ribbon"
            className="h-[300px] md:h-[340px] w-[260px] md:w-[300px] object-cover rounded-3xl shadow-lg transition hover:scale-105"
          />

          <div className="flex flex-col gap-4">
            <img
              src="/assets/all_prend/mobiles.png"
              alt="Product"
              className="h-44 w-44 md:h-48 md:w-48 rounded-full object-cover shadow-md transition hover:scale-105"
            />

            <img
              src="/assets/images/953.png"
              alt="Balloons"
              className="h-32 w-44 md:h-36 md:w-48 object-cover rounded-2xl shadow-md transition hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[4px] text-pink-500">
            ABOUT
          </h2>

          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-red-700 leading-snug">
              Delivering <span className="text-pink-500">Moments</span> That
              Matter
            </h2>

            <p className="mt-3 text-sm md:text-base text-zinc-500 leading-relaxed">
              We make every message special with beautiful gifts and premium
              quality products.
            </p>
          </div>

          {/* Button */}
          <div className="mt-6">
            <Link to="/products">
              <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition">
                Discover
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="text-red-600" size={18} />
                <p className="text-sm md:text-base text-zinc-800 dark:text-zinc-200">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
