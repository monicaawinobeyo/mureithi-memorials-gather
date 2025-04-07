import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, X, Crop, Plus, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface MemoryFormProps {
  onSubmit: (memory: { author: string; content: string; photo?: string }) => Promise<void>;
  isSubmitting?: boolean;
}

interface ImageFile {
  file: File;
  previewUrl: string;
}

const MemoryForm = ({ onSubmit, isSubmitting = false }: MemoryFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState<CropType>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: ImageFile[] = [];
      
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`File "${file.name}" is not an image`);
          continue;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Image "${file.name}" is larger than 5MB`);
          continue;
        }
        
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (event) => {
          const previewUrl = event.target?.result as string;
          newFiles.push({ file, previewUrl });
          
          // If this is the first batch of files or the last file in the batch
          if (newFiles.length === e.target.files!.length || selectedFiles.length === 0) {
            setSelectedFiles(prev => [...prev, ...newFiles]);
            // Start cropping the first image if no other is being cropped
            if (selectedFiles.length === 0 && !isCropping) {
              setCurrentFileIndex(0);
              setIsCropping(true);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
    
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imageRef.current = img;
    
    // Set initial crop area to center of the image
    const aspect = 1;
    const width = 90;
    const height = width / aspect;
    const y = (100 - height) / 2;
    const x = (100 - width) / 2;
    
    setCrop({
      unit: '%',
      width,
      height,
      x,
      y
    });
    
    return false;
  }, []);

  const clearSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    if (currentFileIndex === index) {
      setCurrentFileIndex(null);
      setIsCropping(false);
    } else if (currentFileIndex !== null && currentFileIndex > index) {
      setCurrentFileIndex(prev => prev! - 1);
    }
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setCurrentFileIndex(null);
    setIsCropping(false);
    setCompletedCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const startCropping = (index: number) => {
    setCurrentFileIndex(index);
    setIsCropping(true);
  };

  const finishCropping = async () => {
    if (!imageRef.current || !completedCrop || currentFileIndex === null) {
      toast.error("Please select a crop area");
      return;
    }
    
    // Create canvas for cropped image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast.error("Could not create image context");
      return;
    }
    
    // Set canvas dimensions to the completed crop size
    const pixelRatio = window.devicePixelRatio;
    canvas.width = completedCrop.width * pixelRatio;
    canvas.height = completedCrop.height * pixelRatio;
    
    // Apply scaling to the context
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';
    
    // Calculate the source area from the original image
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    
    // Draw the cropped image onto the canvas
    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    
    // Convert the canvas to a data URL
    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    
    // Convert data URL to Blob
    const res = await fetch(croppedDataUrl);
    const blob = await res.blob();
    
    // Create a new File from the Blob
    const croppedFile = new File([blob], selectedFiles[currentFileIndex].file.name || 'cropped-image.jpg', { 
      type: 'image/jpeg', 
      lastModified: Date.now() 
    });
    
    // Update the state with the cropped image
    setSelectedFiles(prev => {
      const updated = [...prev];
      updated[currentFileIndex] = {
        file: croppedFile,
        previewUrl: croppedDataUrl
      };
      return updated;
    });
    
    // Move to the next file for cropping if available
    if (currentFileIndex < selectedFiles.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1);
    } else {
      setIsCropping(false);
      setCurrentFileIndex(null);
    }
  };
  
  const cancelCropping = () => {
    // If canceling a specific image's cropping, remove that image
    if (currentFileIndex !== null) {
      clearSelectedFile(currentFileIndex);
    } else {
      clearAllFiles();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      toast.error("Please fill in your name and memory");
      return;
    }
    
    // Only one photo can be stored per memory in the current database structure
    // So we'll use the first selected photo
    if (selectedFiles.length > 0) {
      try {
        // Use the first image for the memory
        const firstFile = selectedFiles[0].file;
        
        const fileExt = firstFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('memorial_images')
          .upload(filePath, firstFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        await onSubmit({
          author,
          content,
          photo: filePath
        });
        
        // If there are additional images, create separate memories for them
        // sharing the same author and content
        for (let i = 1; i < selectedFiles.length; i++) {
          const file = selectedFiles[i].file;
          const fileExt = file.name.split('.').pop();
          const additionalFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const additionalFilePath = `${additionalFileName}`;
          
          const { error } = await supabase.storage
            .from('memorial_images')
            .upload(additionalFilePath, file);
            
          if (error) {
            console.error("Error uploading additional image:", error);
            continue;
          }
          
          await onSubmit({
            author,
            content,
            photo: additionalFilePath
          });
        }
        
        setAuthor("");
        setContent("");
        clearAllFiles();
        
        toast.success("Thank you for sharing your memory");
      } catch (error) {
        console.error("Error submitting memory:", error);
        toast.error("There was a problem sharing your memory. Please try again.");
      }
    } else {
      // No photos attached
      try {
        await onSubmit({
          author,
          content
        });
        
        setAuthor("");
        setContent("");
        
        toast.success("Thank you for sharing your memory");
      } catch (error) {
        console.error("Error submitting memory:", error);
        toast.error("There was a problem sharing your memory. Please try again.");
      }
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
      
      {isCropping && currentFileIndex !== null && selectedFiles[currentFileIndex] ? (
        <div className="mb-4">
          <div className="flex justify-center mb-3">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img 
                src={selectedFiles[currentFileIndex].previewUrl} 
                alt="Crop preview" 
                onLoad={(e) => onImageLoad(e.currentTarget)} 
                className="max-h-80"
              />
            </ReactCrop>
          </div>
          <div className="flex space-x-2">
            <Button 
              type="button" 
              onClick={finishCropping}
              className="flex-1"
            >
              <Crop size={18} className="mr-2" /> Crop Image
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={cancelCropping}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
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
              multiple
              className="hidden"
            />
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative aspect-square">
                  <img 
                    src={file.previewUrl} 
                    alt={`Preview ${index + 1}`} 
                    className="rounded-md w-full h-full object-cover"
                    onClick={() => startCropping(index)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 rounded-full w-6 h-6 p-0"
                    onClick={() => clearSelectedFile(index)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
              
              {selectedFiles.length < 5 && (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md aspect-square hover:bg-gray-50 transition-colors"
                >
                  <Plus size={20} className="mb-1" />
                  <span className="text-xs text-gray-500">Add Photo</span>
                </button>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-memorial-blue hover:bg-memorial-darkblue w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sharing..." : "Share Memory"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default MemoryForm;
