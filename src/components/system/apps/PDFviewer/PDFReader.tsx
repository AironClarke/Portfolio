import React, { useEffect, useState } from 'react';
import type * as pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Ensure the worker is set up in your app
import './PDFWorker'; // Path to the file where the worker is configured

const PDFReader: React.FC = () => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState(0.7); // Initial zoom level (scale)
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

  // Calculate the zoom percentage (scale * 100)
  const zoomPercentage = Math.round(scale * 100); // Zoom percentage

  return (
    <div>
      {/* Toolbar for zoom and navigation */}
      <div className="toolbar">
        <div className="leftMenu">
          <span>Resume</span>
        </div>
        <ol className="controls">
          <li className="zoomOut">
            <button onClick={handleZoomOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M6 12L18 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </li>
          <li className="zoomPercentage">
            <p>{zoomPercentage}%</p>
          </li>
          <li className="zoomIn">
            <button onClick={handleZoomIn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M4 12H20M12 4V20"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </li>
        </ol>
        <div className="rightMenu">
          <a href={pdfUrl} download="testpdf.pdf">
            <button>Download</button>
          </a>
        </div>
      </div>

      {/* Scrollable container for PDF pages */}
      <div className="pdfContainer customScrollbar">
        {/* Render all pages */}
        {renderAllPages()}
      </div>
    </div>
  );
};

export default PDFReader;
