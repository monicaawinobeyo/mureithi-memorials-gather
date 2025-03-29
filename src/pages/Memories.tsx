
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MemoryCard, { Memory } from "@/components/memorial/MemoryCard";
import MemoryForm from "@/components/memorial/MemoryForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MemoriesPage = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Transform the data to match our Memory type
        const formattedMemories: Memory[] = data.map(item => ({
          id: item.id,
          author: item.author,
          content: item.content,
          photo: item.photo_path,
          date: item.created_at
        }));
        
        setMemories(formattedMemories);
      }
    } catch (error) {
      console.error('Error fetching memories:', error);
      toast.error("Failed to load memories. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const addMemory = async (newMemory: { author: string; content: string; photo?: string }) => {
    setIsSubmitting(true);
    try {
      // Insert the new memory into Supabase
      const { error } = await supabase
        .from('memories')
        .insert({
          author: newMemory.author,
          content: newMemory.content,
          photo_path: newMemory.photo
        });

      if (error) throw error;
      
      // Refresh memories to include the new one
      await fetchMemories();
    } catch (error) {
      console.error('Error adding memory:', error);
      toast.error("Failed to save your memory. Please try again.");
      throw error; // Propagate error to the form component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="memorial-container py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Memories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your favorite memories, stories, and moments with Stephen. 
            Each story helps us celebrate the impact he had on our lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MemoryForm onSubmit={addMemory} isSubmitting={isSubmitting} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-memorial-blue"></div>
                </div>
              ) : memories.length > 0 ? (
                memories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-700">No memories shared yet</h3>
                  <p className="text-gray-500 mt-2">Be the first to share a memory about Stephen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemoriesPage;
