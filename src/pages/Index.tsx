
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <section className="relative bg-memorial-cream py-12 md:py-24">
        <div className="memorial-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
                Celebrating the Life of<br />Stephen Mureithi
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                A beloved father, husband, brother, and friend who touched countless lives with his kindness, wisdom, and generous spirit.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button asChild className="bg-memorial-blue hover:bg-memorial-darkblue text-sm md:text-base">
                  <Link to="/gallery">View Photos</Link>
                </Button>
                <Button asChild variant="outline" className="border-memorial-blue text-memorial-blue hover:bg-memorial-blue/10 text-sm md:text-base">
                  <Link to="/memories">Share Memories</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 px-4 md:px-0">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px] w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <img
                  src="/public/3-removebg-preview.png"
                  alt="Stephen Mureithi Mburia"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white">
        <div className="memorial-container">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 md:mb-4">Recent Memories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
              Family and friends share their cherished moments with Stephen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" className="border-memorial-blue text-memorial-blue hover:bg-memorial-blue/10 text-sm md:text-base">
              <Link to="/memories" className="flex items-center">
                View All Memories <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-memorial-lightgray">
        <div className="memorial-container">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 md:mb-4">Photo Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
              A collection of moments from Stephen's life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          </div>
          
          <div className="text-center mt-6 md:mt-8">
            <Button asChild variant="outline" className="border-memorial-blue text-memorial-blue hover:bg-memorial-blue/10 text-sm md:text-base">
              <Link to="/gallery" className="flex items-center">
                View Full Gallery <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
