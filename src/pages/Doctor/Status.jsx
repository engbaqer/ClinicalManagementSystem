import wait_icon from '../../images/wait.svg';
import check_icon from '../../images/check.svg';

const Status = ({ subscriptionStatus }) => {
  return (
    <div className="flex items-center space-x-4 gap-4 justify-self-end">
      <img src={wait_icon} alt="Wait" className="h-10 cursor-pointer" />
      <img src={check_icon} alt="Check" className="h-10 cursor-pointer" />
      <div>
        <p className="w-[200px] text-center">{subscriptionStatus}</p>
      </div>
    </div>
  );
};

export default Status;
