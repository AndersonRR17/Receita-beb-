'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Play, 
  Star, 
  Calendar, 
  Users, 
  BookOpen, 
  MessageCircle,
  Crown,
  Gift,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { UsuarioMembro, BeneficioMembro } from '@/types';

// Dados simulados do usuário membro
const usuarioMembro: UsuarioMembro = {
  id: '1',
  nome: 'Maria Silva',
  email: 'maria@email.com',
  plano: {
    id: 'premium-mensal',
    nome: 'Plano Premium',
    preco: 49.90,
    descricao: 'Acesso completo + conteúdos exclusivos',
    beneficios: [],
    periodo: 'mensal',
    cor: 'yellow'
  },
  dataInicio: new Date('2024-01-15'),
  dataVencimento: new Date('2024-12-15'),
  status: 'ativo'
};

const beneficiosDisponiveis: BeneficioMembro[] = [
  {
    id: '1',
    titulo: 'Mais de 500 Receitas',
    descricao: 'Receitas nutritivas organizadas por idade',
    icone: '📚',
    disponivel: true,
    link: '/materiais/receitas'
  },
  {
    id: '2',
    titulo: 'Guia de Alimentos Alergênicos',
    descricao: 'Introdução segura de alimentos alergênicos',
    icone: '🥜',
    disponivel: true,
    link: '/materiais/alergenicos'
  },
  {
    id: '3',
    titulo: 'Guia de Cortes BLW',
    descricao: 'Técnicas de corte para Baby Led Weaning',
    icone: '🥄',
    disponivel: true,
    link: '/materiais/blw'
  },
  {
    id: '4',
    titulo: 'Guia do Sono',
    descricao: 'Técnicas para melhorar o sono do bebê',
    icone: '😴',
    disponivel: true,
    link: '/materiais/sono'
  },
  {
    id: '5',
    titulo: 'Livros de Estimulação',
    descricao: 'Atividades de desenvolvimento infantil',
    icone: '🎯',
    disponivel: true,
    link: '/materiais/estimulacao'
  },
  {
    id: '6',
    titulo: 'Planificador Semanal',
    descricao: 'Organize as refeições da semana',
    icone: '📅',
    disponivel: true,
    link: '/materiais/planificador'
  },
  {
    id: '7',
    titulo: 'Consultoria Nutricional',
    descricao: 'Sessões individuais com nutricionista',
    icone: '👩‍⚕️',
    disponivel: true,
    link: '/consultoria'
  },
  {
    id: '8',
    titulo: 'Grupo VIP Telegram',
    descricao: 'Comunidade exclusiva de mães',
    icone: '💬',
    disponivel: true,
    link: 'https://t.me/vidasaludables'
  }
];

const estatisticasUsuario = {
  materiaisAcessados: 12,
  receitasFavoritas: 8,
  diasAtivo: 45,
  proximaConsultoria: new Date('2024-02-20')
};

export default function MembrosPage() {
  const router = useRouter();
  const [abaSelecionada, setAbaSelecionada] = useState<'dashboard' | 'materiais' | 'comunidade' | 'perfil'>('dashboard');

  const calcularDiasRestantes = () => {
    const hoje = new Date();
    const vencimento = usuarioMembro.dataVencimento;
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-pink-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/home')}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
            
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h1 className="text-xl font-bold text-slate-800">Área de Membros</h1>
            </div>
            
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="bg-white border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', nome: 'Dashboard', icone: Star },
              { id: 'materiais', nome: 'Materiais', icone: BookOpen },
              { id: 'comunidade', nome: 'Comunidade', icone: Users },
              { id: 'perfil', nome: 'Perfil', icone: Crown }
            ].map((aba) => (
              <button
                key={aba.id}
                onClick={() => setAbaSelecionada(aba.id as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  abaSelecionada === aba.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-pink-600'
                }`}
              >
                <aba.icone className="w-4 h-4" />
                <span className="font-medium">{aba.nome}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        
        {/* Dashboard */}
        {abaSelecionada === 'dashboard' && (
          <div className="space-y-8">
            {/* Boas-vindas */}
            <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Olá, {usuarioMembro.nome}! 👋
                  </h2>
                  <p className="text-pink-100">
                    Bem-vinda à sua área exclusiva de membros
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-xl p-3">
                    <Crown className="w-8 h-8 text-yellow-200 mx-auto mb-1" />
                    <span className="text-sm font-medium">Premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status da Assinatura */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Status da Assinatura</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-semibold text-green-800">Ativo</div>
                      <div className="text-sm text-green-600">{usuarioMembro.plano.nome}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-semibold text-blue-800">
                        {calcularDiasRestantes()} dias
                      </div>
                      <div className="text-sm text-blue-600">até renovação</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8 text-purple-500" />
                    <div>
                      <div className="font-semibold text-purple-800">
                        R$ {usuarioMembro.plano.preco.toFixed(2).replace('.', ',')}
                      </div>
                      <div className="text-sm text-purple-600">valor mensal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Suas Estatísticas</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <BookOpen className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-600">
                    {estatisticasUsuario.materiaisAcessados}
                  </div>
                  <div className="text-sm text-pink-700">Materiais Acessados</div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">
                    {estatisticasUsuario.receitasFavoritas}
                  </div>
                  <div className="text-sm text-yellow-700">Receitas Favoritas</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {estatisticasUsuario.diasAtivo}
                  </div>
                  <div className="text-sm text-green-700">Dias Ativo</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {formatarData(estatisticasUsuario.proximaConsultoria).split(' ')[0]}
                  </div>
                  <div className="text-sm text-purple-700">Próxima Consultoria</div>
                </div>
              </div>
            </div>

            {/* Acesso Rápido */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Acesso Rápido</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {beneficiosDisponiveis.slice(0, 6).map((beneficio) => (
                  <button
                    key={beneficio.id}
                    onClick={() => {
                      if (beneficio.link?.startsWith('http')) {
                        window.open(beneficio.link, '_blank');
                      } else {
                        // Navegar para página interna
                        console.log('Navegar para:', beneficio.link);
                      }
                    }}
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all hover:scale-105"
                  >
                    <div className="text-2xl">{beneficio.icone}</div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{beneficio.titulo}</div>
                      <div className="text-sm text-gray-600">{beneficio.descricao}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Materiais */}
        {abaSelecionada === 'materiais' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Seus Materiais Exclusivos
              </h2>
              <p className="text-slate-600">
                Acesse todos os guias e materiais do seu plano
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {beneficiosDisponiveis.map((material) => (
                <div key={material.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">{material.icone}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {material.titulo}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {material.descricao}
                    </p>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          if (material.link?.startsWith('http')) {
                            window.open(material.link, '_blank');
                          }
                        }}
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Acessar
                      </button>
                      
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comunidade */}
        {abaSelecionada === 'comunidade' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Comunidade Vidas Saludables
              </h2>
              <p className="text-slate-600">
                Conecte-se com outras mães e compartilhe experiências
              </p>
            </div>

            {/* Grupo VIP */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Grupo VIP no Telegram</h3>
                  <p className="text-purple-100 mb-4">
                    Participe da nossa comunidade exclusiva com mais de 500 mães
                  </p>
                  <button
                    onClick={() => window.open('https://t.me/vidasaludables', '_blank')}
                    className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-xl hover:bg-purple-50 transition-all"
                  >
                    Entrar no Grupo
                  </button>
                </div>
                <MessageCircle className="w-16 h-16 text-purple-200" />
              </div>
            </div>

            {/* Próximos Eventos */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Próximos Eventos</h3>
              <div className="space-y-4">
                {[
                  {
                    titulo: 'Live: Introdução Alimentar aos 6 meses',
                    data: '25 de Janeiro, 2024',
                    horario: '20:00',
                    tipo: 'Live'
                  },
                  {
                    titulo: 'Workshop: Receitas Práticas para o Dia a Dia',
                    data: '2 de Fevereiro, 2024',
                    horario: '19:30',
                    tipo: 'Workshop'
                  },
                  {
                    titulo: 'Q&A: Tire suas Dúvidas sobre BLW',
                    data: '10 de Fevereiro, 2024',
                    horario: '20:30',
                    tipo: 'Q&A'
                  }
                ].map((evento, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">{evento.titulo}</h4>
                      <p className="text-sm text-gray-600">{evento.data} às {evento.horario}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                        {evento.tipo}
                      </span>
                      <button className="text-pink-600 hover:text-pink-700 font-medium">
                        Participar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Perfil */}
        {abaSelecionada === 'perfil' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={usuarioMembro.nome}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={usuarioMembro.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plano Atual</label>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div>
                      <div className="font-semibold text-yellow-800">{usuarioMembro.plano.nome}</div>
                      <div className="text-sm text-yellow-600">{usuarioMembro.plano.descricao}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-800">
                        R$ {usuarioMembro.plano.preco.toFixed(2).replace('.', ',')}
                      </div>
                      <div className="text-sm text-yellow-600">/{usuarioMembro.plano.periodo}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Membro desde</label>
                  <input
                    type="text"
                    value={formatarData(usuarioMembro.dataInicio)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Ações da Conta</h4>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors">
                    Alterar Plano
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors">
                    Histórico de Pagamentos
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors">
                    Cancelar Assinatura
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
