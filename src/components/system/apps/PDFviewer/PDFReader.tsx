import React, { useEffect, useRef, useState } from 'react';
import type * as pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Ensure the worker is set up in your app
import './PDFWorker'; // Path to the file where the worker is configured

const PDFReader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState(1.5); // Initialize scale state (zoom level)
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const pdfUrl = './testpdf.pdf';

  // Load the PDF when the component is mounted
  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        renderPage(pdfDoc, currentPage);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  // Function to render a page
  const renderPage = async (pdf: pdfjs.PDFDocumentProxy, pageNum: number) => {
    if (!canvasRef.current) return;

    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the page to the canvas
        await page.render({
          canvasContext: context,
          viewport
        }).promise;
      }
    } catch (error) {
      console.error('Error rendering PDF page:', error);
    }
  };

  // Zoom In
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Max zoom = 3x
  };

  // Zoom Out
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Min zoom = 0.5x
  };

  // Page Navigation
  const handleNextPage = () => {
    if (pdf && currentPage < pdf.numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Re-render the page whenever scale or currentPage changes
  useEffect(() => {
    if (pdf) {
      renderPage(pdf, currentPage);
    }
  }, [scale, currentPage, pdf]);

  return (
    <div>
      <div className="toolbar">
        <button className="zoomIn" onClick={handleZoomOut}>
          -
        </button>
        <button className="zoomIn" onClick={handleZoomIn}>
          +
        </button>
        <button className="zoomIn" onClick={handlePrevPage}>
          Previous
        </button>
        <button className="zoomIn" onClick={handleNextPage}>
          Next
        </button>
      </div>

      <canvas className="pdfReader" ref={canvasRef} />
      <div>
        <p>Page {currentPage}</p>
      </div>
    </div>
  );
};

export default PDFReader;
