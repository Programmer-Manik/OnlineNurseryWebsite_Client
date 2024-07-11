import { useGetProductsQuery } from "../../redux/features/product/productApi";
import HeaderSection from "../../utils/HeaderSection";

const NutrientsPlants = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const productData = data;

  const handleProduct = (id) => {
    console.log(id);
  };

  return (
    <div className="my-16 max-w-6xl mx-auto">
      <HeaderSection
        title="Welcome To Nutrients Plants"
        des="OURS PLANT HOUSE"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-12">
        {productData?.data.slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="text-center flex flex-col items-center gap-5 cursor-pointer"
            onClick={() => handleProduct(item._id)}
          >
            <img className="w-52" src={item.imageUrl} alt="" />
            <h3 className="font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutrientsPlants;
