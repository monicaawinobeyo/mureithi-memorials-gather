
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PhotoGallery from "@/components/memorial/PhotoGallery";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryPhoto {
  id: number | string;
  url: string;
  caption: string;
  author?: string;
}

const GalleryPage = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample photo data for default display
  const defaultPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen during our family trip to Mombasa, 2018"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen's retirement celebration, surrounded by colleagues"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Hiking in the Aberdare Forest, one of Stephen's favorite places"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen and Jane celebrating their 30th wedding anniversary"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen loved keeping up with technology"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen helping his granddaughter with her studies"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen giving a community talk on education"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      caption: "Stephen with his business partners at the company's 10th anniversary"
    }
  ];

  useEffect(() => {
    const fetchMemoriesWithPhotos = async () => {
      try {
        setIsLoading(true);
        
        // Fetch memories that have photos
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
          
          // Combine user-uploaded photos with default photos
          setPhotos([...galleryPhotos, ...defaultPhotos]);
        } else {
          // If no user photos found, use the default ones
          setPhotos(defaultPhotos);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        toast.error("Failed to load all photos");
        setPhotos(defaultPhotos);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemoriesWithPhotos();
  }, []);

  return (
    <Layout>
      <div className="memorial-container py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Photo Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of cherished moments and memories from Stephen's life. 
            Click on any photo to view it in full size.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-memorial-blue"></div>
          </div>
        ) : (
          <PhotoGallery photos={photos} />
        )}
      </div>
    </Layout>
  );
};

export default GalleryPage;
