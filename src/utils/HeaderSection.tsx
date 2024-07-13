const HeaderSection = ({ title, des }) => {
  return (
    <div className="max-w-4xl flex flex-col justify-center items-center mx-auto px-6 sm:px-0">
      <img src="https://i.ibb.co/MCd4gnL/separator.png" alt="body-logo" />
      <h2 className="text-xl md:text-4xl font-semibold">{title}</h2>
      <p className="text-slate-600 flex items-center gap-6 justify-center mt-2">
        <span className="w-5 sm:w-16 h-[2px] bg-slate-200 block"></span>
        <span className="text-sm">{des}</span>
        <span className="w-5 sm:w-16 h-[2px] bg-slate-200 block"></span>
      </p>
    </div>
  );
};

export default HeaderSection;
