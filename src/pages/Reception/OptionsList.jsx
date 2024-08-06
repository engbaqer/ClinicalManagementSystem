import addPatient from '../../images/addpatient.png';
import bills from '../../images/addinvoice(1).png';
import patientsList from '../../images/listPatient.png';
import addBill from '../../images/invoice.png';
import Option from './Option';

const OptionsList = () => {
  return (
    <section className=" grid grid-cols-2 max-w-[600px] gap-y-10 place-items-center p-2 mx-auto ">
      <Option imageLink={addPatient} optionText={'أضافة مريض'} />
      <Option imageLink={patientsList} optionText={'قائمة المرضى'} />
      <Option imageLink={addBill} optionText={'اضافة فاتورة'} />
      <Option imageLink={bills} optionText={'قائمة الفواتير'} />
    </section>
  );
};

export default OptionsList;
