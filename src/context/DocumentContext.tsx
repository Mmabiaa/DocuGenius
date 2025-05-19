import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Document {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateDocument: (id: string, document: Partial<Omit<Document, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => Document | undefined;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = generateId();
    const now = new Date();
    const newDocument: Document = {
      ...document,
      id,
      createdAt: now,
      updatedAt: now
    };

    setDocuments([...documents, newDocument]);
    return id;
  };

  const updateDocument = (id: string, document: Partial<Omit<Document, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setDocuments(documents.map(doc => {
      if (doc.id === id) {
        return {
          ...doc,
          ...document,
          updatedAt: new Date()
        };
      }
      return doc;
    }));
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getDocument = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  // Helper function to generate a unique ID
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  return (
    <DocumentContext.Provider value={{ 
      documents, 
      addDocument, 
      updateDocument, 
      deleteDocument, 
      getDocument 
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};