
const InfoColumn = ({ imgPath, columnTitle, columnData }) => {
  return (
    <div className='w-[100%] 2x:text-4xl text-2xl flex flex-col items-end mt-4'>
      <div className="flex items-center">
        <p className=' text-[#8B8B8B] mr-2'>{columnTitle}</p>
        <img src={imgPath} alt="" className="" />
      </div>
      <p className='mr-14 mt-4'>{columnData}</p>
    </div>
  )
}

export default InfoColumn;