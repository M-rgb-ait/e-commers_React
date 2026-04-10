import HomeSelider from "../HomeSelider/HomeSelider";
// import Prodect from "../Prodect/Prodect";
import Categoreslider from "../Categores/Categoreslider";
import AboutSection from "./about";
import GallerySection from "./gallery";
import ImagesSection from "./images";
import FeaturesSection from "./feauter";
import TestimonialsPage from "./testimonial";

export default function Home() {
  return (
    <>
      <div className="container mx-auto mt-12">
        <div className="flex flex-col gap-5">
          <HomeSelider />
          <Categoreslider />
        </div>
        <FeaturesSection />
        <AboutSection />
        <GallerySection />
        <ImagesSection />
        <TestimonialsPage />

        {/* <Prodect /> */}
      </div>
    </>
  );
}
