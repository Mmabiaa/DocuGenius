import { jsPDF } from 'jspdf';
import HTMLtoDOCX from 'html-to-docx';

export interface DocumentOptions {
  title: string;
  content: string;
  type: 'essay' | 'resume' | 'cover-letter';
  format: 'pdf' | 'docx';
}

export async function generateDocument({ title, content, type, format }: DocumentOptions) {
  try {
    if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text(title, 20, 20);
      
      // Add content
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(content, 170);
      doc.text(splitText, 20, 40);
      
      return doc.output('blob');
    } else {
      // Convert content to HTML
      const htmlContent = `
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { font-size: 16pt; }
              p { font-size: 12pt; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            ${content.split('\n').map(para => `<p>${para}</p>`).join('')}
          </body>
        </html>
      `;

      const docxBlob = await HTMLtoDOCX(htmlContent, null, {
        title,
        margin: {
          top: 1440,
          right: 1440,
          bottom: 1440,
          left: 1440,
        },
      });

      return docxBlob;
    }
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
}

export function downloadDocument(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}