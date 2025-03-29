
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface MemoryFormProps {
  onSubmit: (memory: { author: string; content: string; photo?: string }) => void;
}

const MemoryForm = ({ onSubmit }: MemoryFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      toast.error("Please fill in your name and memory");
      return;
    }
    
    onSubmit({
      author,
      content,
      photo: photoUrl.trim() || undefined
    });
    
    setAuthor("");
    setContent("");
    setPhotoUrl("");
    
    toast.success("Thank you for sharing your memory");
  };

  return (
    <div className="memory-card">
      <h3 className="text-xl font-serif mb-4">Share a Memory</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Share a memory about Stephen..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32"
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Image URL (optional)"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can share a photo by pasting an image URL
          </p>
        </div>
        <Button type="submit" className="bg-memorial-blue hover:bg-memorial-darkblue">
          Share Memory
        </Button>
      </form>
    </div>
  );
};

export default MemoryForm;
