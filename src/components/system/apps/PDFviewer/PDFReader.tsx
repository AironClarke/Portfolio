import React, { useEffect, useState } from 'react';
import type * as pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Ensure the worker is set up in your app
import './PDFWorker'; // Path to the file where the worker is configured

const PDFReader: React.FC = () => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState(1.5); // Initial zoom level (scale)
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Total pages in the PDF
  const pdfUrl = './testpdf.pdf';

  // Load the PDF document
  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        renderPage(pdfDoc, currentPage);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  // Function to render a page at the specified scale
  const renderPage = async (pdf: pdfjs.PDFDocumentProxy, pageNum: number) => {
    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.getElementById(
        `canvas-page-${pageNum}`
      ) as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the page onto the canvas
        await page.render({
          canvasContext: context,
          viewport
        }).promise;
      }
    } catch (error) {
      console.error('Error rendering PDF page:', error);
    }
  };

  // Zoom In function
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Max zoom = 3x
  };

  // Zoom Out function
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Min zoom = 0.5x
  };

  // Page Navigation functions
  const handleNextPage = () => {
    if (pdf && currentPage < totalPages) {
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

  // Render the canvases for all pages
  const renderAllPages = () => {
    if (pdf) {
      const pages = [];
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pages.push(
          <canvas
            key={pageNum}
            id={`canvas-page-${pageNum}`}
            className="pdfReader"
            style={{ display: pageNum === currentPage ? 'block' : 'none' }}
          />
        );
      }
      return pages;
    }
    return [];
  };

  return (
    <div>
      {/* Toolbar for zoom and navigation */}
      <div className="toolbar">
        <button onClick={handleZoomOut}>-</button>
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>

      {/* Scrollable container for PDF pages */}
      <div
        className="pdf-container"
        style={{
          maxHeight: '600px', // Set the max height for scrollable container
          overflowY: 'auto', // Enable vertical scrolling
          border: '1px solid #ccc' // Optional, for better visibility of the container
        }}
      >
        {/* Render all pages */}
        {renderAllPages()}
      </div>

      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default PDFReader;
