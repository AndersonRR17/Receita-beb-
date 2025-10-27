'use client';

import { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Smartphone, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { PlanoAssinatura, DadosCheckout, DadosCartao } from '@/types';

const planosDisponiveis: PlanoAssinatura[] = [
  {
    id: 'basico-mensal',
    nome: 'Plano Básico',
    preco: 29.90,
    precoOriginal: 49.90,
    descricao: 'Acesso completo aos guias de alimentação',
    beneficios: [
      'Mais de 500 receitas nutritivas',
      'Guia de alimentos alergênicos',
      'Guia de cortes BLW',
      'Suporte via WhatsApp'
    ],
    periodo: 'mensal',
    cor: 'pink'
  },
  {
    id: 'premium-mensal',
    nome: 'Plano Premium',
    preco: 49.90,
    precoOriginal: 89.90,
    descricao: 'Tudo do básico + conteúdos exclusivos',
    beneficios: [
      'Tudo do plano básico',
      'Guia para dormir o bebê',
      'Livros de estimulação',
      'Planificador semanal',
      'Consultoria nutricional',
      'Grupo VIP no Telegram'
    ],
    destaque: true,
    periodo: 'mensal',
    cor: 'yellow'
  },
  {
    id: 'anual',
    nome: 'Plano Anual',
    preco: 297.00,
    precoOriginal: 597.00,
    descricao: 'Melhor custo-benefício - 50% de desconto',
    beneficios: [
      'Tudo do plano premium',
      'Economia de 50%',
      'Atualizações gratuitas',
      'Acesso vitalício aos materiais',
      'Bônus exclusivos mensais'
    ],
    periodo: 'anual',
    cor: 'purple'
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState<'planos' | 'dados' | 'pagamento' | 'confirmacao'>('planos');
  const [planoSelecionado, setPlanoSelecionado] = useState<PlanoAssinatura | null>(null);
  const [dadosCheckout, setDadosCheckout] = useState<Partial<DadosCheckout>>({});
  const [dadosCartao, setDadosCartao] = useState<Partial<DadosCartao>>({});
  const [carregando, setCarregando] = useState(false);
  const [garantiaAberta, setGarantiaAberta] = useState(false);
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const handleSelecionarPlano = (plano: PlanoAssinatura) => {
    setPlanoSelecionado(plano);
    setDadosCheckout(prev => ({ ...prev, planoSelecionado: plano }));
    setEtapaAtual('dados');
  };

  const handleDadosPessoais = (dados: Partial<DadosCheckout>) => {
    setDadosCheckout(prev => ({ ...prev, ...dados }));
    setEtapaAtual('pagamento');
  };

  const handleFinalizarCompra = async () => {
    setCarregando(true);

    // Simular processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCarregando(false);
    setEtapaAtual('confirmacao');
  };

  const voltarEtapa = () => {
    switch (etapaAtual) {
      case 'dados':
        setEtapaAtual('planos');
        break;
      case 'pagamento':
        setEtapaAtual('dados');
        break;
      case 'confirmacao':
        router.push('/home'); // Redireciona para /home após finalizar
        break;
      default:
        // Na primeira etapa, não há para onde voltar
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">

        {/* Etapa 1: Seleção de Planos */}
        {etapaAtual === 'planos' && (
          <div className="space-y-6">
            {/* Seção de Marketing com Imagens */}
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {/* Primeira Imagem - Promessa Principal */}
              <div className="bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-3xl p-3 text-white shadow-2xl relative overflow-hidden">
                {/* Efeito de brilho de fundo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>

                <div className="relative text-center">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                    Convierte la alimentación en un momento feliz: en{' '}
                    <span className="bg-yellow-300 text-pink-900 px-1 py-1 rounded-xl font-black text-2xl md:text-3xl shadow-lg inline-block transform -rotate-1">
                      solo 21 días
                    </span>
                    , tu bebé comerá sin peleas ni rechazo
                  </h3>

                  {/* Elementos decorativos */}
                  <div className="flex justify-center mt-4 space-x-2">
                    <span className="text-2xl animate-bounce">🍎</span>
                    <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>👶</span>
                    <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
                  </div>
                </div>
              </div>
              {/* Vídeo Promocional */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-pink-200 overflow-hidden">
                <video
                  className="w-full h-auto rounded-xl"
                  controls
                  preload="metadata"
                >
                  <source src="/bebe.mov" type="video/quicktime" />
                  <source src="/bebe.mov" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              </div>
              {/* Segunda Imagem - Problemas e Soluções */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">
                  ESTE LIBRO ES PARA TI SI..
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💕</span>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        La hora de la comida se ha convertido en una{' '}
                        <span className="font-bold">batalla diaria</span> y ya no sabes qué hacer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💕</span>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        Te preocupa que tu bebé no esté recibiendo{' '}
                        <span className="font-bold">los nutrientes que necesita</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💕</span>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        Querés dejar de <span className="font-bold">forzar</span> a tu bebé a comer y
                        lograr que lo haga <span className="font-bold">con gusto</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💕</span>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        Probaste de todo, pero tu bebé sigue sin
                        querer probar <span className="font-bold">nuevos alimentos</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💕</span>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        No sabés con qué alimento deberías
                        empezar <span className="font-bold">siendo tan pequeño</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💕</span>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        Tenés miedo de que algún alimento le{' '}
                        <span className="font-bold">produzca alergia</span> o le haga sentir mal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Seção do Livro - Apenas Imagem */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-pink-200 overflow-hidden">
              <img
                src="/imag3.png"
                alt="Páginas internas do livro de receitas"
                className="w-full h-auto"
              />
            </div>
            {/* Seção "Lo que vas a lograr" */}
            <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-pink-200">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">
                Lo que vas a lograr..
              </h3>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">💕</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg">
                      Convertir la hora de la comida en un momento{' '}
                      <span className="font-bold">tranquilo y feliz</span>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">💕</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg">
                      Que tu bebé coma de forma natural y{' '}
                      <span className="font-bold">sin peleas</span>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">💕</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg">
                      Saber exactamente qué{' '}
                      <span className="font-bold">alimentos ofrecerle a tu bebé</span>{' '}
                      y en qué momento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">💕</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg">
                      Garantizar que tu bebé reciba todos los{' '}
                      <span className="font-bold">nutrientes esenciales</span> para su desarrollo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">💕</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg">
                      Ahorrar tiempo con recetas{' '}
                      <span className="font-bold">fáciles y rápidas</span> de preparar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção de Bônus */}
              <div className="mt-10 text-center">
                <h4 className="text-xl md:text-2xl font-bold text-pink-600 mb-2">
                  Y ADEMÁS.. ¡Hoy te llevas 5 regalos exclusivos con tu compra!
                </h4>
                <div>
                  <img src="/imag1.png" alt="Regalo 1" className="w-full h-auto" />
                </div>
                <div className="mt-6  p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <p className="text-pink-600 font-bold text-lg">
                      +4.228 DESCARGAS
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-4">
                    La Biblia de la Alimentación Infantil: +500 Recetas y 5 BONOS para un Bebé Feliz y Saludable
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Bestseller
                    </span>
                    <span className="bg-pink-400 text-pink-900 px-3 py-1 rounded-full text-sm font-semibold">
                      +500 Recetas
                    </span>
                    <span className="bg-purple-400 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">
                      5 Bonos Gratis
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {/* Preços */}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through text-xl">
                        $30.000,00 ARS
                      </span>
                      <span className="text-3xl md:text-4xl font-bold text-slate-800">
                        $17.999,00 ARS
                      </span>
                    </div>

                    {/* Badge de oferta */}
                    <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                      🎁 Oferta -50% OFF solo 20 cupos
                    </div>

                    {/* Parcelamento */}
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 text-2xl">💳</span>
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold">3 cuotas</span>{' '}
                        <span className="font-bold text-red-600">SIN INTERES</span>{' '}
                        <span>de</span>{' '}
                        <span className="font-bold text-green-600">$5.999</span>
                      </p>
                    </div>

                    {/* Banner de urgência */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-4 px-6 rounded-xl shadow-lg">
                      <p className="text-lg md:text-xl font-bold">
                        ⚡ ¡Últimos 3 cupos en oferta! ⚡
                      </p>
                      <p className="text-base md:text-lg mt-1">
                        Solo por HOY, domingo 26 de octubre.
                      </p>
                    </div>
                    {/* Botão Agregar al carrito */}
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg md:text-xl font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
                      Agregar al carrito
                    </button>

                    {/* Accordion Garantía "7 Días sin riesgos" */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setGarantiaAberta(!garantiaAberta)}
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">↩️</span>
                          <span className="font-semibold text-gray-800">
                            Garantía "7 Días sin riesgos"
                          </span>
                        </div>
                        {garantiaAberta ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>

                      {/* Conteúdo expandido */}
                      {garantiaAberta && (
                        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4 text-gray-700">
                          <p>
                            Estamos tan seguros de que nuestras <span className="font-semibold">+500 recetas</span> transformarán la experiencia de la alimentación de tu bebé que te ofrecemos nuestra garantía de{' '}
                            <span className="font-bold">satisfacción total en 7 días.</span> Aca te explico cómo funciona:
                          </p>

                          <div>
                            <p className="font-semibold mb-2">Prueba nuestras recetas sin riesgo:</p>
                            <p>
                              Compra el libro y comienza a cocinar. En los próximos 7 días, si no ves a tu bebé disfrutando de sus comidas y tú sintiendo la tranquilidad de una hora de comida feliz,{' '}
                              <span className="font-bold">te devolvemos el 100% de tu inversión.</span>
                            </p>
                          </div>

                          <div>
                            <p className="font-semibold mb-2">¿Cómo lo hacemos?</p>
                            <p>
                              Si sientes que no hemos cumplido con nuestra promesa de transformar las comidas en momentos placenteros, simplemente envíanos un mensaje y{' '}
                              <span className="font-bold">te devolveremos tu dinero, sin preguntas y sin complicaciones.</span>
                            </p>
                          </div>

                          <div>
                            <p className="font-semibold mb-2">Así que no hay nada que perder y mucho que ganar.</p>
                            <p className="text-orange-600 font-medium">
                              ¡Comienza hoy mismo y transforma la hora de la comida en un momento feliz!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Seção 5 BONOS GRATIS */}
                <div className="mt-4 p-4 md:p-8">
                  {/* Título principal */}
                  <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                      5 BONOS GRATIS
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                      <span className="underline decoration-4 decoration-black">SOLO POR HOY</span>
                      <span className="ml-2">⬆️</span>
                    </h3>
                  </div>

                  {/* BONO #1 */}
                  <div className="mb-8">

                    {/* Imagem do livro */}
                    <div className="flex justify-center mb-6">
                      <Image
                        src="/BONO 1.webp"
                        alt="Menú Semanal para tu bebé"
                        width={1200}
                        height={1200}
                        className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto"
                        priority
                      />
                    </div>

                    {/* Título do bônus */}
                    <h4 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">
                      Menú Semanal de Comidas para 3 Meses<br />
                      (Editable)
                    </h4>

                    {/* Descrição */}
                    <div className="text-center text-gray-700 space-y-2">
                      <p>
                        Un mes completo de desayunos, almuerzos, meriendas y cenas para tu bebé! Además, incluye 2 meses extras en formato{' '}
                        <span className="font-bold">editable</span> para que puedas personalizarlo con las recetas que más le gusten.
                      </p>
                      <p>
                        Imprímilo y <span className="font-bold">pégalo en tu heladera para organizarte sin esfuerzo.</span>
                      </p>
                    </div>
                  </div>
                  {/* BONO #2 */}
                  <div className="mb-8 mt-8">

                    {/* Imagem do livro */}
                    <div className="flex justify-center mb-6">
                      <Image
                        src="/BONO 02.webp"
                        alt="Guía de Alimentos Prohibidos y Alergénicos"
                        width={1200}
                        height={1200}
                        className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto"
                        priority
                      />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">
                      Guía de Alimentos Prohibidos y Alergénicos
                    </h4>

                    {/* Descrição */}
                    <div className="text-center text-gray-700 space-y-2">
                      <p>
                        Con esta guía vas a saber cuáles son los{' '}
                        <span className="font-bold">alimentos prohibidos</span> según la edad de tu bebé, los principales alérgenos y sus síntomas, y qué hacer ante una reacción. Además,{' '}
                        <span className="font-bold">incluye consejos para introducir nuevos alimentos de forma segura.</span>
                      </p>
                      <p className="text-blue-600 font-medium">
                        Imprímila y tenela siempre a mano
                      </p>
                    </div>

                    {/* Imagem do livro BONO #3 */}
                    <div className="flex justify-center mb-6 mt-6">
                      <Image
                        src="/BONO 03.webp"
                        alt="Guía de Cortes de Alimentos según la Edad de tu Bebé"
                        width={1200}
                        height={1200}
                        className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto"
                        priority
                      />
                    </div>

                    {/* Título do bônus */}
                    <h4 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">
                      Guía de Cortes de Alimentos según la Edad de tu Bebé
                    </h4>

                    {/* Descrição */}
                    <div className="text-center text-gray-700 space-y-2">
                      <p>
                        Una guía para que sepas cómo{' '}
                        <span className="font-bold">preparar los alimentos de tu bebé</span> según su edad. Incluye imágenes y recomendaciones claras sobre los cortes adecuados para cada etapa de desarrollo, garantizando que la{' '}
                        <span className="font-bold">comida sea segura y fácil de manejar.</span>
                      </p>
                    </div>
                    <div className="flex justify-center mb-6 mt-6">
                      <Image
                        src="/BONO 4.webp"
                        alt="Guía de Cortes de Alimentos según la Edad de tu Bebé"
                        width={1200}
                        height={1200}
                        className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto"
                        priority
                      />
                    </div>

                    {/* Título do bônus */}
                    <h4 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">
                      Guia para dormir a tu bebe
                    </h4>

                     {/* Descrição */}
                     <div className="text-center text-gray-700 space-y-2">
                       <p>
                         Todo lo que necesitás saber para mejorar el sueño de tu bebé. Aprendé sobre{' '}
                         <span className="font-bold">despertares nocturnos, insomnio, pesadillas</span> y otros trastornos del sueño. Además, incluye{' '}
                         <span className="font-bold">hábitos saludables, rutinas efectivas</span> para que duerma toda la noche
                       </p>
                     </div>
                   </div>
                    {/* BONO #5 */}
                    <div className="mb-8 mt-8">

                      {/* Imagem do livro BONO #5 */}
                      <div className="flex justify-center mb-6">
                        <Image
                          src="/BONO 5.webp"
                          alt="Libro digital de estimulacion"
                          width={1200}
                          height={1200}
                          className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto"
                          priority
                        />
                      </div>

                      {/* Título do bônus */}
                      <h4 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">
                        Libro digital de estimulacion
                      </h4>

                      {/* Descrição */}
                      <div className="text-center text-gray-700 space-y-2">
                        <p>
                          Una guía divertida para que tu bebé aprenda las primeras cosas importantes de forma interactiva y personalizada. Cada sección está diseñada para que los pequeños completen con{' '}
                          <span className="font-bold">sus propios datos y fotos familiares</span>, creando un recuerdo único mientras estimulan su desarrollo.{' '}
                          <span className="font-bold">Descargalo y comenzá la aventura de aprendizaje!</span>
                        </p>
                      </div>
                    </div>
                </div>
                 {/* Seção Preguntas Frecuentes */}
                 <div className="mt-12 bg-white p-6 md:p-8">
                   <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                     Preguntas Frecuentes
                   </h2>

                   <div className="space-y-4">
                     {/* Pergunta 1 */}
                     <div className="">
                       <button
                         onClick={() => setFaqAberto(faqAberto === 1 ? null : 1)}
                         className="w-full flex items-start justify-between p-4 md:p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                       >
                         <div className="flex items-start gap-3 flex-1">
                           <div className="flex-shrink-0 mt-1">
                             <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                               {faqAberto === 1 && <span className="text-gray-700">✓</span>}
                             </div>
                           </div>
                           <span className="font-medium text-gray-900 text-base md:text-lg">
                             ¿Qué pasa si tengo dudas sobre el contenido o necesito más información sobre las recetas?
                           </span>
                         </div>
                         {faqAberto === 1 ? (
                           <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" />
                         ) : (
                           <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" />
                         )}
                       </button>

                       {faqAberto === 1 && (
                         <div className="p-6 bg-gray-50 border-t border-gray-200">
                           <p className="text-gray-700 leading-relaxed">
                             <span className="text-blue-600">¡Estamos aquí para ayudarte!</span> Si tienes preguntas sobre alguna receta específica o necesitas más detalles sobre el contenido, no dudes en contactarnos. Puedes enviarnos un correo electrónico o escribirnos a través de nuestras redes sociales. Nuestro equipo estará encantado de asistirte y asegurarse de que saques el máximo provecho de nuestras recetas para que la alimentación de tu bebé sea una experiencia maravillosa.
                           </p>
                         </div>
                       )}
                     </div>

                     {/* Pergunta 2 */}
                     <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                       <button
                         onClick={() => setFaqAberto(faqAberto === 2 ? null : 2)}
                         className="w-full flex items-start justify-between p-4 md:p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                       >
                         <div className="flex items-start gap-3 flex-1">
                           <div className="flex-shrink-0 mt-1">
                             <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                               {faqAberto === 2 && <span className="text-gray-700">✓</span>}
                             </div>
                           </div>
                           <span className="font-medium text-gray-900 text-base md:text-lg">
                             ¿Qué métodos de pago aceptan?
                           </span>
                         </div>
                         {faqAberto === 2 ? (
                           <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" />
                         ) : (
                           <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" />
                         )}
                       </button>

                       {faqAberto === 2 && (
                         <div className="p-6 bg-gray-50 border-t border-gray-200">
                           <p className="text-gray-700 leading-relaxed">
                             Aceptamos diversas opciones de pago para que el proceso sea más cómodo para ti. Puedes realizar tu compra a través de tarjetas de crédito, débito y si tienes dinero en tu cuenta de Mercado Pago, puedes usarlo para pagar fácilmente. Si tienes alguna pregunta sobre un método específico, no dudes en consultarnos
                           </p>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 2: Dados Pessoais */}
        {etapaAtual === 'dados' && planoSelecionado && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Seus Dados Pessoais
              </h2>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleDadosPessoais({
                  nome: formData.get('nome') as string,
                  email: formData.get('email') as string,
                  telefone: formData.get('telefone') as string,
                });
              }} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Resumo do Plano */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Resumo do Pedido:</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{planoSelecionado.nome}</span>
                    <span className="font-bold text-pink-600">
                      R$ {planoSelecionado.preco.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Continuar para Pagamento
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Etapa 3: Pagamento */}
        {etapaAtual === 'pagamento' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Forma de Pagamento
              </h2>

              {/* Métodos de Pagamento */}
              <div className="space-y-4 mb-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { id: 'cartao', nome: 'Cartão de Crédito', icone: CreditCard, descricao: 'Aprovação imediata' },
                    { id: 'pix', nome: 'PIX', icone: Smartphone, descricao: 'Desconto de 5%' },
                    { id: 'boleto', nome: 'Boleto', icone: FileText, descricao: 'Vence em 3 dias' }
                  ].map((metodo) => (
                    <button
                      key={metodo.id}
                      onClick={() => setDadosCheckout(prev => ({ ...prev, metodoPagamento: metodo.id as any }))}
                      className={`p-4 border-2 rounded-xl transition-all hover:scale-105 ${dadosCheckout.metodoPagamento === metodo.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                        }`}
                    >
                      <metodo.icone className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                      <div className="text-sm font-medium text-gray-800">{metodo.nome}</div>
                      <div className="text-xs text-gray-600">{metodo.descricao}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulário de Cartão */}
              {dadosCheckout.metodoPagamento === 'cartao' && (
                <div className="space-y-4 mb-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PIX */}
              {dadosCheckout.metodoPagamento === 'pix' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800 mb-2">Pagamento via PIX</h3>
                    <p className="text-sm text-green-700">
                      Após confirmar, você receberá o QR Code para pagamento
                    </p>
                    <div className="mt-3 p-2 bg-green-100 rounded-lg">
                      <span className="text-lg font-bold text-green-800">
                        R$ {planoSelecionado ? (planoSelecionado.preco * 0.95).toFixed(2).replace('.', ',') : '0,00'}
                      </span>
                      <span className="text-sm text-green-600 ml-2">(5% de desconto)</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleFinalizarCompra}
                disabled={carregando || !dadosCheckout.metodoPagamento}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100"
              >
                {carregando ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </div>
          </div>
        )}

        {/* Etapa 4: Confirmação */}
        {etapaAtual === 'confirmacao' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Parabéns! 🎉
              </h2>

              <p className="text-lg text-gray-600 mb-6">
                Sua compra foi realizada com sucesso!
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Detalhes da Compra:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plano:</span>
                    <span className="font-medium">{planoSelecionado?.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor:</span>
                    <span className="font-medium text-green-600">
                      R$ {planoSelecionado?.preco.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Você receberá um e-mail com os detalhes de acesso em alguns minutos.
              </p>

              <button
                onClick={() => router.push('/home')}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Acessar Seus Materiais
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}