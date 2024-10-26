
const PrescriptionSection = ({ sectionTitle, children }) => {
  return (
    <>
      <h2 className="text-right font-bold text-4xl mb-4">{sectionTitle}</h2>
      <div className="h-fit p-6 border-[1px] border-[#14B6DA] bg-white rounded-lg w-full">
        <div className={`mx-auto w-full`}>
          {children}
        </div>
      </div>
    </>

  );
}

export default PrescriptionSection;