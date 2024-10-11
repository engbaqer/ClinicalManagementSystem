

import arrow from './../../images/arrow.png'
import React,{useEffect,useContext,useState} from 'react'
import './theInvoice.css'
import { useParams } from 'react-router-dom';
import  {ClinicalContext}  from './../../pages/auth/contextFile';
import axios  from 'axios';
function theInvoice(params) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [invoice, setInvoice] = useState({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {ivoiceId} = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {token} =useContext(ClinicalContext)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        async function getinvoice() {
          try {
            const response = await axios({
              method: "get",
              url: `http://localhost:4000/api/invoice/fetchInvoice/${ivoiceId}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setInvoice(response.data);
            console.log('Fetched Invoices:', response.data);
            console.log(invoice)
          } catch (error) {
            if (error.response) {
              console.error("Error response data:", error.response.data);
            } else if (error.request) {
              console.error("Error request:", error.request);
            } else {
              console.error("Error message:", error.message);
            }
          }
        }
        getinvoice();
    }, [token]);
        

// date optimiz ///

const invoiceDate =new Date(invoice.invoiceDate);
const issueDate =new Date(invoice.issueDate);

const formattedDateForinvoiceDate = invoiceDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

  const formattedDateForissueDate = issueDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })


// date optimiz ///



    return (

        <div className="theInvoice store">

            <div className='header'>
                <div className='arrow'><img src={arrow} alt="" onClick={() => window.history.back()} /></div>
                <div className='title'><h1>الفاتورة</h1></div>
                {/* empty div to make title in the center */}
                <div></div>
            </div>
            <div className="informationsOfInvoice">
                <ul>
                    <li><h3>اسم المريض </h3>
                        <p>{invoice.patientName}</p></li>
                        <li><h3>تاريخ الفاتورة</h3>
                        <p>{formattedDateForinvoiceDate}</p></li>
                        <li><h3>تاريخ الاصدار</h3>
                        <p>{formattedDateForissueDate}</p></li>
                        <li><h3>طريقة الدفع</h3>
                        <p>نقدا</p></li>
                </ul>
                <ul>
                    <li><h3>الملاحظات  </h3>
                        <p> {invoice.notes} </p></li>
                      
                </ul>
                <ul>
                    <li><h3>نوع الاشتراك</h3>
                        <p>{invoice.items && invoice.items.length > 0 ? invoice.items[0].category : 'not available '}</p></li>
                        <li><h3> الوصف</h3>
                        <p>{invoice.items && invoice.items.length > 0 ? invoice.items[0].description : 'not available '}</p></li>
                        <li><h3> السعر</h3>
                        <p>{invoice.items && invoice.items.length > 0 ? invoice.items[0].price : 'not available '}</p></li>
                        <li><h3> العدد</h3>
                        <p>{invoice.items && invoice.items.length > 0 ? invoice.items[0].quantity : 'not available '}</p></li>
                        <li><h3> الاجمالي</h3>
                        <p>{invoice.items && invoice.items.length > 0 ? invoice.items[0].total : 'not available '}</p></li>
                </ul>
            </div>
        </div>
    )

}

export default theInvoice