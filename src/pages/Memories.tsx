
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import MemoryCard, { Memory } from "@/components/memorial/MemoryCard";
import MemoryForm from "@/components/memorial/MemoryForm";

const MemoriesPage = () => {
  // Sample memories data - in a real app, this would come from an API or database
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      author: "Jane Mureithi",
      content: "Dad always knew how to make us laugh, even during the hardest times. His strength and humor will forever be with us. I remember how he would tell stories from his childhood, making them come alive with his animated gestures and voices. Those evenings around the dinner table are some of my most treasured memories.",
      date: "2023-04-15T18:30:00",
    },
    {
      id: 2,
      author: "Michael Kamau",
      content: "Stephen was more than a colleague; he was a mentor and a dear friend. His advice shaped my career and his kindness touched my heart. He always made time to listen, no matter how busy he was. When I was struggling with a difficult project, he stayed late to help me figure it out, never once making me feel inadequate.",
      date: "2023-04-10T09:15:00",
      photo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      author: "Alice Njeri",
      content: "My brother had the biggest heart. Always the first to help others, never asking for anything in return. I miss our long talks and your wise counsel. Every Sunday afternoon, we would have tea and discuss everything from politics to philosophy. Those conversations shaped how I see the world.",
      date: "2023-04-05T14:20:00",
    }
  ]);

  const addMemory = (newMemory: { author: string; content: string; photo?: string }) => {
    const memoryWithId: Memory = {
      ...newMemory,
      id: memories.length + 1,
      date: new Date().toISOString(),
    };
    
    setMemories([memoryWithId, ...memories]);
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
            <MemoryForm onSubmit={addMemory} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemoriesPage;
