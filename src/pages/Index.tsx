
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <section className="relative bg-memorial-cream py-16 md:py-24">
        <div className="memorial-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
                Celebrating the Life of<br />Stephen Mureithi
              </h1>
              <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                A beloved father, husband, brother, and friend who touched countless lives with his kindness, wisdom, and generous spirit.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button asChild className="bg-memorial-blue hover:bg-memorial-darkblue">
                  <Link to="/gallery">View Photos</Link>
                </Button>
                <Button asChild variant="outline" className="border-memorial-blue text-memorial-blue hover:bg-memorial-blue/10">
                  <Link to="/memories">Share Memories</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[400px] animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Stephen Mureithi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="memorial-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Recent Memories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Family and friends share their cherished moments with Stephen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="memory-card">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-10 w-10 bg-memorial-blue rounded-full flex items-center justify-center text-white font-bold">
                    {["J", "M", "A"][i-1]}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{["Jane Mureithi", "Michael Kamau", "Alice Njeri"][i-1]}</h3>
                    <p className="text-sm text-gray-500">{["2 days ago", "1 week ago", "2 weeks ago"][i-1]}</p>
                  </div>
                </div>
                <p>{[
                  "Dad always knew how to make us laugh, even during the hardest times. His strength and humor will forever be with us.",
                  "Stephen was more than a colleague; he was a mentor and a dear friend. His advice shaped my career and his kindness touched my heart.",
                  "My brother had the biggest heart. Always the first to help others, never asking for anything in return. I miss our long talks."
                ][i-1]}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" className="border-memorial-blue text-memorial-blue hover:bg-memorial-blue/10">
              <Link to="/memories" className="flex items-center">
                View All Memories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-memorial-lightgray">
        <div className="memorial-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Photo Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A collection of moments from Stephen's life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ].map((url, i) => (
              <div key={i} className="photo-gallery-item h-48">
                <img src={url} alt={`Gallery photo ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-memorial-blue text-memorial-blue hover:bg-memorial-blue/10">
              <Link to="/gallery" className="flex items-center">
                View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
