
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-gallery-item h-64 relative group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {photo.author && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium">{photo.author}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] p-0 bg-transparent border-none shadow-none">
          <div className="relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
            >
              <X size={20} />
            </button>
            {selectedPhoto && (
              <div>
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[70vh] w-auto mx-auto object-contain"
                />
                <div className="bg-white p-4 mt-2 rounded-md">
                  {selectedPhoto.author && (
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Shared by {selectedPhoto.author}
                    </p>
                  )}
                  <p className="text-center">{selectedPhoto.caption}</p>
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
