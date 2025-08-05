
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Image, Archive } from 'lucide-react';
import { useSecureFileUpload } from '@/hooks/useSecureFileUpload';

interface FileUploadProps {
  onFileUpload: (file: File, url?: string) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const { toast } = useToast();
  const { uploadFile, uploading } = useSecureFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Upload file securely through edge function
    const result = await uploadFile(file);
    
    if (result.success && result.url) {
      onFileUpload(file, result.url);
    } else {
      toast({
        title: "Upload Failed",
        description: result.error || "Failed to upload file securely",
        variant: "destructive",
      });
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type === 'application/zip') return <Archive className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.json,.csv,.png,.jpg,.jpeg,.gif,.webp,.zip"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <Upload className="w-4 h-4" />
        {uploading && <span className="ml-1">...</span>}
      </Button>
    </>
  );
}
