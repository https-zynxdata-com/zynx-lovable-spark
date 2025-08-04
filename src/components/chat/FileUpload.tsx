
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Image, Archive } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'application/json',
      'text/csv',
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'application/zip'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "ไฟล์ไม่รองรับ",
        description: "กรุณาเลือกไฟล์ประเภท txt, md, json, csv, รูปภาพ, หรือ zip",
        variant: "destructive",
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "ไฟล์ใหญ่เกินไป",
        description: "กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 10MB",
        variant: "destructive",
      });
      return;
    }

    onFileUpload(file);
    
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
      >
        <Upload className="w-4 h-4" />
      </Button>
    </>
  );
}
