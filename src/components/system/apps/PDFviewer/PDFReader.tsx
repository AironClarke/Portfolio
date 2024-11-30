import React, { useEffect, useState } from 'react';
import type * as pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Ensure the worker is set up in your app
import './PDFWorker'; // Path to the file where the worker is configured

const PDFReader: React.FC = () => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState(1.0); // Default zoom at 100%
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rendering, setRendering] = useState<Map<number, boolean>>(new Map()); // Track rendering status per page
  const pdfUrl = './testpdf.pdf';

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        // Initially render the first page after loading
        renderPage(pdfDoc, currentPage);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  const renderPage = async (pdf: pdfjs.PDFDocumentProxy, pageNum: number) => {
    // Check if this page is already being rendered
    if (rendering.get(pageNum)) {
      return; // Do not render if already rendering
    }

    try {
      // Mark the page as being rendered
      setRendering(new Map(rendering.set(pageNum, true)));

      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      // Get the page's rotation (in degrees)
      const rotation = page.rotate || 0;

      // Get the canvas element and its context
      const canvas = document.getElementById(
        `canvas-page-${pageNum}`
      ) as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Reset canvas before applying transformations
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Apply the rotation based on the page's rotation metadata
        context.save();
        if (rotation === 90) {
          context.translate(viewport.height, 0);
          context.rotate((90 * Math.PI) / 180);
        } else if (rotation === 180) {
          context.translate(viewport.width, viewport.height);
          context.rotate((180 * Math.PI) / 180);
        } else if (rotation === 270) {
          context.translate(0, viewport.width);
          context.rotate((270 * Math.PI) / 180);
        }

        // Render the page onto the canvas with the correct rotation
        const renderTask = page.render({
          canvasContext: context,
          viewport
        });

        await renderTask.promise; // Wait for the rendering to complete

        // Restore the context state to avoid affecting ThisPc renders
        context.restore();
      }

      // Mark the page as rendered
      setRendering(new Map(rendering.set(pageNum, false)));
    } catch (error) {
      console.error('Error rendering PDF page:', error);
      // Ensure rendering is marked as complete even if there's an error
      setRendering(new Map(rendering.set(pageNum, false)));
    }
  };

  // Zoom In function
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Max zoom = 300%
  };

  // Zoom Out function
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Min zoom = 50%
  };

  useEffect(() => {
    if (pdf) {
      renderPage(pdf, currentPage);
    }
  }, [scale, currentPage, pdf]);

  const renderAllPages = () => {
    if (pdf) {
      return Array.from({ length: totalPages }, (_, idx) => (
        <canvas
          key={idx + 1}
          id={`canvas-page-${idx + 1}`}
          className="pdfReader"
          style={{
            margin: '0 auto' // Center canvas in the container
          }}
        />
      ));
    }
    return null;
  };

  const zoomPercentage = Math.round(scale * 100);

  return (
    <div className="pdfViewer">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="leftMenu">
          <span>Portfolio</span>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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

      {/* PDF Container */}
      <div className="pdfContainer customScrollbar">{renderAllPages()}</div>
    </div>
  );
};

export default PDFReader;
