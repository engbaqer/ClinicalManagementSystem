import user_image from '../../images/user-image.svg';


const UserInfo = ({ name }) => {
  return (
    <div className="flex items-center gap-5 justify-self-end">
      <div className='flex flex-col gap-2'>
        <span className='text-gray-500'>أسم المريض</span>
        <span>{name}</span>
      </div>
      <img src={user_image} alt="User" className="h-14 rounded-full mr-4" />
    </div>
  );
};

export default UserInfo;