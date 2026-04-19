import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TestimonialsPage() {
  const clients = [
    {
      photo: "/assets/client1.png",
      name: "Jake Miller",
      review: "Amazing service and fast delivery. Highly recommended!",
    },
    {
      photo: "/assets/client2.png",
      name: "Tyler Brooks",
      review: "Great quality products and excellent customer support.",
    },
    {
      photo: "/assets/client3.png",
      name: "Max Turner",
      review: "Everything was perfect from start to finish.",
    },
    {
      photo: "/assets/client4.jpg",
      name: "Isabelle Laurent",
      review: "Very professional and reliable service!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-10 bg-gray-50 my-11">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-pink-500">Testimonials</h2>
        <h3 className="text-3xl font-bold text-gray-800 mt-2">
          Real Words From Happy Customers
        </h3>
      </div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {clients.map((client, index) => (
            <div key={index} className="px-3 py-10">
              <div className="relative bg-white rounded-2xl shadow-lg p-6 pt-14 text-center overflow-visible">
                {/* IMAGE */}
                <div className="absolute left-1/2 -top-10 -translate-x-1/2">
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Name */}
                <h4 className="mt-5 text-lg font-semibold text-gray-800">
                  {client.name}
                </h4>

                {/* Stars */}
                <div className="flex justify-center gap-1 mt-2 text-yellow-500">
                  {"★★★★★".split("").map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {client.review}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
