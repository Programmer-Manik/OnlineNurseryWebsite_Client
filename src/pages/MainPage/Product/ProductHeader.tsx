const ProductHeader = ({ title }: { title: any }) => {
  const productStyle = {
    background: "URL(https://i.ibb.co/grdvRy7/1709716968069.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%",
    backgroundAttachment: "Fixed",
  };
  return (
    <div
      style={productStyle}
      className="product min-h-80 flex justify-center items-center"
    >
      <h2 className="text-4xl font-semibold text-white">{title}</h2>
    </div>
  );
};

export default ProductHeader;
