function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
      });
  }

  // Verifica se o user_id ja existe no storage, se nao cria e armazena
  if(!localStorage.getItem('user_id')){
    const userId = generateUUID();
    localStorage.setItem('user_id', userId);
  }

document.addEventListener('click', function(event) {
  let destino;
  let tipo_click;

  if (event.target.tagName === 'A') {
       destino = event.target.href;
       if (destino.includes('kirvano.com')) {
            tipo_click = "INICIATE_CHECKOUT";
        }else if(destino.includes('/legal/')){
            tipo_click = "LEGAL";
        } else{
             tipo_click = "link";
         }
  } else if (event.target.tagName === 'BUTTON') {
    if (event.target.onclick) {
          const onclickString = event.target.onclick.toString();
      const match = onclickString.match(/scrollIntoView\({behavior: 'smooth'}\)\'/);
        if(match){
          const idMatch = onclickString.match(/document\.getElementById\('([^']+)'\)/);
          if(idMatch){
              destino = "#" + idMatch[1];
              tipo_click = "botao_scroll"
          } else {
            tipo_click = "botao_sem_destino";
            destino = "NA";
          }
          
        }else if (event.target.onclick.toString().includes("window.location.href='")) {
             if(event.target.onclick.toString().includes('kirvano.com')){
               destino = event.target.onclick.toString().match(/window\.location\.href='(.*?)'/)[1];
               tipo_click = "INICIATE_CHECKOUT"
              } else{
                destino = "NA";
                 tipo_click = "botao_sem_destino";
              }
          } else {
            destino = "NA";
              tipo_click = "botao_sem_destino";
          }
    } else {
        destino = "NA";
        tipo_click = "botao_sem_destino";
    }
  } else{
    return;
  }
  const now = new Date();
  const origem = window.location.href;
  const utms = {};

  if (destino && destino != "NA") {
    const urlParams = new URLSearchParams(new URL(destino, origem).search);
    for (const [key, value] of urlParams.entries()) {
        if (key.startsWith('utm_')) {
            utms[key] = value;
        }
    }
  }

  const userId = localStorage.getItem('user_id');

  const data = {
          data_click: now.toISOString(),
          url_origem: origem,
          url_destino: destino,
          utms: utms,
          user_id: userId,
          tipo_click: tipo_click,
      };


  const webhookURL = 'https://my-friend-n8n.uha4jw.easypanel.host/webhook-test/03237c00-2742-47ad-af61-f561d78d24e1';
      if (event.target.tagName === 'A' && event.target.hostname !== window.location.hostname){ //Verifica se é link externo
          event.preventDefault();
          fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify(data),
            })
            .then(() => {
               window.location.href = destino; //Redireciona APÓS enviar o dado
            });
         }else if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
              fetch(webhookURL, {
                  method: 'POST',
                   headers: {
                      'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(data),
                   });
           }
});