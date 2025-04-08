import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PhotoGallery from "@/components/memorial/PhotoGallery";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface GalleryPhoto {
  id: number | string;
  url: string;
  caption: string;
  author?: string;
}

const GalleryPage = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemoriesWithPhotos = async () => {
      try {
        setIsLoading(true);
        
        // Fetch only memories that have photos
        const { data: memories, error } = await supabase
          .from('memories')
          .select('*')
          .not('photo_path', 'is', null)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (memories && memories.length > 0) {
          // Transform memories with photos into the GalleryPhoto format
          const galleryPhotos: GalleryPhoto[] = await Promise.all(
            memories.map(async (memory) => {
              // Get the public URL for each photo
              const { data } = await supabase.storage
                .from('memorial_images')
                .getPublicUrl(memory.photo_path);
              
              return {
                id: memory.id,
                url: data.publicUrl,
                caption: memory.content,
                author: memory.author
              };
            })
          );
          
          setPhotos(galleryPhotos);
        } else {
          // If no user photos found, show empty state
          setPhotos([]);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        toast.error("Failed to load photos");
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemoriesWithPhotos();
  }, []);

  return (
    <Layout>
      <div className="memorial-container py-8 md:py-12 px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4">Photo Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of cherished moments and memories from Stephen's life. 
            Click on any photo to view it in full size.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-memorial-blue"></div>
          </div>
        ) : photos.length > 0 ? (
          <PhotoGallery photos={photos} />
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No photos shared yet</h3>
            <p className="text-gray-500">Be the first to share a memory with a photo on the Memories page</p>
            <div className="mt-6">
              <Button asChild className="bg-memorial-blue hover:bg-memorial-darkblue">
                <Link to="/memories">Share a Memory</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GalleryPage;
