
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MemoryFormProps {
  onSubmit: (memory: { author: string; content: string; photo?: string }) => Promise<void>;
  isSubmitting?: boolean;
}

const MemoryForm = ({ onSubmit, isSubmitting = false }: MemoryFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB");
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      toast.error("Please fill in your name and memory");
      return;
    }
    
    try {
      let photoPath = undefined;
      
      // Upload the image if one is selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('memorial_images')
          .upload(filePath, selectedFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        photoPath = filePath;
      }
      
      await onSubmit({
        author,
        content,
        photo: photoPath
      });
      
      setAuthor("");
      setContent("");
      clearSelectedFile();
      
      toast.success("Thank you for sharing your memory");
    } catch (error) {
      console.error("Error submitting memory:", error);
      toast.error("There was a problem sharing your memory. Please try again.");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          
          {!previewUrl && (
            <Button 
              type="button" 
              variant="outline"
              onClick={triggerFileInput}
              className="w-full border-dashed border-2 h-24 flex flex-col items-center justify-center bg-gray-50"
            >
              <Upload size={20} className="mb-1" />
              <span className="text-sm">Upload a Photo</span>
              <span className="text-xs text-gray-500 mt-1">
                Optional, max 5MB
              </span>
            </Button>
          )}
          
          {previewUrl && (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="rounded-md w-full h-48 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                onClick={clearSelectedFile}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="bg-memorial-blue hover:bg-memorial-darkblue"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sharing..." : "Share Memory"}
        </Button>
      </form>
    </div>
  );
};

export default MemoryForm;
