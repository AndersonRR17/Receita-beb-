/**
 * Script de diagnóstico para verificar se as imagens PDF estão disponíveis
 * Execute no console do navegador para verificar problemas de carregamento
 */

// Função para testar carregamento de imagens
function testImageLoading() {
  const testPages = [1, 2, 3, 10, 50, 100];
  const results = [];
  
  console.log('🔍 Iniciando teste de carregamento de imagens...');
  
  testPages.forEach(pageNumber => {
    const paddedNumber = pageNumber.toString().padStart(4, '0');
    const imagePath = `/+500 Recetas para bebés de 6meses a 3 años_page-${paddedNumber}.jpg`;
    
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Página ${pageNumber}: OK (${imagePath})`);
      results.push({ page: pageNumber, status: 'success', path: imagePath });
    };
    
    img.onerror = () => {
      console.log(`❌ Página ${pageNumber}: ERRO (${imagePath})`);
      results.push({ page: pageNumber, status: 'error', path: imagePath });
    };
    
    img.src = imagePath;
  });
  
  setTimeout(() => {
    console.log('📊 Resultados do teste:', results);
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    console.log(`✅ Sucessos: ${successCount}`);
    console.log(`❌ Erros: ${errorCount}`);
    
    if (errorCount > 0) {
      console.log('🔧 Sugestões para correção:');
      console.log('1. Verifique se as imagens estão na pasta public/');
      console.log('2. Verifique se os nomes dos arquivos estão corretos');
      console.log('3. Verifique se o servidor está servindo arquivos estáticos corretamente');
    }
  }, 3000);
}

// Função para verificar URLs do Google Drive
function testGoogleDriveUrls() {
  const testUrls = [
    'https://drive.google.com/file/d/1KJNXpLbtlz0PhQctzFB6krE9WWBd7xMy/view?usp=sharing',
    'https://drive.google.com/file/d/1Gw1c8F4P91RHNfTM_tb5JMNbR8jdmK76/view?usp=sharing'
  ];
  
  console.log('🔍 Testando URLs do Google Drive...');
  
  testUrls.forEach((url, index) => {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      
      console.log(`📄 PDF ${index + 1}:`);
      console.log(`   Original: ${url}`);
      console.log(`   Embed: ${embedUrl}`);
      
      // Testar se o embed funciona
      fetch(embedUrl, { mode: 'no-cors' })
        .then(() => console.log(`✅ PDF ${index + 1}: Embed URL acessível`))
        .catch(() => console.log(`❌ PDF ${index + 1}: Problema com embed URL`));
    }
  });
}

// Função para verificar ambiente de produção
function checkProductionEnvironment() {
  console.log('🌐 Verificando ambiente de produção...');
  
  const isProduction = process.env.NODE_ENV === 'production' || location.hostname !== 'localhost';
  const protocol = location.protocol;
  const hostname = location.hostname;
  
  console.log(`📍 Hostname: ${hostname}`);
  console.log(`🔒 Protocol: ${protocol}`);
  console.log(`🏭 Production: ${isProduction ? 'SIM' : 'NÃO'}`);
  
  if (protocol === 'https:') {
    console.log('✅ HTTPS ativo - bom para produção');
  } else {
    console.log('⚠️  HTTP - pode causar problemas com recursos externos');
  }
  
  // Verificar se Service Worker está ativo
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.log(`🔧 Service Workers ativos: ${registrations.length}`);
    });
  }
}

// Executar todos os testes
console.log('🚀 Iniciando diagnóstico completo do PDFViewer...');
console.log('');

checkProductionEnvironment();
console.log('');

testImageLoading();
console.log('');

testGoogleDriveUrls();

console.log('');
console.log('💡 Para executar testes individuais:');
console.log('   testImageLoading() - testa carregamento de imagens locais');
console.log('   testGoogleDriveUrls() - testa URLs do Google Drive');
console.log('   checkProductionEnvironment() - verifica ambiente');
