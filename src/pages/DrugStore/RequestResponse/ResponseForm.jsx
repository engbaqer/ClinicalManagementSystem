import { useContext, useEffect, useState } from "react";
import send_icon from './send-icon.svg';
import axios from "axios";
import { ClinicalContext } from "../../auth/contextFile";


const initialFormData = {
  pharmacistName: '',
  requestDate: '',
  quantityRequested: '',
  notes: '',
  storageManagerName: '',
  storageStatus: '',
  drugs: [],
  responseDate: '',
  additionalNotes: ''
};

const ResponseForm = ({ request }) => {
  const { token } = useContext(ClinicalContext);

  const [formData, setFormData] = useState({
    pharmacistName: '',
    requestDate: '',
    quantityRequested: '',
    notes: '',
    storageManagerName: '',
    storageStatus: '',
    drugs: [],
    responseDate: '',
    additionalNotes: ''
  });

  // Initialize form data once `request` and `medicines` are available
  useEffect(() => {
    if (request && request.medicines) {
      setFormData({
        pharmacistName: request.pharmacistName || '',
        requestDate: request.requestDate || '',
        quantityRequested: request.medicines.reduce((acc, item) => acc + item.quantity, 0),
        notes: request.additionalNote || '',
        storageManagerName: '',
        storageStatus: '',
        drugs: request.medicines.map(med => ({
          drugName: med.drugName,
          drugForm: med.drugForm,
          availableQuantity: '',
          expirationDate: '',
          _id: med._id
        })),
        responseDate: '',
        additionalNotes: ''
      });
      console.log(formData);
    }
  }, [request]);

  const handleDrugChange = (index, e) => {
    const updatedDrugs = [...formData.drugs];
    updatedDrugs[index] = { ...updatedDrugs[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, drugs: updatedDrugs });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/pharmacist/respondToDrug/${request._id}`, formData, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
      });
      alert("تم إرسال الرد بنجاح");
      window.history.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-6 w-[90%] mx-auto mb-4">
      <FormHeader headerTitle={'معلومات المخزون'} />
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-xl font-medium">تاريخ الرد</label>
          <input
            type="date"
            value={formData.responseDate}
            name="responseDate"
            className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-2 text-xl font-medium">حالة المخزون</label>
          <select
            name="storageStatus"
            className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md text-gray-500"
            value={formData.storageStatus}
            required
            onChange={handleChange}
          >
            <option value='' selected disabled >اختر حالة المخزون</option>
            <option value="متوفر بالكامل">متوفر بالكامل</option>
            <option value="متوفر جزئيا">متوفر جزئيا</option>
            <option value="غير متوفر">غير متوفر</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xl font-medium">اسم أمين المخزن</label>
          <input
            type="text"
            name="storageManagerName"
            placeholder="اختر أمين المخزن"
            className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md placeholder-gray-500"
            required
            onChange={handleChange}
          />
        </div>

        {formData.drugs.map((drug, index) => (
          <div key={drug._id} className="grid grid-cols-4 col-span-3 gap-4">
            <div>
              <label className="block mb-2 text-xl font-medium">تاريخ انتهاء الصلاحية</label>
              <input
                type="date"
                name="expirationDate"
                value={drug.expirationDate}
                className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
                required
                onChange={(e) => handleDrugChange(index, e)}
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">الكمية المتوفرة</label>
              <input
                type="number"
                name="availableQuantity"
                value={drug.availableQuantity}
                className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
                required
                onChange={(e) => handleDrugChange(index, e)}
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">شكل الدواء</label>
              <input
                type="text"
                name="drugForm"
                value={drug.drugForm}
                className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">اسم الدواء</label>
              <input
                type="text"
                name="drugName"
                value={drug.drugName}
                className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
                required
                readOnly
              />
            </div>
          </div>
        ))}

        <div className="md:col-span-3">
          <label className="block mb-2 text-xl font-medium">ملاحظات إضافية</label>
          <textarea
            name="additionalNotes"
            className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md text-right"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="md:col-span-3 flex mt-4 gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-4"
          >
            <img src={send_icon} alt="send icon" />
            <span>أرسال رد</span>
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => setFormData(initialFormData)}
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

const FormHeader = ({ headerTitle }) => (
  <div className="py-4">
    <h2 className="text-[#14B6DA] text-4xl text-center mb-3">{headerTitle}</h2>
    <hr className="bg-black h-[2px]" />
  </div>
);




// import { useContext, useEffect, useState } from "react";
// import send_icon from './send-icon.svg'
// import axios from "axios";
// import { ClinicalContext } from "../../auth/contextFile";

// const ResponseForm = ({ request, requestId, medicineInfo }) => {
//   const { token } = useContext(ClinicalContext);
//   const [formData, setFormData] = useState({
//     pharmacistName: '',
//     requestDate: '',
//     drugName: '',
//     drugForm: '',
//     quantityRequested: '',
//     notes: '',
//     storageManagerName: '',
//     storageStatus: '',
//     expirationDate: '',
//     status: 'مكتمل',
//     responseDate: '',
//     availableQuantity: '',
//     additionalNotes: ''
//   });

//   // destructure the data after section is rendered & and request is here
//   useEffect(() => {
//     if (request && request.medicines) {
//       const { pharmacistName, requestDate, additionalNote: notes } = request;
//       const { drugName, drugForm, quantity: quantityRequested } = medicineInfo;
//       setFormData({ ...formData, drugName, drugForm, quantityRequested, notes, pharmacistName, requestDate })
//     }
//   }, [request, medicineInfo])

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Submit form data to the backend 
//     try {
//       const response = await axios.put(`http://localhost:4000/api/pharmacist/respondToDrug/${request._id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//     } catch (error) {
//       console.error(error)
//     }
//     alert("تم أرسال الرد بنجاح")

//     eraseForm();
//     window.history.back();
//   };

//   const handleCancel = () => {
//     // Logic to cancel the form or reset it
//     setFormData({
//       pharmacistName: '',
//       requestDate: '',
//       drugName: '',
//       drugForm: '',
//       quantityRequested: '',
//       notes: '',
//       storageManagerName: '',
//       storageStatus: '',
//       expirationDate: '',
//       status: 'مكتمل',
//       responseDate: '',
//       availableQuantity: '',
//       additionalNotes: ''
//     })

//   };

//   const eraseForm = () => {
//     setFormData({
//       pharmacistName: '',
//       requestDate: '',
//       drugName: '',
//       drugForm: '',
//       quantityRequested: '',
//       notes: '',
//       storageMangerName: '',
//       storageStatus: '',
//       expirationDate: '',
//       status: '',
//       responseDate: '',
//       availableQuantity: '',
//       additionalNotes: ''
//     });
//   }

//   return (
//     <div className="mt-6 w-[90%] mx-auto mb-4">
//       <FormHeader headerTitle={'معلومات المخزون'} />
//       <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right" onSubmit={handleSubmit}>
//         <div>
//           <label className="block mb-2 text-xl font-medium">تاريخ الرد</label>
//           <input
//             type="date"
//             value={formData.responseDate}
//             name="responseDate"
//             className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
//             required
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-xl font-medium">حالة المخزون</label>
//           <select
//             name="storageStatus"
//             className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md text-gray-500"
//             required
//             onChange={handleChange}
//           >
//             <option disabled selected>اختر حالة المخزون</option>
//             <option value="متوفر بالكامل">متوفر بالكامل</option>
//             <option value="متوفر جزئيا">متوفر جزئيا</option>
//             <option value="غير متوفر">غير متوفر</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 text-xl font-medium">اسم أمين المخزن</label>
//           <input
//             type="text"
//             name="storageManagerName"
//             placeholder="اختر أمين المخزن"
//             className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md placeholder-gray-500"
//             required
//             onChange={handleChange}
//           />
//         </div>

//         <div className="grid grid-cols-4 col-span-3 gap-4">
//           <div>
//             <label className="block mb-2 text-xl font-medium">تاريخ انتهاء الصلاحية</label>
//             <input
//               type="date"
//               name="expirationDate"
//               className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-xl font-medium">الكمية المتوفرة</label>
//             <input
//               type="number"
//               name="availableQuantity"
//               className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-xl font-medium">شكل الدواء</label>
//             <input
//               type="text"
//               name="drugForm"
//               value={formData.drugForm}
//               className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-xl font-medium">اسم الدواء</label>
//             <input
//               type="text"
//               name="drugName"
//               value={formData.drugName}
//               className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
//               required
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="md:col-span-3">
//           <label className="block mb-2 text-xl font-medium">ملاحظات إضافية</label>
//           <textarea
//             name="additionalNotes"
//             className="w-full p-2 border-[1px] border-[#14B6DA] rounded-md text-right"
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <div className="md:col-span-3 flex mt-4 gap-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-4"
//           >
//             <img src={send_icon} alt="send icon" />
//             <span>أرسال رد</span>
//           </button>
//           <button
//             type="button"
//             className="bg-gray-500 text-white px-4 py-2 rounded-md"
//             onClick={handleCancel}
//           >
//             إلغاء
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const FormHeader = ({ headerTitle }) => {
//   return (
//     <div className="py-4">
//       <h2 className="text-[#14B6DA] text-4xl text-center mb-3">{headerTitle}</h2>
//       <hr className="bg-black h-[2px]" />
//     </div>
//   )
// }

export default ResponseForm;