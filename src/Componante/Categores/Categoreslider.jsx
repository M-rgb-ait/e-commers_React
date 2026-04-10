import useCategoreis from "../../CostamHooks/useCategoreis";
import LoderScreen from "../LoderScreen/LoderScreen";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function Categoreslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1280, // lg
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024, // md
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // sm
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // xs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data, isLoading } = useCategoreis();
  const allCategores = data?.data?.data;

  if (isLoading) {
    return <LoderScreen />;
  }

  return (
    <div className="px-2">
      <Slider {...settings}>
        {allCategores?.map((category) => (
          <Link
            to={`/CategoresDitilels/${category._id}`}
            key={category._id}
            className="px-2"
          >
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={category.image}
              alt={category.name}
            />
            <h6 className="text-center mt-2 font-semibold">{category.name}</h6>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
