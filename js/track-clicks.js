document.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    const now = new Date();
    const origem = window.location.href;
    const destino = event.target.href;
    const utms = {};

    const urlParams = new URLSearchParams(new URL(destino).search);
    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith('utm_')) {
        utms[key] = value;
      }
    }
   
    const data = {
      data_click: now.toISOString(),
      url_origem: origem,
      url_destino: destino,
      utms: utms
    };


    fetch('https://my-friend-n8n.uha4jw.easypanel.host/webhook-test/03237c00-2742-47ad-af61-f561d78d24e1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
});