import user_icon from '../../images/user-icon.svg';
import email_icon from '../../images/email.png';
import phone_icon from '../../images/phone-icon.svg';
import calender_icon from '../../images/calender.svg';


const SideInfo = ({ patientMainInfo }) => {
  return (
    <div className="bg-white min-h-[450px] min-w-[250px] col-span-1 flex flex-col justify-center items-center p-5 rounded-xl border border-black">
      {/* img and patient name */}
      <div className="">
        <img src={user_icon} alt="user image" className="h-24 mx-auto" />
        <h2 className="text-right xl:text-3xl lg:2xl mt-5">
          {patientMainInfo.fullName}
        </h2>
      </div>

      {/* divider */}
      <hr className="w-[75%] mx-auto border-[#4985BC] mt-4 border-2" />

      {/* patient contact info */}
      <div className="mt-5">
        <Contact iconLink={email_icon} contactText={patientMainInfo.email} />
        <Contact
          iconLink={phone_icon}
          contactText={patientMainInfo.phoneNumber}
        />
        <Contact
          iconLink={calender_icon}
          contactText={patientMainInfo.birthDate}
        />
      </div>
    </div>
  );
};

const Contact = ({ iconLink, contactText }) => {
  return (
    <div className="flex items-center gap-4 mt-5">
      <img src={iconLink} alt="" className="2xl:h-10 xl:h-6" />
      <p className="xl:text-xl">{contactText}</p>
    </div>
  );
};

export default SideInfo;
