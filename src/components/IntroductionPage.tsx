'use client';

import { ArrowLeft, Play } from 'lucide-react';

interface IntroductionPageProps {
  onBack: () => void;
  onAccessContent: () => void;
  title: string;
  description: string;
  content: string;
}

export default function IntroductionPage({ 
  onBack, 
  onAccessContent, 
  title, 
  description, 
  content 
}: IntroductionPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">
      <div className="container mx-auto px-4 py-6">
        
        {/* Header com botão voltar */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Volver a mis cursos</span>
          </button>
        </div>

        {/* Card principal */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-pink-200">
            
            {/* Ícone decorativo */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">📚</span>
              </div>
            </div>
            
            {/* Título */}
            <h1 className="text-3xl font-bold text-yellow-600 mb-4 text-center">
              {title}
            </h1>
            
            {/* Descrição */}
            <p className="text-slate-600 text-sm mb-6 leading-relaxed text-center">
              {description}
            </p>
            
            {/* Conteúdo principal */}
            <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-6 mb-8 border border-pink-200">
              <p className="text-slate-700 text-sm leading-relaxed text-center">
                {content}
              </p>
            </div>
            
            {/* Botão de acesso */}
            <button 
              onClick={onAccessContent}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              Acceder al Contenido
            </button>
            
          </div>
        </div>

        {/* Espaçamento para navegação inferior */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}
