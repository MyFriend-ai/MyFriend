fetch('/redirects.json')
  .then(response => response.json())
  .then(data => {
    const fullUrl = window.location.href; // Pega a URL completa
    const baseUrl = window.location.origin; // Pega o domínio base (ex: https://meusite.com)
    const path = fullUrl.substring(baseUrl.length + 1); // Extrai a parte da URL depois do domínio base
    const shortUrl = path.split('/')[0]; // Pega a primeira parte da URL após o domínio base

    const link = data.links.find(item => item.shortUrl === shortUrl);
    
    // Adicionamos essa verificação:
    if (fullUrl === baseUrl + '/' + shortUrl) {
      if (link) {
          window.location.href = link.targetUrl;
      } else {
        // Se não encontrar um link, redireciona para a página inicial
        window.location.href = '/';
        // Ou você pode mostrar uma mensagem de erro
        // alert('Link não encontrado. Você será redirecionado para a página inicial.');
      }
    }
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));