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
  const pdfUrl = './testpdf.pdf';

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

      {/* PDF Container */}
      <div className="pdfContainer customScrollbar">{renderAllPages()}</div>
    </div>
  );
};

export default PDFReader;
