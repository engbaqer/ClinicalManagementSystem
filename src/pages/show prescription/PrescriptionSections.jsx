
const PrescriptionSection = ({ sectionTitle, children, width = ''}) => {
  return (
    <section className="">
      <h2 className="text-right font-bold text-4xl mb-4">{sectionTitle}</h2>
      <div className="h-fit p-6 border-[1px] border-[#14B6DA] bg-white rounded-lg">
        <div className={`${width ? width : 'xl:w-[85%]'} mx-auto`}>
          {children}
        </div>
      </div>
    </section>
  );
}

export default PrescriptionSection;