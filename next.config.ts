import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações para produção
  images: {
    // Permitir imagens de domínios externos se necessário
    domains: ['drive.google.com', 'docs.google.com'],
    // Otimizar carregamento de imagens
    unoptimized: true, // Para imagens estáticas locais
  },
  
  // Configurações para assets estáticos
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Configurações de headers para CORS se necessário
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  
  // Configurações experimentais para otimização
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
