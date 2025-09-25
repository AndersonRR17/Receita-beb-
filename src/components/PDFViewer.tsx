'use client';

import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

interface PDFViewerProps {
  onBack: () => void;
  onOpenExternal: () => void;
  title: string;
  pdfUrl: string; // URL do PDF para carregar
}

export default function PDFViewer({ 
  onBack, 
  onOpenExternal, 
  title, 
  pdfUrl
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realPageImage, setRealPageImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [renderingFromPdf, setRenderingFromPdf] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Função para gerar o caminho da imagem real
  const getRealImagePath = (pageNumber: number) => {
    const paddedNumber = pageNumber.toString().padStart(4, '0');
    return `/+500 Recetas para bebés de 6meses a 3 años_page-${paddedNumber}.jpg`;
  };
  
  // Páginas simuladas para demonstração
  const simulatedPages = [
    {
      pageNumber: 1,
      content: (
        <div className="w-full h-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white flex flex-col items-center justify-center relative overflow-hidden">
          {/* Fundo com padrão */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600"></div>
          
          {/* Conteúdo principal */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
              500 Recetas Nutritivas
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
              Para Bebés
            </h2>
            
            {/* Badge amarelo */}
            <div className="inline-block bg-yellow-300 text-pink-800 px-8 py-3 rounded-full font-bold text-xl mb-8 shadow-lg">
              6 a 36 meses
            </div>
          </div>
          
          {/* Área das panquecas - simulando a imagem real */}
          <div className="relative z-10 mt-4">
            <div className="flex justify-center items-center gap-2 mb-4">
              {/* Panqueca 1 */}
              <div className="relative">
                <div className="w-20 h-20 bg-yellow-200 rounded-full border-4 border-yellow-300 shadow-lg"></div>
                <div className="absolute top-2 left-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-red-500 rounded"></div>
              </div>
              
              {/* Panqueca 2 */}
              <div className="relative -mt-4">
                <div className="w-24 h-24 bg-yellow-200 rounded-full border-4 border-yellow-300 shadow-xl"></div>
                <div className="absolute top-3 left-3 w-5 h-5 bg-blue-600 rounded-full"></div>
                <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-red-500 rounded"></div>
              </div>
              
              {/* Panqueca 3 */}
              <div className="relative">
                <div className="w-20 h-20 bg-yellow-200 rounded-full border-4 border-yellow-300 shadow-lg"></div>
                <div className="absolute top-2 left-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-red-500 rounded"></div>
              </div>
            </div>
            
            {/* Mirtilos espalhados */}
            <div className="flex justify-center gap-3 mt-2">
              <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
            </div>
          </div>
          
          {/* Texto inferior */}
          <div className="relative z-10 mt-6">
            <p className="text-center text-sm opacity-90 font-medium">
              Alimentación saludable y divertida desde los primeros meses
            </p>
          </div>
        </div>
      )
    },
    {
      pageNumber: 2,
      content: (
        <div className="w-full h-full bg-white text-gray-800 p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Índice</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Introducción a la alimentación complementaria</span>
              <span className="text-pink-500">3</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Primeras comidas (6-8 meses)</span>
              <span className="text-pink-500">15</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Recetas para 9-12 meses</span>
              <span className="text-pink-500">45</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Comidas para 1-2 años</span>
              <span className="text-pink-500">120</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Recetas para 2-3 años</span>
              <span className="text-pink-500">200</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Consejos nutricionales</span>
              <span className="text-pink-500">350</span>
            </div>
          </div>
        </div>
      )
    },
    {
      pageNumber: 3,
      content: (
        <div className="w-full h-full bg-white text-gray-800 p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Introducción</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              La alimentación complementaria es un proceso fundamental en el desarrollo de tu bebé. 
              A partir de los 6 meses, es importante introducir nuevos alimentos de forma gradual y segura.
            </p>
            <p>
              Este libro contiene más de 500 recetas nutritivas, organizadas por edad y diseñadas 
              específicamente para satisfacer las necesidades nutricionales de tu pequeño.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-bold text-yellow-800 mb-2">💡 Consejo importante:</h3>
              <p className="text-yellow-700 text-xs">
                Siempre consulta con tu pediatra antes de introducir nuevos alimentos.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Configurar PDF.js worker
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);

  // Converter URL do Google Drive para URL de download direto
  const getDirectDownloadUrl = (driveUrl: string) => {
    // Extrair ID do arquivo do Google Drive
    const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      // Usar diferentes métodos para contornar CORS
      return [
        `https://drive.google.com/uc?export=download&id=${fileId}`,
        `https://drive.google.com/uc?id=${fileId}&export=download`,
        `https://docs.google.com/uc?export=download&id=${fileId}`,
        // Método com proxy CORS público
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://drive.google.com/uc?export=download&id=${fileId}`)}`,
        `https://corsproxy.io/?${encodeURIComponent(`https://drive.google.com/uc?export=download&id=${fileId}`)}`,
        // Método direto com viewer
        `https://drive.google.com/file/d/${fileId}/preview`
      ];
    }
    return [driveUrl];
  };

  // Carregar PDF do Google Drive
  useEffect(() => {
    const loadPDFFromGoogleDrive = async () => {
      try {
        console.log('Carregando PDF do Google Drive:', pdfUrl);
        setLoading(true);
        setError(null);
        setPdfDoc(null);

        // Obter URLs diretas do Google Drive
        const directUrls = getDirectDownloadUrl(pdfUrl);
        let pdfDocument = null;

        // Tentar carregar o PDF de diferentes URLs
        for (const url of directUrls) {
          try {
            console.log('Tentando carregar PDF de:', url);
            
            const loadingTask = pdfjsLib.getDocument({
              url: url,
              cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
              cMapPacked: true,
              // Configurações para contornar CORS
              httpHeaders: {
                'Access-Control-Allow-Origin': '*',
              },
              withCredentials: false,
            });

            pdfDocument = await loadingTask.promise;
            console.log('PDF carregado com sucesso!', pdfDocument.numPages, 'páginas');
            break;
          } catch (err) {
            console.log('Falha ao carregar de:', url, err);
            continue;
          }
        }

        if (pdfDocument) {
          setPdfDoc(pdfDocument);
          setTotalPages(pdfDocument.numPages);
          console.log(`PDF carregado: ${pdfDocument.numPages} páginas`);
        } else {
          console.log('PDF não carregou via PDF.js, tentando iframe como fallback');
          setUseIframe(true);
          setTotalPages(224); // Número estimado de páginas
        }

        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar PDF:', err);
        console.log('Tentando iframe como fallback');
        setUseIframe(true);
        setTotalPages(224); // Fallback: usar número fixo de páginas
        setLoading(false);
      }
    };

    loadPDFFromGoogleDrive();
  }, [pdfUrl]);

  // Função para renderizar página do PDF
  const renderPdfPage = async (pageNumber: number): Promise<string | null> => {
    if (!pdfDoc) {
      console.log('PDF não carregado ainda');
      return null;
    }

    try {
      setRenderingFromPdf(true);
      console.log(`Renderizando página ${pageNumber} do PDF...`);
      
      const page = await pdfDoc.getPage(pageNumber);
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas não encontrado');
        return null;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        console.error('Contexto do canvas não encontrado');
        return null;
      }
      
      // Calcular escala para ocupar todo o espaço disponível
      const viewport = page.getViewport({ scale: 1.0 });
      
      // Obter dimensões do container (aproximadamente 80vh)
      const containerHeight = window.innerHeight * 0.8;
      const containerWidth = window.innerWidth - 80; // Considerando padding
      
      // Calcular escala baseada nas dimensões do container
      const scaleX = containerWidth / viewport.width;
      const scaleY = containerHeight / viewport.height;
      const scale = Math.min(scaleX, scaleY, 3.0); // Máximo 3x para evitar pixelização
      
      const scaledViewport = page.getViewport({ scale: Math.max(scale, 1.0) });
      
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };
      
      await page.render(renderContext).promise;
      
      // Converter canvas para imagem
      const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
      console.log(`Página ${pageNumber} renderizada com sucesso`);
      setRenderingFromPdf(false);
      return imageUrl;
    } catch (err) {
      console.error(`Erro ao renderizar página ${pageNumber}:`, err);
      setRenderingFromPdf(false);
      return null;
    }
  };

  // Carregar e renderizar página atual
  useEffect(() => {
    const loadPageImage = async () => {
      if (currentPage && totalPages > 0) {
        setImageLoading(true);
        setImageError(false);
        setRealPageImage(null);
        
        console.log(`Carregando página ${currentPage}...`);
        
        // Se temos o PDF carregado, renderizar diretamente
        if (pdfDoc) {
          const renderedImage = await renderPdfPage(currentPage);
          
          if (renderedImage) {
            setRealPageImage(renderedImage);
            setImageLoading(false);
            setImageError(false);
          } else {
            console.error(`Falha ao renderizar página ${currentPage}`);
            setImageError(true);
            setImageLoading(false);
            setRealPageImage(null);
          }
        } else {
          // Fallback: tentar carregar imagem pré-processada
          const imagePath = getRealImagePath(currentPage);
          console.log(`PDF não carregado, tentando imagem pré-processada: ${imagePath}`);
          
          const img = new Image();
          
          img.onload = () => {
            console.log(`Imagem pré-processada carregada: página ${currentPage}`);
            setRealPageImage(imagePath);
            setImageLoading(false);
            setImageError(false);
          };
          
          img.onerror = () => {
            console.error(`Erro ao carregar página ${currentPage}: ${imagePath}`);
            setImageError(true);
            setImageLoading(false);
            setRealPageImage(null);
          };
          
          img.src = imagePath;
        }
      }
    };

    loadPageImage();
  }, [currentPage, totalPages, pdfDoc]);

  // Renderizar página atual
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext).promise;
        
        // Converter canvas para imagem
        const imageUrl = canvas.toDataURL();
        setPageImage(imageUrl);
      } catch (err) {
        console.error('Erro ao renderizar página:', err);
        setError('Erro ao renderizar a página.');
      }
    };

    if (pdfDoc && currentPage) {
      renderPage();
    }
  }, [pdfDoc, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b-2 border-pink-200 shadow-sm">
        <h1 className="text-lg font-semibold text-yellow-600 truncate">
          {title}
        </h1>
        
        <div className="flex items-center gap-3">
          {/* Botão fechar */}
          <button 
            onClick={onBack}
            className="p-2 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-yellow-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Visualizador de PDF */}
      <div className="flex-1 flex flex-col items-center justify-center p-">
        
        {/* Área da página */}
        <div className="relative bg-white rounded-lg shadow-2xl w-full h-[80vh] overflow-hidden">
          
          {/* Canvas oculto para renderização */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          {/* Imagem da página atual */}
          <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-lg font-medium">Carregando PDF...</p>
                <p className="text-sm text-gray-400">Aguarde um momento</p>
              </div>
            ) : useIframe ? (
              // Fallback: usar iframe do Google Drive
              <div className="w-full h-full absolute inset-0">
                <iframe
                  src={`https://drive.google.com/file/d/${pdfUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1]}/preview`}
                  className="w-full h-full border-0 rounded-lg"
                  title="PDF Viewer"
                  allow="autoplay"
                />
                </div>
            ) : imageLoading ? (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="animate-spin text-4xl mb-4">
                  {renderingFromPdf ? '🎨' : '🔄'}
                </div>
                <p className="text-lg font-medium">
                  {renderingFromPdf 
                    ? `Renderizando página ${currentPage}...` 
                    : `Carregando página ${currentPage}...`
                  }
                </p>
                <p className="text-sm text-gray-400">
                  {renderingFromPdf 
                    ? 'Gerando imagem do PDF...' 
                    : 'Aguarde um momento'
                  }
                </p>
              </div>
            ) : realPageImage ? (
              // Mostrar imagem real do PDF
              <img 
                src={realPageImage} 
                alt={`Página ${currentPage} - 500 Recetas para bebés`}
                className="w-full h-full object-contain transition-opacity duration-300"
                style={{ objectFit: 'contain' }}
                loading="lazy"
              />
            ) : imageError ? (
              <div className="flex flex-col items-center justify-center text-red-500 p-8">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-lg font-medium">Erro ao carregar página {currentPage}</p>
                <p className="text-sm text-gray-400 text-center mb-4">
                  Não foi possível carregar a página do PDF.
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">
                  Tentamos renderizar do PDF e carregar imagem pré-processada.
                </p>
                
                <button 
                  onClick={() => setUseIframe(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg mb-3"
                >
                  🔄 Tentar Iframe
                </button>
                
                <button 
                  onClick={onOpenExternal}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
                >
                  📖 Abrir PDF Original
                </button>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Clique nos botões acima para visualizar o PDF
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg font-medium">Página {currentPage}</p>
                <p className="text-sm text-gray-400">Preparando...</p>
              </div>
            )}
          </div>

          {/* Botões de navegação nas laterais - ocultar quando usando iframe */}
          {!useIframe && currentPage > 1 && (
            <button 
              onClick={prevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {!useIframe && currentPage < totalPages && (
            <button 
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Contador de páginas e controles - posicionado de forma compacta */}
        {!useIframe && (
          <div className="mt-2 flex flex-col items-center gap-2">
            
            {/* Contador principal compacto */}
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-200 shadow-md">
              <span className="text-slate-700 font-medium text-sm">
                Página <span className="text-yellow-600 font-bold">{currentPage}</span> / {totalPages}
              </span>
            </div>

            {/* Controles de navegação compactos */}
            <div className="flex items-center gap-3">
              
              {/* Input para ir para página específica */}
              <div className="flex items-center gap-1">
                <span className="text-slate-600 text-xs font-medium">Ir a:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                  className="w-12 px-1 py-1 bg-white text-slate-700 text-center rounded border border-pink-200 focus:border-yellow-400 focus:outline-none text-xs"
                />
              </div>

              {/* Botões de navegação compactos */}
              <div className="flex gap-1">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 disabled:from-gray-200 disabled:to-gray-300 disabled:opacity-50 text-pink-700 disabled:text-gray-500 rounded transition-all duration-200 text-xs font-medium"
                >
                  Anterior
                </button>
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-200 disabled:to-gray-300 disabled:opacity-50 text-yellow-700 disabled:text-gray-500 rounded transition-all duration-200 text-xs font-medium"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
