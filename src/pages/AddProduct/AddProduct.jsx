import React from 'react'
import arrow from './../../images/arrow.png'
import { useState,useContext } from 'react'
import arrowForInput from './../../images/arrow-of-search.png'
import './../AddProduct/AddProduct.css'
import Save from './../../images/save-instagram 1.png'
import Print from './../../images/printer (1) 1.png'
import axios  from 'axios';
import  {ClinicalContext}  from './../../pages/auth/contextFile';
function AddProduct(params) {
    const {token} =useContext(ClinicalContext)
    // Using state to manage toggle and input values
    const [toggle, setToggle] = useState({ toggle1: '', toggle2: '' })
    const [inputValues, setInputvalue] = useState({
        "productName": "",
        "purchaseDate": "",
        "description": "",
        "category": "",
        "quantity": 0,
        "productNumber": "",
        "barcode": "",
        "purchasePrice": 0,
        "sellingPrice": 0,
        "minimumSellingPrice": 0,
        "discount": 0,
        "discountType": "percentage",
        "finalPrice": 0
      })

    // Function to update input values dynamically
    function setValue(key, value) {
        setInputvalue((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    }
    console.log(inputValues)
/////////////////////////////////////////////////////////////////////////////////////////////////

async function saveData(event) {
    event.preventDefault();
    try {
        const response = await axios.post(
        "http://localhost:4000/api/storage/products",
        inputValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data saved successfully:", response.data);
      alert("تم اضافة المنتج بنجاح ");
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        
      } else if (error.request) {
        console.error("Network Error: No response received from the server.");
        
      } else {
        console.error("Error setting up request:", error.message);
    
      }
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////





    return(
        <div className='store'>
            {/* Header section with an arrow icon and a centered title */}
            <div className='header'>
                <div className='arrow'>
                    <img src={arrow} alt="" onClick={()=>window.history.back()} />
                </div>
                <div className='title'>
                    <h1>اضافة منتج</h1>
                </div>
                {/* Empty div to help center the title */}
                <div></div>
            </div>

            {/* First section containing product details form */}
            <div className='firstContener'>
                <div className='headOfFirstContainer'>
                    <div className="addToStore">
                        <div className="navOfHeadOfFirstContainer">
                            <div style={{ "height": "43px" }}></div>
                            <div className='searchAndFilter'>
                                <p>تفاصيل المنتج</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product details input fields */}
                <div className="inputsSearch" style={{ "height": "100%", "margin": '0' }}>
                    <form action="">
                        <div className="lineOfinput setNewMargin">
                            {/* Input for purchase date */}
                            <div className='DivForInputs'>
                               <label htmlFor="">تاريخ الشراء</label>
                               <input type="date" placeholder='تاريخ الشراء'  onChange={(e)=>{setValue("purchaseDate",e.target.value)}} />
                            </div>
                            {/* Input for product name */}
                            <div className='DivForInputs'>
                               <label htmlFor=""> الاسم</label>
                               <input type="text"  onChange={(e)=>{setValue("productName",e.target.value)}} />
                            </div>
                        </div>

                             {/* ///////////////////// input expiry and batch number ///////////////*/}
                             <div className="lineOfinput setNewMargin">
                            {/* Input for purchase date */}
                            <div className='DivForInputs'>
                               <label htmlFor="">تاريخ انتهاء صلاحية المنتج</label>
                               <input type="date" placeholder='تاريخ النفاذ'  />
                            </div>
                            {/* Input for product name */}
                            <div className='DivForInputs'>
                               <label htmlFor=""> رقم الوجبة</label>
                               <input type="number" />
                            </div>
                        </div>
                             
                             {/* ///////////////////// ///////////////*/}

                        {/* Textarea for product description */}
                        <div className="lineOfinput setNewMargin">
                            <textarea placeholder='الوصف ...'  onChange={(e)=>{setValue("description",e.target.value)}}></textarea>
                        </div>

                        <div className="lineOfinput setNewMargin">
                            {/* Input for product quantity */}
                            <div className='DivForInputs quantityProudNum'>
                                <label htmlFor=""> الكمية</label>
                                <input type="number"  onChange={(e)=>{setValue("quantity",parseInt(e.target.value))}}  />
                                <label htmlFor=""> الكود </label>
                                <input type="text"  onChange={(e)=>{setValue("productNumber",e.target.value)}}  />
                            </div>
                            {/* Dropdown input for product type */}
                            <div className='DivForInputs'>
                                <label htmlFor="">نوع المنتج</label>
                                <div className='divForSlectInput' onClick={() => {
                                    setToggle((prevState) => ({
                                        ...prevState,
                                        toggle2: prevState.toggle2 === '' ? 'toggle' : '',
                                    }));
                                }}>
                                    <img src={arrowForInput} alt="" className={toggle.toggle2} />
                                    <input value={inputValues.category} className='selectInput' type="text" readOnly />
                                    <ul className={`${toggle.toggle2 === 'toggle' ? 'display' : ''}`}>
                                        <li onClick={() => { setValue('category', 'دواء') }}>دواء</li>
                                        <li onClick={() => { setValue('category', 'مستلم') }}>مستلم</li>
                                        <li onClick={() => { setValue('category', 'ادوات طبية') }}>ادوات طبية</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Second section for pricing details */}
            <div className='firstContener'>
                <div className='headOfFirstContainer'>
                    <div className="addToStore">
                        <div className="navOfHeadOfFirstContainer">
                            <div style={{ "height": "43px" }}></div>
                            <div className='searchAndFilter'>
                                <p>تفاصيل التسعير</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing input fields */}
                <div className="inputsSearch" style={{ "height": "100%", "margin": '0' }}>
                    <form action="">
                        <div className="lineOfinput setNewMargin">
                            {/* Input for sale price */}
                            <div className='DivForInputs'>
                               <label htmlFor=""> سعر البيع</label>
                               <input type="number"  onChange={(e)=>{setValue("sellingPrice",parseInt(e.target.value))}} />
                            </div>
                            {/* Input for purchase price */}
                            <div className='DivForInputs'>
                               <label htmlFor=""> سعر الشراء</label>
                               <input type="number"  onChange={(e)=>{setValue("purchasePrice",parseInt(e.target.value))}} />
                            </div>
                        </div>
                        
                        {/* Input for discount type and discount */}
                        <div className="lineOfinput setNewMargin">
                            <div className='NewDivForInputs'>
                                <div>
                                    <label htmlFor=""> نوع الخصم</label>
                                    <input type="text" placeholder='%'  onChange={(e)=>{setValue("discountType",e.target.value)}} />
                                </div>
                                <div>
                                    <label htmlFor="">  الخصم</label>
                                    <input type="number"  onChange={(e)=>{setValue("discount",parseInt(e.target.value))}} />
                                </div>
                            </div>
                            {/* Input for minimum sale price */}
                            <div className='DivForInputs'>
                                <label htmlFor="">  اقل سعر للبيع</label>
                                <input type="number"  onChange={(e)=>{setValue("minimumSellingPrice",parseInt (e.target.value))}}  />
                            </div>
                        </div>

                        <div className="lineOfinput setNewMargin">
                            {/* Buttons for save and print functionality */}
                            <div className='NewDivForInputs'>
                                <button onClick={(e)=>(saveData(e))}>
                                    <img src={Save} alt="" />
                                    <p>حفظ</p>
                                </button>
                                <div>
                                    <button>
                                        <img src={Print} alt="" />
                                        <p>طباعة</p>
                                    </button>
                                </div>
                            </div>
                            {/* Input for price after discount */}
                            <div className='DivForInputs'>
                                <label htmlFor="">  السعر بعد الخصم</label>
                                <input type="number"  onChange={(e)=>{setValue("finalPrice",parseInt(e.target.value))}} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
