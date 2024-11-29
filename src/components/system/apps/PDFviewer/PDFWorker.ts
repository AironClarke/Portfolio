import { GlobalWorkerOptions } from 'pdfjs-dist';

// Set the worker source to the local file
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
