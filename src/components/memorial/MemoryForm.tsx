
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, X, Crop } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface MemoryFormProps {
  onSubmit: (memory: { author: string; content: string; photo?: string }) => Promise<void>;
  isSubmitting?: boolean;
}

const MemoryForm = ({ onSubmit, isSubmitting = false }: MemoryFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
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

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsCropping(false);
    setCompletedCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const finishCropping = async () => {
    if (!imageRef.current || !completedCrop) {
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
    const croppedFile = new File([blob], selectedFile?.name || 'cropped-image.jpg', { 
      type: 'image/jpeg', 
      lastModified: Date.now() 
    });
    
    // Update the state with the cropped image
    setSelectedFile(croppedFile);
    setPreviewUrl(croppedDataUrl);
    setIsCropping(false);
  };
  
  const cancelCropping = () => {
    clearSelectedFile();
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
      
      {isCropping && previewUrl ? (
        <div className="mb-4">
          <div className="flex justify-center mb-3">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img 
                src={previewUrl} 
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
              <Crop size={18} /> Crop Image
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
            
            {previewUrl && !isCropping && (
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
      )}
    </div>
  );
};

export default MemoryForm;
