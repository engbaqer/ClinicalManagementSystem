import Option from './Option.jsx';
import addPatient from '../../images/addpatient.png';
import patientList from '../../images/listPatient.png'
import addBill from '../../images/addinvoice.png'
import bills from '../../images/invoice.png'


const OptionList = () => {
  return (
    <div className=" grid grid-cols-2 p-4 place-items-center gap-4">
      <Option imgLink={addPatient} optionText={'اضافة مريض'} />
      <Option imgLink={patientList} optionText={"قائمة المرضى"} />
      <Option imgLink={addBill} optionText={'اضافة فاتورة'} />
      <Option imgLink={bills} optionText={'الفواتير'} />
    </div>
  );
};

export default OptionList;
