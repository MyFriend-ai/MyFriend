fetch('/redirects.json')
  .then(response => response.json())
  .then(data => {
    const path = window.location.pathname.substring(1); // Remove a barra inicial
    const shortUrl = path.split('/')[0]; // Pega a primeira parte da URL após a barra

    const link = data.links.find(item => item.shortUrl === shortUrl);

    if (link) {
      window.location.href = link.targetUrl;
    } else {
       // Se não encontrar um link, redireciona para a página inicial
      window.location.href = '/';
      // Ou você pode mostrar uma mensagem de erro
       // alert('Link não encontrado. Você será redirecionado para a página inicial.');
    }
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));