
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PhotoGallery from "@/components/memorial/PhotoGallery";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface GalleryPhoto {
  id: number | string;
  url: string;
  caption: string;
  author?: string;
}

// Sample memorial photos data
const memorialPhotos: GalleryPhoto[] = [
  {
    id: "mem1",
    url: "/memorial-photos/photo1.jpg",
    caption: "Family gathering at the lake house, summer 2018",
    author: "James Mureithi"
  },
  {
    id: "mem2",
    url: "/memorial-photos/photo2.jpg",
    caption: "Stephen's graduation ceremony",
    author: "Mary Wanjiku"
  },
  {
    id: "mem3",
    url: "/memorial-photos/photo3.jpg",
    caption: "Hiking trip to Mt. Kenya",
    author: "David Kimani"
  },
  {
    id: "mem4",
    url: "/memorial-photos/photo4.jpg",
    caption: "Christmas celebration, 2019",
    author: "Ann Muthoni"
  },
  {
    id: "mem5",
    url: "/memorial-photos/photo5.jpg",
    caption: "Stephen's 50th birthday party",
    author: "Paul Njoroge"
  },
  {
    id: "mem6",
    url: "/memorial-photos/photo6.jpg",
    caption: "Family reunion in Nairobi",
    author: "Sarah Wambui"
  },
  {
    id: "mem7",
    url: "/memorial-photos/photo7.jpg",
    caption: "Stephen playing with grandchildren",
    author: "Jane Njeri"
  },
  {
    id: "mem8",
    url: "/memorial-photos/photo8.jpg",
    caption: "At the family farm in Nyeri",
    author: "Michael Mwangi"
  },
  {
    id: "mem9",
    url: "/memorial-photos/photo9.jpg",
    caption: "Stephen's retirement party",
    author: "Elizabeth Njoki"
  },
  {
    id: "mem10",
    url: "/memorial-photos/photo10.jpg",
    caption: "Family visit to Nairobi National Park",
    author: "Peter Kamau"
  },
  {
    id: "mem11",
    url: "/memorial-photos/photo11.jpg",
    caption: "Sunday lunch after church service",
    author: "Grace Muthoni"
  },
  {
    id: "mem12",
    url: "/memorial-photos/photo12.jpg",
    caption: "Stephen at his daughter's wedding",
    author: "John Kariuki"
  },
  {
    id: "mem13",
    url: "/memorial-photos/photo13.jpg",
    caption: "Family trip to Mombasa beach",
    author: "Rebecca Wairimu"
  },
  {
    id: "mem14",
    url: "/memorial-photos/photo14.jpg",
    caption: "Stephen's community service award ceremony",
    author: "Joseph Maina"
  },
  {
    id: "mem15",
    url: "/memorial-photos/photo15.jpg",
    caption: "Family photo at brother's home in Nakuru",
    author: "Catherine Wangari"
  },
  {
    id: "mem16",
    url: "/memorial-photos/photo16.jpg",
    caption: "Stephen enjoying his favorite coffee at the local cafe",
    author: "Samuel Njoroge"
  },
  {
    id: "mem17",
    url: "/memorial-photos/photo17.jpg",
    caption: "Teaching grandchildren how to fish",
    author: "Ruth Nyambura"
  },
  {
    id: "mem18",
    url: "/memorial-photos/photo18.jpg",
    caption: "Stephen's 30th work anniversary celebration",
    author: "Daniel Kamau"
  },
  {
    id: "mem19",
    url: "/memorial-photos/photo19.jpg",
    caption: "Barbecue at the backyard, summer 2020",
    author: "Lucy Wanjiru"
  },
  {
    id: "mem20",
    url: "/memorial-photos/photo20.jpg",
    caption: "Last family portrait, December 2021",
    author: "Family"
  }
];

const PHOTOS_PER_PAGE = 12;

const GalleryPage = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPhotos, setUserPhotos] = useState<GalleryPhoto[]>([]);
  const [totalPhotos, setTotalPhotos] = useState<GalleryPhoto[]>([]);

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
          
          setUserPhotos(galleryPhotos);
        } else {
          // If no user photos found, set to empty array
          setUserPhotos([]);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        toast.error("Failed to load user photos");
        setUserPhotos([]);
      } finally {
        // Combine user submitted photos with memorial photos
        const combined = [...userPhotos, ...memorialPhotos];
        setTotalPhotos(combined);
        
        // Paginate the photos
        const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
        const endIndex = startIndex + PHOTOS_PER_PAGE;
        setPhotos(combined.slice(startIndex, endIndex));
        
        setIsLoading(false);
      }
    };

    fetchMemoriesWithPhotos();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPhotos.length / PHOTOS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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
          <>
            <PhotoGallery photos={photos} />
            
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)} 
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => handlePageChange(i + 1)}
                          isActive={currentPage === i + 1}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)} 
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
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
