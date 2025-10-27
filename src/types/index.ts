// Tipagens para o sistema de checkout e membros

export interface PlanoAssinatura {
  id: string;
  nome: string;
  preco: number;
  precoOriginal?: number;
  descricao: string;
  beneficios: string[];
  destaque?: boolean;
  periodo: 'mensal' | 'anual';
  cor: 'pink' | 'yellow' | 'purple';
}

export interface DadosCheckout {
  nome: string;
  email: string;
  telefone: string;
  planoSelecionado: PlanoAssinatura;
  metodoPagamento: 'cartao' | 'pix' | 'boleto';
}

export interface DadosCartao {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
}

export interface UsuarioMembro {
  id: string;
  nome: string;
  email: string;
  plano: PlanoAssinatura;
  dataInicio: Date;
  dataVencimento: Date;
  status: 'ativo' | 'cancelado' | 'pendente';
  avatar?: string;
}

export interface BeneficioMembro {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  disponivel: boolean;
  link?: string;
}
