import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface UploadResult {
  success: boolean;
  fileName?: string;
  url?: string;
  error?: string;
}

export function useSecureFileUpload() {
  const { session } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    if (!session) {
      return { success: false, error: 'User not authenticated' };
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data, error } = await supabase.functions.invoke('secure-file-upload', {
        body: formData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message || 'Upload failed' };
      }

      if (!data.success) {
        return { success: false, error: data.error || 'Upload failed' };
      }

      toast({
        title: "File uploaded successfully",
        description: `${data.fileName} has been uploaded securely`,
      });

      return {
        success: true,
        fileName: data.fileName,
        url: data.url,
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      return { success: false, error: error.message || 'Upload failed' };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadFile,
    uploading,
  };
}