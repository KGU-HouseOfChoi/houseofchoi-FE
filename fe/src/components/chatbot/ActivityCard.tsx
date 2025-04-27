interface ActivityCardProps {
  content: string;
}

const ActivityCard = ({ content }: ActivityCardProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-fit max-w-[80%]">
      <p className="text-gray-800 font-semibold">{content}</p>
    </div>
  );
};

export default ActivityCard;
