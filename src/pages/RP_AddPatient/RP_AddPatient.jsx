import React,{useState} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RP_AddPatient.css';
import Arrow from '../../images/arrow-right 1.png';

function RP_AddPatient(){
    const [startDate, setStartDate] = useState(null);
    return(
        <div className="RP-container">
            <div className="RP-header">
                <img src={Arrow} alt="" className="Arrow"/>
                <h1>اضافة مريض</h1>
            </div>
            <form>
                <div>
                    <label for="name">الاسم الكامل</label>
                    <input type="text" name="name" className="long" required/>

                    <label for="gender">الجنس</label>
                    <input type="text" name="gender" className="short" />

                    <label for="age">العمر</label>
                    <input type="number" name="age" className="short"/>
                </div>

                <div>
                    <label for="phone">رقم الهاتف</label>
                    <input type="text" name="phone" className="long"/>

                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="تاريخ البداية"
                    className="date-picker"
                    />

                    <label for="ID">رقم الهوية</label>
                    <input type="text" name="ID" className="short"/>
                </div>
                <div>
                    <label for="email">البريد الالكتروني</label>
                    <input type="email" name="email" className="long" required/>

                    <input type="checkbox" name="" id="" />
                    <input type="checkbox" name="" id="" />

                </div>
                <div>
                    <label for="address">العنوان</label>
                    <textarea name="address" rows="1" cols="20" required/>

                    <label for="diagnosis">المرض</label>
                    <textarea name="diagnosis" rows="1" cols="20" required/>
                </div>
                
                <div>
                    <label for="notes">ملاحظات اخرى تود اضافتها عن المريض</label>
                    <textarea name="notes" id=""/>
                </div>

                <div>
                    <input type="submit" value="Submit"/>
                </div>

            </form>
        </div>
    )
}
export default RP_AddPatient;