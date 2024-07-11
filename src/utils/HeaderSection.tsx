const HeaderSection = ({ title, des }) => {
  return (
    <div className="max-w-4xl flex flex-col justify-center items-center mx-auto">
      <img src="https://i.ibb.co/MCd4gnL/separator.png" alt="body-logo" />
      <h2 className="text-4xl font-semibold">{title}</h2>
      <p className="text-slate-600 flex items-center gap-6 justify-center mt-2">
        <span className="w-16 h-[2px] bg-slate-200 block"></span>
        {des} <span className="w-16 h-[2px] bg-slate-200 block"></span>
      </p>
    </div>
  );
};

export default HeaderSection;
