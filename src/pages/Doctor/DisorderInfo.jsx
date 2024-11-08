const DisorderInfo = ({ disorder }) => {
  return (
    <div className="justify-self-end">
      <div className="flex flex-col gap-2">
        <p className="text-gray-500">المرض</p>
        <p>{disorder}</p>
      </div>
    </div>
  );
};

export default DisorderInfo;