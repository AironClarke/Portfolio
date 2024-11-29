import React, { useEffect, useRef } from 'react';
import type * as pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Ensure the worker is set up in your app
import './PDFWorker'; // Path to the file where the worker is configured

const PDFReader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const pdfUrl = './testpdf.pdf';

  useEffect(() => {
    const renderPDF = async () => {
      if (!canvasRef.current) return;

      try {
        // Load the PDF document
        const loadingTask = getDocument(pdfUrl);
        const pdf: pdfjs.PDFDocumentProxy = await loadingTask.promise;

        // Get the first page
        const page = await pdf.getPage(1);

        // Set up viewport and render parameters
        const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale as needed
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render the page to the canvas
          await page.render({
            canvasContext: context,
            viewport
          }).promise;
        }
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    };

    renderPDF();
  }, [pdfUrl]);

  return <canvas className="pdfReader" ref={canvasRef} />;
};

export default PDFReader;
