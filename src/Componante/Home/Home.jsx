import HomeSelider from "../HomeSelider/HomeSelider";
import Prodect from "../Prodect/Prodect";
import Categoreslider from "../Categores/Categoreslider";

export default function Home() {
  return (
    <>
      <div className="container mx-auto mt-12">
        <div className="flex flex-col gap-5">
          <HomeSelider />
          <Categoreslider />
        </div>

        <Prodect />
      </div>
    </>
  );
}
