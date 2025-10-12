'use client';

import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface PDFViewerProps {
  onBack: () => void;
  onOpenExternal: () => void;
  title: string;
  pdfUrl: string;
}

export default function PDFViewer({ 
  onBack, 
  onOpenExternal, 
  title, 
  pdfUrl
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(224); // Valor padrão baseado no primeiro PDF
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useLocalImages, setUseLocalImages] = useState(true); // Priorizar imagens locais
  const [useIframe, setUseIframe] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Função para gerar o caminho da imagem local baseada no título
  const getLocalImagePath = (pageNumber: number, cardTitle: string) => {
    const paddedNumber = pageNumber.toString().padStart(4, '0');
    
    // Mapear títulos para nomes de arquivos corretos
    const fileMapping: Record<string, string> = {
      '+500 Recetas para bebés': '+500 Recetas para bebés de 6meses a 3 años',
      'BONO Guía de Alimentos': 'BONO guia de alimentos alergenicos',
      'BONO Guía de Cortes': 'BONO GUIA DE CORTES BLW',
      'BONO Guía para Dormir': 'BONO Guia para dormir a tu bebe',
      'BONO Libro Estimulación para niña': 'BONO libro de estimulación para niña',
      'BONO Libro Estimulación para niño': 'BONO libro de estimulación para niño',
      'BONO Planificador': 'BONO Planificador Semanal de Comidas para tu bebe'
    };

    // Encontrar o nome do arquivo correto
    let fileName = fileMapping[cardTitle] || '+500 Recetas para bebés de 6meses a 3 años';
    
    return `/${fileName}_page-${paddedNumber}.jpg`;
  };

  // Função para determinar o número total de páginas baseado no título
  const getTotalPagesForTitle = (cardTitle: string): number => {
    const pageMapping: Record<string, number> = {
      '+500 Recetas para bebés': 224,
      'BONO Guía de Alimentos': 45,
      'BONO Guía de Cortes': 35,
      'BONO Guía para Dormir': 42,
      'BONO Libro Estimulación para niña': 68,
      'BONO Libro Estimulación para niño': 72,
      'BONO Planificador': 28
    };

    return pageMapping[cardTitle] || 224;
  };

  // Converter URL do Google Drive para iframe
  const getGoogleDriveEmbedUrl = (driveUrl: string) => {
    const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return driveUrl;
  };

  // Inicialização do componente
  useEffect(() => {
    console.log('PDFViewer inicializado para:', title);
    
    // Definir número total de páginas baseado no título
    const pages = getTotalPagesForTitle(title);
    setTotalPages(pages);
    
    // Começar sempre tentando carregar imagens locais
    setUseLocalImages(true);
    setUseIframe(false);
    setLoading(false);
    
    console.log(`Configurado para ${pages} páginas, modo: imagens locais`);
  }, [title]);

  // Carregar imagem da página atual
  useEffect(() => {
    const loadCurrentPageImage = async () => {
      if (currentPage < 1 || currentPage > totalPages) return;

      setImageLoading(true);
      setImageError(false);
      setCurrentImageUrl(null);

      console.log(`Carregando página ${currentPage} de ${totalPages}`);

      if (useLocalImages) {
        // Tentar carregar imagem local primeiro
        const imagePath = getLocalImagePath(currentPage, title);
        console.log('Tentando carregar imagem local:', imagePath);

        const img = new Image();
        
        img.onload = () => {
          console.log(`Imagem local carregada: página ${currentPage}`);
          setCurrentImageUrl(imagePath);
          setImageLoading(false);
          setImageError(false);
        };
        
        img.onerror = () => {
          console.error(`Erro ao carregar imagem local: ${imagePath}`);
          console.log('Fallback: tentando usar iframe do Google Drive');
          
          // Fallback para iframe se imagem local falhar
          setUseLocalImages(false);
          setUseIframe(true);
          setImageLoading(false);
          setImageError(false);
        };
        
        img.src = imagePath;
      }
    };

    loadCurrentPageImage();
  }, [currentPage, totalPages, title, useLocalImages]);

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

  const handleRetryWithIframe = () => {
    console.log('Tentando usar iframe como alternativa');
    setUseLocalImages(false);
    setUseIframe(true);
    setImageError(false);
    setImageLoading(false);
  };

  const handleRetryLocalImages = () => {
    console.log('Tentando carregar imagens locais novamente');
    setUseIframe(false);
    setUseLocalImages(true);
    setImageError(false);
    setCurrentPage(1); // Resetar para página 1
  };

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
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        
        {/* Área da página */}
        <div className="relative bg-white rounded-lg shadow-2xl w-full h-[80vh] overflow-hidden">
          
          {/* Conteúdo principal */}
          <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-lg font-medium">Inicializando visualizador...</p>
                <p className="text-sm text-gray-400">Aguarde um momento</p>
              </div>
            ) : useIframe ? (
              // Usar iframe do Google Drive
              <div className="w-full h-full absolute inset-0">
                <iframe
                  src={getGoogleDriveEmbedUrl(pdfUrl)}
                  className="w-full h-full border-0 rounded-lg"
                  title="PDF Viewer"
                  allow="autoplay"
                />
              </div>
            ) : imageLoading ? (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="animate-spin text-4xl mb-4">🔄</div>
                <p className="text-lg font-medium">Carregando página {currentPage}...</p>
                <p className="text-sm text-gray-400">Aguarde um momento</p>
              </div>
            ) : currentImageUrl ? (
              // Mostrar imagem local
              <div className="relative w-full h-full">
                <img 
                  src={currentImageUrl} 
                  alt={`Página ${currentPage} - ${title}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                  📄 Página {currentPage}/{totalPages}
                </div>
              </div>
            ) : imageError ? (
              <div className="flex flex-col items-center justify-center text-red-500 p-8">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-lg font-medium">Erro ao carregar página {currentPage}</p>
                <p className="text-sm text-gray-400 text-center mb-6">
                  Não foi possível carregar o conteúdo da página.
                </p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleRetryWithIframe}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    📖 Usar Visualizador Google Drive
                  </button>
                  
                  <button 
                    onClick={handleRetryLocalImages}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    🔄 Tentar Novamente
                  </button>
                  
                  <button 
                    onClick={onOpenExternal}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    🌐 Abrir PDF Original
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg font-medium">Página {currentPage}</p>
                <p className="text-sm text-gray-400">Preparando...</p>
              </div>
            )}
          </div>

          {/* Botões de navegação nas laterais - apenas para modo local */}
          {!useIframe && !loading && currentPage > 1 && (
            <button 
              onClick={prevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {!useIframe && !loading && currentPage < totalPages && (
            <button 
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Contador de páginas e controles - apenas para modo local */}
        {!useIframe && !loading && (
          <div className="mt-4 flex flex-col items-center gap-3">
            
            {/* Contador principal */}
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-pink-200 shadow-md">
              <span className="text-slate-700 font-medium">
                Página <span className="text-yellow-600 font-bold text-lg">{currentPage}</span> de {totalPages}
              </span>
            </div>

            {/* Controles de navegação */}
            <div className="flex items-center gap-4">
              
              {/* Input para ir para página específica */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600 text-sm font-medium">Ir para:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 bg-white text-slate-700 text-center rounded border border-pink-200 focus:border-yellow-400 focus:outline-none text-sm"
                />
              </div>

              {/* Botões de navegação */}
              <div className="flex gap-2">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 disabled:from-gray-200 disabled:to-gray-300 disabled:opacity-50 text-pink-700 disabled:text-gray-500 rounded transition-all duration-200 text-sm font-medium"
                >
                  ← Anterior
                </button>
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-200 disabled:to-gray-300 disabled:opacity-50 text-yellow-700 disabled:text-gray-500 rounded transition-all duration-200 text-sm font-medium"
                >
                  Siguiente →
                </button>
              </div>
            </div>

            {/* Informações do modo atual */}
            <div className="text-center">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {useLocalImages ? '🖼️ Modo: Imagens Locais' : '📖 Modo: Google Drive'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}