import React,{useEffect,useState,useContext} from 'react'
import arrow from './../../images/arrow.png'
import './../ProductAndPriceData/ProductAndPriceData.css'
import axios  from 'axios';
import { useParams } from 'react-router-dom';
import  {ClinicalContext}  from './../../pages/auth/contextFile';
function ProductAndPriceData(params) {
    const {token} =useContext(ClinicalContext)

    const [product, setProduct] = useState({});
    const {productId} = useParams();
    useEffect(() => {
        async function getProduct() {
          try {
            const response = await axios({
              method: "get",
              url: `http://localhost:4000/api/storage/products/${productId}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setProduct(response.data);
            console.log('Fetched Invoices:', response.data);
          
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
        getProduct();
    }, [productId]);

    return (
        <div className='store' >
            <div className='header'>
                <div className='arrow'><img src={arrow} alt=""  onClick={()=>{window.history.back()}}/></div>
                <div className='title'><h1>بيانات المنتج والسعر</h1></div>
                {/* empty div to make title in the center */}
                <div></div>
            </div>
            <div className='ProductDetails'>
                <h2 className="headOfProductDetails">
                    تفاصيل المنتج
                </h2>
                <table>
                    <thead>
                        <tr>
                        <td>الاسم</td>
                            <td>رقم المنتج</td>
                            <td>تاريخ الشراء</td>
                            <td>نوع المنتج</td>
                            <td>الكمية</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{product.productName}</td>
                            <td> {product.productName}</td>
                            <td>{product.purchaseDate}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                           
                        </tr>
                    </tbody>
                </table>
                <h3>الملاحظات</h3>
                <p className='description'>{product.description}</p>
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className='ProductDetails'>
                <h2 className="headOfProductDetails">
                تفاصيل التسعير
                </h2>
                <table>
                    <thead>
                        <tr>
                            <td>سعر البيع</td>
                            <td>سعر الشراء </td>
                            <td>اقل سعر للبيع </td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.sellingPrice}</td>
                            <td>{product.purchasePrice}</td>
                            <td>{product.minimumSellingPrice}</td>
                           
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <td>الخصم</td>
                            <td>نوع الخصم </td>
                            <td> السعر بعد الخصم</td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.discount}</td>
                            <td>{product.discountType}</td>
                            <td>{product.finalPrice}</td>
                           
                        </tr>
                    </tbody>
                </table>
               
            </div>
        </div>
    )
}


export default ProductAndPriceData

