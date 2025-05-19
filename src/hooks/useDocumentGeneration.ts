import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { generateDocument, downloadDocument, DocumentOptions } from '../lib/documentGenerator';

interface GenerationOptions {
  type: 'essay' | 'resume' | 'cover-letter';
  format: 'pdf' | 'docx';
  data: any;
}

export function useDocumentGeneration() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (options: GenerationOptions) => {
    setGenerating(true);
    setError(null);

    try {
      // Call appropriate Supabase Edge Function based on document type
      const functionName = `generate-${options.type}`;
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: JSON.stringify(options.data)
      });

      if (error) throw error;

      // Generate document in requested format
      const documentOptions: DocumentOptions = {
        title: options.data.title || 'Untitled Document',
        content: data.content,
        type: options.type,
        format: options.format
      };

      const blob = await generateDocument(documentOptions);
      
      // Generate filename
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${documentOptions.title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${options.format}`;
      
      // Download the document
      downloadDocument(blob, filename);

      // Save to Supabase
      const { error: saveError } = await supabase
        .from('documents')
        .insert({
          title: documentOptions.title,
          content: data.content,
          type: options.type,
          metadata: {
            originalData: options.data,
            format: options.format
          }
        });

      if (saveError) throw saveError;

      return data.content;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while generating the document';
      setError(message);
      throw err;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generating,
    error,
    generateContent
  };
}