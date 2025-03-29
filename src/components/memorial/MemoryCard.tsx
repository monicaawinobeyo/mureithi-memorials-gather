
import { formatDistance } from "date-fns";

export interface Memory {
  id: number;
  author: string;
  content: string;
  date: string;
  photo?: string;
}

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard = ({ memory }: MemoryCardProps) => {
  const timeAgo = formatDistance(new Date(memory.date), new Date(), { 
    addSuffix: true 
  });

  return (
    <div className="memory-card">
      <div className="flex items-center mb-4">
        <div className="mr-4 h-10 w-10 bg-memorial-blue rounded-full flex items-center justify-center text-white font-bold">
          {memory.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-medium">{memory.author}</h3>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>
      </div>
      <p className="mb-4">{memory.content}</p>
      {memory.photo && (
        <div className="mt-4">
          <img
            src={memory.photo}
            alt="Memory"
            className="rounded-md w-full max-h-80 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
