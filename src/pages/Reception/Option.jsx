const Option = ({ imageLink, optionText }) => {
  return (
    <div className="bg-white p-10 grid place-items-center rounded-lg lg:w-[190px] lg:h-[190px] cursor-pointer  hover:bg-secondary-default relative overflow-hidden group transition-all 0.3s">
      <img
        src={imageLink}
        className="w-[50%] sm:w-[40%] md:w-[35%] lg:w-[50%]"
      />
      <h3 className="font-amiri lg:text-2xl">{optionText}</h3>
      <div className="lg:w-[30px] lg:h-[30px] bg-secondary-list absolute top-0 left-0 opacity-0 rounded-br-full rounded-bl-md group-hover:opacity-100 transition-opacity 0.3s"></div>
    </div>
  );
};

export default Option;
