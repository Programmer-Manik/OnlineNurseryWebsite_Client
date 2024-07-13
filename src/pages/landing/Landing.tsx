import Banner from "./Banner";
import ImageGallery from "./ImageGallery";
import NutrientsPlants from "./NutrientsPlants";
import OfferSection from "./OfferSection";
import Products from "./Products";

const Landing = () => {
  return (
    <div>
      <Banner />
      <NutrientsPlants />
      <Products />
      <OfferSection />
      <ImageGallery />
    </div>
  );
};

export default Landing;
