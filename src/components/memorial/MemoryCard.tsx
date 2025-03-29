
import { formatDistance } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export interface Memory {
  id: number | string;
  author: string;
  content: string;
  date: string;
  photo?: string;
}

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard = ({ memory }: MemoryCardProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  const timeAgo = formatDistance(new Date(memory.date), new Date(), { 
    addSuffix: true 
  });

  useEffect(() => {
    const fetchPhotoUrl = async () => {
      if (memory.photo) {
        try {
          const { data } = await supabase.storage
            .from('memorial_images')
            .getPublicUrl(memory.photo);
          
          if (data && data.publicUrl) {
            setPhotoUrl(data.publicUrl);
          }
        } catch (error) {
          console.error("Error fetching image URL:", error);
          setImageError(true);
        }
      }
    };

    fetchPhotoUrl();
  }, [memory.photo]);

  const handleImageError = () => {
    setImageError(true);
  };

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
      {photoUrl && !imageError && (
        <div className="mt-4">
          <img
            src={photoUrl}
            alt="Memory"
            className="rounded-md w-full max-h-80 object-cover"
            onError={handleImageError}
          />
        </div>
      )}
      {imageError && memory.photo && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-center text-gray-500">
          Image could not be loaded
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
