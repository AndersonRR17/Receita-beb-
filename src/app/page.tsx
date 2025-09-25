'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home as HomeIcon, List, User } from 'lucide-react';
import ProfilePage from '../components/ProfilePage';
import FeedPage from '../components/FeedPage';
import IntroductionPage from '../components/IntroductionPage';
import PDFViewer from '../components/PDFViewer';

const images = [
  '/imag1.png',
  '/imag2.png', 
  '/imag3.png'
];

// Dados dos cards com informações personalizadas
const cardData = [
  {
    id: 1,
    title: "+500 Recetas para bebés",
    subtitle: "De 6 meses a 3 años",
    icon: "📚",
    badge: "PRINCIPAL",
    badgeColor: "bg-pink-400 group-hover:bg-pink-500",
    pdfUrl: "https://drive.google.com/file/d/1KJNXpLbtlz0PhQctzFB6krE9WWBd7xMy/view?usp=sharing",
    fileName: "+500 Recetas para bebés de 6meses a 3 años.pdf",
    introTitle: "500 Recetas Nutritivas",
    introDescription: "Bienvenido al libro de recetas más completo para la alimentación de tu bebé.",
    introContent: "Una colección de 500 recetas nutritivas organizadas por edad, desde los 6 meses hasta los 3 años. Cada receta está diseñada para proporcionar los nutrientes esenciales que tu bebé necesita en cada etapa de su desarrollo.",
    totalPages: 224
  },
  {
    id: 2,
    title: "BONO Guía de Alimentos",
    subtitle: "Alergénicos",
    icon: "🥜",
    badge: "BONO",
    badgeColor: "bg-yellow-500 group-hover:bg-yellow-600",
    pdfUrl: "https://drive.google.com/file/d/1Gw1c8F4P91RHNfTM_tb5JMNbR8jdmK76/view?usp=sharing",
    fileName: "BONO guia de alimentos alergenicos.pdf",
    introTitle: "Guía de Alimentos Alergénicos",
    introDescription: "Tu guía completa para introducir alimentos alergénicos de forma segura en la dieta de tu bebé.",
    introContent: "Una guía detallada que te ayudará a identificar, introducir y manejar los alimentos alergénicos más comunes en la alimentación infantil. Aprende cuándo y cómo introducir cada alimento de manera segura, qué señales observar y cómo actuar ante posibles reacciones alérgicas.",
    totalPages: 45
  },
  {
    id: 3,
    title: "BONO Guía de Cortes",
    subtitle: "BLW",
    icon: "🥄",
    badge: "BONO",
    badgeColor: "bg-pink-400 group-hover:bg-pink-500",
    pdfUrl: "https://drive.google.com/file/d/1YJux29Dh_ORkano7rYpILB4ZzgtWJ_pc/view?usp=sharing",
    fileName: "BONO GUIA DE CORTES BLW.pdf",
    introTitle: "Guía de Cortes BLW",
    introDescription: "Aprende las técnicas correctas de corte para Baby Led Weaning y alimentación segura.",
    introContent: "Una guía visual completa que te enseña cómo cortar diferentes alimentos de forma segura para tu bebé según el método BLW (Baby Led Weaning). Incluye técnicas de corte por edades, consejos de seguridad, y cómo preparar los alimentos para que tu bebé pueda explorar y comer de forma autónoma.",
    totalPages: 35
  },
  {
    id: 4,
    title: "BONO Guía para Dormir",
    subtitle: "A tu bebé",
    icon: "😴",
    badge: "BONO",
    badgeColor: "bg-yellow-500 group-hover:bg-yellow-600",
    pdfUrl: "https://drive.google.com/file/d/1XN3UcGQXtb7R5rocx5V8ETUGKWbauxjm/view?usp=sharing",
    fileName: "BONO Guia para dormir a tu bebe.pdf",
    introTitle: "Guía para Dormir a tu Bebé",
    introDescription: "Técnicas y consejos efectivos para establecer rutinas de sueño saludables para tu bebé.",
    introContent: "Una guía completa que te ayudará a entender los patrones de sueño de tu bebé y establecer rutinas efectivas. Incluye métodos suaves para ayudar a tu bebé a dormir mejor, consejos para crear un ambiente propicio para el descanso, y estrategias para manejar los despertares nocturnos de forma amorosa y efectiva.",
    totalPages: 42
  },
  {
    id: 5,
    title: "BONO Libro Estimulación",
    subtitle: "Para niña",
    icon: "👧",
    badge: "BONO",
    badgeColor: "bg-pink-400 group-hover:bg-pink-500",
    pdfUrl: "https://drive.google.com/file/d/1N_VKE-1NZnZaXOK96iX7Kn1ZZB5DI57g/view?usp=sharing",
    fileName: "BONO libro de estimulación para niña.pdf",
    introTitle: "Libro de Estimulación para Niña",
    introDescription: "Actividades y ejercicios de estimulación temprana diseñados especialmente para niñas.",
    introContent: "Un libro completo con actividades de estimulación temprana adaptadas para el desarrollo integral de las niñas. Incluye ejercicios de motricidad fina y gruesa, estimulación sensorial, desarrollo cognitivo y actividades creativas que favorecen el crecimiento saludable desde los primeros meses de vida.",
    totalPages: 68
  },
  {
    id: 6,
    title: "BONO Libro Estimulación",
    subtitle: "Para niño",
    icon: "👦",
    badge: "BONO",
    badgeColor: "bg-yellow-500 group-hover:bg-yellow-600",
    pdfUrl: "https://drive.google.com/file/d/1uwzWu-6vOJ49ixB5aqda_U099OPEahtz/view?usp=sharing",
    fileName: "BONO libro de estimulación para niño.pdf",
    introTitle: "Libro de Estimulación para Niño",
    introDescription: "Actividades y ejercicios de estimulación temprana diseñados especialmente para niños.",
    introContent: "Un libro completo con actividades de estimulación temprana adaptadas para el desarrollo integral de los niños. Incluye ejercicios de motricidad fina y gruesa, estimulación sensorial, desarrollo cognitivo y actividades dinámicas que favorecen el crecimiento saludable y la exploración activa desde los primeros meses de vida.",
    totalPages: 72
  },
  {
    id: 7,
    title: "BONO Planificador",
    subtitle: "Semanal de Comidas",
    icon: "📅",
    badge: "BONO",
    badgeColor: "bg-pink-400 group-hover:bg-pink-500",
    pdfUrl: "https://drive.google.com/file/d/12DRx6QlmwNYrZviXw6qfnixTELg5j1lP/view?usp=sharing",
    fileName: "BONO Planificador Semanal de Comidas para tu bebe.pdf",
    introTitle: "Planificador Semanal de Comidas",
    introDescription: "Organiza y planifica las comidas de tu bebé de manera fácil y nutritiva con este planificador semanal.",
    introContent: "Una herramienta práctica y completa para planificar las comidas de tu bebé durante toda la semana. Incluye plantillas organizadas por días, sugerencias de menús balanceados, listas de compras, y consejos para preparar comidas nutritivas y variadas que acompañen el crecimiento saludable de tu pequeño.",
    totalPages: 28
  }
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'feed', 'profile', 'intro', 'pdf'
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    scrollToTop();
  };

  const navigateToFeed = () => {
    setCurrentPage('feed');
  };

  const navigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setCurrentPage('intro');
  };

  const handleAccessContent = () => {
    setCurrentPage('pdf');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCard(null);
  };

  const handleBackToIntro = () => {
    setCurrentPage('intro');
  };

  const handleOpenExternalPDF = () => {
    if (selectedCard?.pdfUrl) {
      window.open(selectedCard.pdfUrl, '_blank');
    }
  };

  // Auto-play opcional (descomente para ativar)
  // useEffect(() => {
  //   const timer = setInterval(nextImage, 5000);
  //   return () => clearInterval(timer);
  // }, []);

  // Renderizar página de introdução se selecionada
  if (currentPage === 'intro' && selectedCard) {
    return (
      <>
        <IntroductionPage
          onBack={handleBackToHome}
          onAccessContent={handleAccessContent}
          title={selectedCard.introTitle}
          description={selectedCard.introDescription}
          content={selectedCard.introContent}
        />
        {/* Navigation sempre presente */}
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 shadow-lg z-50">
          <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
            <button onClick={navigateToHome} className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group">
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <HomeIcon className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">Início</span>
            </button>
            <button onClick={navigateToFeed} className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-yellow-50 active:scale-95 group">
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-200 shadow-md">
                <List className="w-5 h-5 text-yellow-700 group-hover:text-yellow-800" />
              </div>
              <span className="text-xs text-yellow-600 font-medium mt-1 group-hover:text-yellow-700">Feed</span>
            </button>
            <button onClick={navigateToProfile} className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group">
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <User className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">Perfil</span>
            </button>
          </div>
          <div className="text-center pb-2 bg-gradient-to-r from-pink-50 to-yellow-50">
            <span className="text-xs text-pink-400 font-medium">miembros.energiarentable.com</span>
          </div>
        </div>
      </>
    );
  }

  // Renderizar visualizador de PDF se selecionado
  if (currentPage === 'pdf' && selectedCard) {
    return (
      <>
        <PDFViewer
          onBack={handleBackToIntro}
          onOpenExternal={handleOpenExternalPDF}
          title={selectedCard.title}
          pdfUrl={selectedCard.pdfUrl}
        />
        {/* Navigation sempre presente */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 shadow-lg z-50">
          <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
            <button onClick={navigateToHome} className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group">
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <HomeIcon className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">Início</span>
            </button>
            <button onClick={navigateToFeed} className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-yellow-50 active:scale-95 group">
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-200 shadow-md">
                <List className="w-5 h-5 text-yellow-700 group-hover:text-yellow-800" />
              </div>
              <span className="text-xs text-yellow-600 font-medium mt-1 group-hover:text-yellow-700">Feed</span>
            </button>
            <button onClick={navigateToProfile} className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group">
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <User className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">Perfil</span>
            </button>
          </div>
          <div className="text-center pb-2 bg-gradient-to-r from-pink-50 to-yellow-50">
            <span className="text-xs text-pink-400 font-medium">miembros.energiarentable.com</span>
          </div>
        </div>
      </>
    );
  }

  // Renderizar página de feed se selecionada
  if (currentPage === 'feed') {
    return (
      <>
        <FeedPage onBack={() => setCurrentPage('home')} />
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 shadow-lg z-50">
          <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
            
            {/* Início */}
            <button 
              onClick={navigateToHome}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <HomeIcon className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">
                Início
              </span>
            </button>

            {/* Feed - Ativo */}
            <button 
              onClick={navigateToFeed}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-yellow-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all duration-200 shadow-md">
                <List className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-yellow-500 font-semibold mt-1 group-hover:text-yellow-600">
                Feed
              </span>
            </button>

            {/* Perfil */}
            <button 
              onClick={navigateToProfile}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <User className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">
                Perfil
              </span>
            </button>

          </div>
          
          {/* Linha do domínio */}
          <div className="text-center pb-2 bg-gradient-to-r from-pink-50 to-yellow-50">
            <span className="text-xs text-pink-400 font-medium">
              alimentobebe.nutricioninfantil.com
            </span>
          </div>
        </div>
      </>
    );
  }

  // Renderizar página de perfil se selecionada
  if (currentPage === 'profile') {
    return (
      <>
        <ProfilePage onBack={() => setCurrentPage('home')} />
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 shadow-lg z-50">
          <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
            
            {/* Início */}
            <button 
              onClick={navigateToHome}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <HomeIcon className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">
                Início
              </span>
            </button>

            {/* Feed */}
            <button 
              onClick={navigateToFeed}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-yellow-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-200 shadow-md">
                <List className="w-5 h-5 text-yellow-700 group-hover:text-yellow-800" />
              </div>
              <span className="text-xs text-yellow-600 font-medium mt-1 group-hover:text-yellow-700">
                Feed
              </span>
            </button>

            {/* Perfil - Ativo */}
            <button 
              onClick={navigateToProfile}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 group-hover:from-pink-400 group-hover:to-pink-500 transition-all duration-200 shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-pink-500 font-semibold mt-1 group-hover:text-pink-600">
                Perfil
              </span>
            </button>

          </div>
          
          {/* Linha do domínio */}
          <div className="text-center pb-2 bg-gradient-to-r from-pink-50 to-yellow-50">
            <span className="text-xs text-pink-400 font-medium">
              alimentobebe.nutricioninfantil.com
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">
      <div className="container mx-auto px-4 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-4 md:mb-4 pt-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Vidas Saludables
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto font-medium">
            Tu centro de nutrición para el desarrollo saludable de tu bebé
          </p>
        </div>

        {/* Carousel Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-visible sm:overflow-hidden mb-8 sm:mb-0">
            {/* Image Container */}
            <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[500px] overflow-hidden">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentImage 
                      ? 'translate-x-0' 
                      : index < currentImage 
                        ? '-translate-x-full' 
                        : 'translate-x-full'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-r from-yellow-100 to-pink-100 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Imagem Real do Livro/Guia */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                          src={image} 
                          alt={`${index === 0 ? 'Recetas Nutritivas' : index === 1 ? 'Alimentación Balanceada' : 'Crecimiento Saludable'}`}
                          className="w-full h-full object-contain rounded-lg shadow-2xl"
                          style={{ 
                            maxHeight: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain'
                          }}
                        />
                        {/* Overlay com informações - apenas no mobile */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg sm:hidden"></div>
                        <div className="absolute bottom-1 left-2 right-2 text-white sm:hidden">
                          <h3 className="text-xs font-bold leading-tight">
                            {index === 0 
                              ? 'Recetas Nutritivas - Más de 500 recetas nutritivas' 
                              : index === 1 
                                ? 'Alimentación Balanceada - Guías de alimentación'
                                : 'Crecimiento Saludable - Consejos de crecimiento'
                            }
                          </h3>
                        </div>
                        {/* Informações para desktop - fora da imagem */}
                        <div className="hidden sm:block absolute -bottom-16 left-0 right-0 text-center">
                          <h3 className="text-lg md:text-xl font-bold text-slate-700">
                            {index === 0 
                              ? 'Recetas Nutritivas - Más de 500 recetas nutritivas para tu bebé' 
                              : index === 1 
                                ? 'Alimentación Balanceada - Guías completas de alimentación balanceada'
                                : 'Crecimiento Saludable - Consejos para un crecimiento saludable'
                            }
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Bottom Section with CTA */}
            <div className="bg-gradient-to-r from-pink-200 via-yellow-100 to-pink-200 p-2 md:p-8">
              <div className="text-center">
                
                {/* Indicators */}
                <div className="flex justify-center items-center space-x-2 py-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentImage 
                          ? 'bg-pink-500 scale-125' 
                          : 'bg-gray-400 hover:bg-pink-300'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Cards Section */}
        <div className="max-w-6xl mx-auto mt-12 px-4 pb-32">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* Renderizar cards dinamicamente */}
            {cardData.map((card) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="bg-gradient-to-br from-yellow-100 to-pink-100 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer active:scale-95 active:shadow-md group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-pink-200 rounded-full flex items-center justify-center group-hover:bg-pink-300 group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl group-hover:animate-bounce">{card.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-3">
                    {card.subtitle}
                  </p>
                  <div className={`${card.badgeColor} text-white text-xs px-2 py-1 rounded-full group-hover:scale-105 transition-all duration-300`}>
                    {card.badge}
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 shadow-lg z-50">
          <div className="flex justify-around items-center px-4 max-w-md mx-auto">
            
            {/* Início */}
            <button 
              onClick={navigateToHome}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 group-hover:from-pink-400 group-hover:to-pink-500 transition-all duration-200 shadow-md">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-pink-500 font-semibold mt-1 group-hover:text-pink-600">
                Início
              </span>
            </button>

            {/* Feed */}
            <button 
              onClick={navigateToFeed}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-yellow-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-200 shadow-md">
                <List className="w-5 h-5 text-yellow-700 group-hover:text-yellow-800" />
              </div>
              <span className="text-xs text-yellow-600 font-medium mt-1 group-hover:text-yellow-700">
                Feed
              </span>
            </button>

            {/* Perfil */}
            <button 
              onClick={navigateToProfile}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 hover:bg-pink-50 active:scale-95 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-200 shadow-md">
                <User className="w-5 h-5 text-pink-700 group-hover:text-pink-800" />
              </div>
              <span className="text-xs text-pink-600 font-medium mt-1 group-hover:text-pink-700">
                Perfil
              </span>
            </button>

          </div>
          
          {/* Linha do domínio */}
          <div className="text-center pb-2 bg-gradient-to-r from-pink-50 to-yellow-50">
            <span className="text-xs text-pink-400 font-medium">
              alimentobebe.nutricioninfantil.com
            </span>
          </div>
        </div>

      {/* Espaço adicional mínimo */}
      <div className="h-4"></div>
    </div>
  );
}
