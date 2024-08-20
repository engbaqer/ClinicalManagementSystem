import React, { useState } from 'react';
import './UserList.css';
import users from './dumydata.json';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuArrowLeftCircle } from "react-icons/lu";

function UserList() {
    const getInitialHeight = () => {
        if (window.innerWidth < 1600) {
            return '410px';
        }
        return '600px';
    };
    const [showtext, setShowtext] = useState('اظهار');
    const [showicon, setShowicon] = useState(<IoIosArrowDown />);
    const [showfilter, setShowfilter] = useState(false);
    const [wrapperheight, setWrapperheight] =  useState(getInitialHeight);

    
    // Filter states
    const [role, setRole] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered users
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleshowtext = () => {
        if (showtext === 'اظهار') {
            setShowtext('اخفاء');
            setShowicon(<IoIosArrowUp />);
            setShowfilter(true);
            if(window.innerWidth > 1600){
                setWrapperheight('370px');
            }
            else{
                setWrapperheight('220px');
            }
            
        } else {
            setShowtext('اظهار');
            setShowicon(<IoIosArrowDown />);
            setShowfilter(false);
            if(window.innerWidth > 1600){
                setWrapperheight('600px');
            }
            else{
                setWrapperheight('410px');
            }
        }
    };

    const handleSearch = () => {
        const result = users.filter(user => {
            return (
                (role ? user.role === role : true) &&
                (type ? user.jobTitle === type : true) &&
                (status ? user.status === status : true) &&
                (searchTerm ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            );
        });
        setFilteredUsers(result);
    };

    const handleReset = () => {
        setRole('');
        setType('');
        setStatus('');
        setSearchTerm('');
        setFilteredUsers(users);
    };

    return (
        <div className='User-container'>
            <i>
                <LuArrowLeftCircle className='back'
                    
                    onClick={() => window.history.back()}
                />
            </i>
            <header className='User-header'>
                <p>بحث وتصفية</p>
                <button onClick={handleshowtext}>
                    {showtext} {showicon}
                </button>
            </header>
            {showfilter && <div className="searchbar">
                <button className='add'>اضافة جديد</button>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">اختر الدوام الوظيفي</option>
                    {/* Add options here */}
                </select>
                <input
                    type="text"
                    placeholder='بحث'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                    <button onClick={handleSearch}>بحث</button>
                    <button onClick={handleReset}>اعادة تعيين</button>
                </span>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">اختر النوع</option>
                    {/* Add options here */}
                </select>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">اختر الحالة</option>
                    <option value="نشط">نشط</option>
                    <option value="غير نشط">غير نشط</option>
                </select>
            </div>}
            <main className='User-main'>
                <table className='table-header'>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'right', width: '18%' }}>الاسم</th>
                            <th style={{ textAlign: 'right', width: '20%' }}>الدور الورظيفي</th>
                            <th style={{ textAlign: 'right', width: '30%' }}>المسمى الوظيفي</th>
                            <th style={{ textAlign: 'right', width: '17%' }}>القسم</th>
                            <th style={{ textAlign: 'right', width: '8%' }}>الحالة</th>
                            <th style={{ textAlign: 'right' }}>ترتيب</th>
                        </tr>
                    </thead>
                </table>
                <div className='table-wrapper' style={{ height: wrapperheight }}>
                    <table className='User-table'>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td style={{ width: '300px' }}>{user.role}</td>
                                    <td>{user.jobTitle}</td>
                                    <td>{user.department}</td>
                                    <td>{user.status}</td>
                                    <td>{user.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default UserList;
