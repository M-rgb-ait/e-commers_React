export default function GallerySection() {
  const ImagesGallery = [
    { src: "/assets/images/image 2.png", value: true, alt: "Gift Boxes" },
    { src: "/assets/images/image 3.png", value: false, alt: "Gift Boxes" },
    { src: "/assets/images/image 8.png", value: false, alt: "Gift Boxes" },
    { src: "/assets/images/Frame 78.png", value: true, alt: "Gift Boxes" },
    { src: "/assets/images/Frame 76.png", value: false, alt: "Gift Boxes" },
    { src: "/assets/images/Frame 80.png", value: true, alt: "Gift Boxes" },
  ];

  return (
    <main className="mb-12 mt-12 px-4 py-8">
      {/* Title */}
      <div className="relative mb-10 text-center">
        <h2 className="text-sm md:text-base font-bold uppercase tracking-[4px] text-pink-500">
          Gallery
        </h2>

        <p
          className="relative mt-3 inline-block text-2xl md:text-4xl font-bold text-red-700
          before:absolute before:bottom-0 before:left-0 before:-z-10
          before:h-1/2 before:w-[75%] before:rounded-full before:bg-pink-100
          after:absolute after:bottom-0 after:left-0 after:h-[3px]
          after:w-[30%] after:bg-pink-600"
        >
          Check Out Our Gallery
        </p>
      </div>

      {/* Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {ImagesGallery.map((item) => (
          <div
            key={item.src}
            className={`relative w-full overflow-hidden rounded-2xl shadow-md
              transition-transform duration-300 hover:scale-[1.03]
              ${item.value ? "h-[500px] md:h-[600px]" : "h-[220px] md:h-[260px]"}
            `}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
