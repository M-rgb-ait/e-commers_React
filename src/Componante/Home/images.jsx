export default function ImagesSection() {
  const ImagesTrusted = [
    { src: "/assets/images/image 36.png", alt: "Trusted Brand 1" },
    { src: "/assets/images/image 40.png", alt: "Trusted Brand 2" },
    { src: "/assets/images/image 41.png", alt: "Trusted Brand 3" },
    { src: "/assets/images/image 38.png", alt: "Trusted Brand 4" },
    { src: "/assets/images/image 39.png", alt: "Trusted Brand 5" },
    { src: "/assets/images/image 37.png", alt: "Trusted Brand 6" },
  ];

  return (
    <main className=" px-4">
      <div className="mt-10 rounded-2xl bg-red-50 dark:bg-zinc-700 py-12 px-6">
        {/* Title */}
        <h3 className="mb-10 text-center text-3xl md:text-4xl font-bold text-red-700 dark:text-pink-200">
          Trusted by{" "}
          <strong className="text-pink-500 dark:text-red-400">4.5K</strong>{" "}
          Customers
        </h3>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {ImagesTrusted.map((item) => (
            <div
              key={item.src}
              className="flex items-center justify-center transition hover:scale-105 duration-300"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-12 md:h-[55px] w-auto object-contain opacity-80 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
