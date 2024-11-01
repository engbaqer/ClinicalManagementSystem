// InputModal.js
import React, { useState } from 'react';

function InputModal({ show, onClose, onConfirm }) {
  const [inputValue, setInputValue] = useState('');

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="mb-2 text-lg font-semibold text-end">ادخل الاسم</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="الاسم"
          className="w-full p-2 mb-3 border rounded"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              onConfirm(inputValue);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            تاكيد
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            الغاء
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
