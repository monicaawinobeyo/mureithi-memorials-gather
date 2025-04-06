
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Photo {
  id: number | string;
  url: string;
  caption: string;
  author?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="mb-4 bg-gray-100 p-6 rounded-full">
          <Upload size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-serif font-medium text-gray-700 mb-2">No photos yet</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          Be the first to share photos and memories of Stephen Mureithi.
        </p>
        <Button asChild className="bg-memorial-blue hover:bg-memorial-darkblue">
          <Link to="/memories">Share Photos & Memories</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-gallery-item h-48 sm:h-56 md:h-64 relative group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {photo.author && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs sm:text-sm font-medium truncate">{photo.author}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-lg md:max-w-2xl max-h-[90vh] p-0 bg-transparent border-none shadow-none mx-2 sm:mx-auto">
          <div className="relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 z-10"
            >
              <X size={20} />
            </button>
            {selectedPhoto && (
              <div>
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[60vh] w-auto mx-auto object-contain"
                />
                <div className="bg-white p-3 md:p-4 mt-2 rounded-md">
                  {selectedPhoto.author && (
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Shared by {selectedPhoto.author}
                    </p>
                  )}
                  <p className="text-center text-sm md:text-base">{selectedPhoto.caption}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
