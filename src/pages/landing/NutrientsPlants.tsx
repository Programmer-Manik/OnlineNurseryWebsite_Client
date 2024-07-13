import { Skeleton } from "antd";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import HeaderSection from "../../utils/HeaderSection";

const NutrientsPlants = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const productData = data;

  return (
    <div className="my-16 max-w-6xl mx-auto">
      <HeaderSection
        title="Welcome To Nutrients Plants"
        des="OURS CATEGORY PLANT HOUSE"
      />
      {isLoading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-12 gap-y-12 ">
          {productData?.data.slice(0, 4).map((item: any) => (
            <div
              key={item._id}
              className="text-center flex flex-col items-center gap-5 cursor-pointer"
            >
              <img className="w-52" src={item.imageUrl} alt="" />
              <h3 className="font-semibold">{item.category}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NutrientsPlants;
