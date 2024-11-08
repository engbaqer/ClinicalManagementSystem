import PrescriptionSection from "./PrescriptionSections";
import dose from '../../images/hand-with-pill.svg'
import pharma from '../../images/pharma.svg'
import repeat from '../../images/repeat.svg'
import user_manual from '../../images/user-manual.svg'
import pills from '../../images/pills.svg'
import schedule from '../../images/schedule.svg'


const MedicineDetails = ({ prescriptions: medicine }) => {
  return (
    <div>
      <PrescriptionSection sectionTitle={'تفاصيل الدواء'}>
        <div>
          {/* table head */}
          <div className="grid grid-cols-6 items-center place-items-center px-2 mb-10">
            <HeaderCell text="التعليمات" icon={user_manual} />
            <HeaderCell text="مدة العلاج" icon={schedule} />
            <HeaderCell text="التكرار" icon={repeat} />
            <HeaderCell text="شكل الدواء" icon={pills} />
            <HeaderCell text="الجرعة" icon={dose} />
            <HeaderCell text="اسم الدواء" icon={pharma} />
          </div>
          {/* table body */}
          {
            medicine.map((medicine, index) => (
              <TableBodyRow key={index} medicine={medicine} />
            ))
          }
        </div>
      </PrescriptionSection>
    </div>
  );
}


const HeaderCell = ({ text, icon }) => (
  <div className="flex items-center">
    <span className="text-2xl mr-4 text-gray-400">{text}</span>
    <img src={icon} alt="" />
  </div>
);


const TableBodyRow = ({ medicine }) => (
  <div className="grid grid-cols-6 place-items-center px-2 my-4">
    <RowItem text={medicine.instructions} />
    <RowItem text={medicine.duration} />
    <RowItem text={medicine.frequency} />
    <RowItem text={medicine.form} />
    <RowItem text={medicine.dose} />
    <RowItem text={medicine.medicineName} />
  </div>
);

const RowItem = ({ text }) => (
  <div className="flex items-center">
    <span className="text-2xl">{text}</span>
  </div>
);


export default MedicineDetails;