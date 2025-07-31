import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/imgs/slider-image-1.jpeg";
import img2 from "../../assets/imgs/slider-image-2.jpeg";
import img3 from "../../assets/imgs/slider-image-3.jpeg";
import img4 from "../../assets/imgs/slider-2.jpeg";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex">
      <div className="w-3/4">
        <Slider {...settings} autoplay>
          <div>
            <img className=" w-full h-72" src={img1} alt="" />
          </div>
          <div>
            <img className=" w-full h-72" src={img2} alt="" />
          </div>
          <div>
            <img className=" w-full h-72" src={img3} alt="" />
          </div>
          <div>
            <img className=" w-full h-72" src={img4} alt="" />
          </div>
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={img1} className="w-full h-36 block" alt="" />
        <img src={img2} className="w-full h-36 block" alt="" />
      </div>
    </div>
  );
}
