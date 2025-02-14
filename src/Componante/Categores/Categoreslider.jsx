
import useCategoreis from "../../CostamHooks/useCategoreis";
import LoderScreen from "../LoderScreen/LoderScreen";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function Categoreslider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };
  const {data, isLoading} = useCategoreis();

  const allCategores = data?.data.data;

  if (isLoading) {
    return <LoderScreen/>
  }






  
  return (
    <>

    <Slider {...settings} autoplay>
    {allCategores?.map(category => <Link  to={`/CategoresDitilels/${category._id}`}  key={category._id}>
      <img className="w-full h-72" src={category.image} alt="vas" />
      <h6>{category.name}</h6>
    </Link>)}
    </Slider>




    </>
  )
}
