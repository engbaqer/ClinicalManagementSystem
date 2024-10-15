import { useState } from "react";
import send_icon from './send-icon.svg'

const ResponseForm = () => {
  const [formData, setFormData] = useState({
    warehouseKeeperName: '',
    stockStatus: '',
    responseDate: '',
    medicineName: '',
    medicineForm: '',
    availableQuantity: '',
    expiryDate: '',
    additionalNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to the backend using Axios or Fetch
    console.log('Form data submitted: ', formData);
  };

  const handleCancel = () => {
    // Logic to cancel the form or reset it
    setFormData({
      warehouseKeeperName: '',
      stockStatus: '',
      responseDate: '',
      medicineName: '',
      medicineForm: '',
      availableQuantity: '',
      expiryDate: '',
      additionalNotes: ''
    });
  };
  return (
    <div className="mt-6 w-[90%] mx-auto mb-4">
      <FormHeader headerTitle={'معلومات المخزون'} />
      <form class="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
        <div>
          <label class="block mb-2 text-xl font-medium">تاريخ الرد</label>
          <input
            type="date"
            name="responseDate"
            class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
            required
          />
        </div>

        <div>
          <label class="block mb-2 text-xl font-medium">حالة المخزون</label>
          <select
            name="stockStatus"
            class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md text-gray-500"
            required
          >
            <option value="" disabled selected>اختر حالة المخزون</option>
            <option value="متوفر بالكامل">متوفر بالكامل</option>
            <option value="متوفر جزئيا">متوفر جزئيا</option>
            <option value="غير متوفر">غير متوفر</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-xl font-medium">اسم أمين المخزن</label>
          <input
            type="text"
            name="warehouseKeeperName"
            placeholder="اختر أمين المخزن"
            class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md placeholder-gray-500"
            required
          />
        </div>

        <div className="grid grid-cols-4 col-span-3 gap-4">
          <div>
            <label class="block mb-2 text-xl font-medium">تاريخ انتهاء الصلاحية</label>
            <input
              type="date"
              name="expiryDate"
              class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
              required
            />
          </div>

          <div>
            <label class="block mb-2 text-xl font-medium">الكمية المتوفرة</label>
            <input
              type="number"
              name="availableQuantity"
              class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
              required
            />
          </div>

          <div>
            <label class="block mb-2 text-xl font-medium">شكل الدواء</label>
            <input
              type="text"
              name="medicineForm"
              class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
              required
            />
          </div>

          <div>
            <label class="block mb-2 text-xl font-medium">اسم الدواء</label>
            <input
              type="text"
              name="medicineName"
              class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
              required
            />
          </div>
        </div>

        <div class="md:col-span-3">
          <label class="block mb-2 text-xl font-medium">ملاحظات إضافية</label>
          <textarea
            name="additionalNotes"
            class="w-full p-2 border-[1px] border-[#14B6DA] rounded-md"
          ></textarea>
        </div>

        <div class="md:col-span-3 flex mt-4 gap-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-4"
          >
            <img src={send_icon} alt="send icon" />
            <span>أرسال رد</span>
          </button>
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}

const FormHeader = ({ headerTitle }) => {
  return (
    <div className="py-4">
      <h2 className="text-[#14B6DA] text-4xl text-center mb-3">{headerTitle}</h2>
      <hr className="bg-black h-[2px]" />
    </div>
  )
}

export default ResponseForm;