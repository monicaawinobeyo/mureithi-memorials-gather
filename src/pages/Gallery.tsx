
import Layout from "@/components/layout/Layout";
import PhotoGallery from "@/components/memorial/PhotoGallery";

const GalleryPage = () => {
  // Sample photo data - in a real app, this would come from an API or database
  const photos = [
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
        
        <PhotoGallery photos={photos} />
      </div>
    </Layout>
  );
};

export default GalleryPage;
