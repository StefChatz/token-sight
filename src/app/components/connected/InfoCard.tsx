const InfoCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4 m-2 shadow-lg dark:bg-gray-800 text-white">
      <h5 className="text-lg font-bold">{title}</h5>
      <p>{value}</p>
    </div>
  );
};

export default InfoCard;
