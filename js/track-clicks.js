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
  const checkoutPlatforms = ['kirvano', 'kiwify', 'stripe', 'hotmart'];


  if (event.target.tagName === 'A') {
      destino = event.target.href;
       if (checkoutPlatforms.some(platform => destino.includes(platform))) {
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
           if (match) {
            const idMatch = onclickString.match(/document\.getElementById\('([^']+)'\)/);
             if (idMatch) {
                destino = "#" + idMatch[1];
                tipo_click = "botao_scroll";
                // Preserve UTMs in scroll links
                 const urlParams = new URLSearchParams(window.location.search);
                  const utmParams = new URLSearchParams();
                   urlParams.forEach((value, key) => {
                      if (key.startsWith('utm_')) {
                        utmParams.set(key, value);
                        }
                    });
                    if (utmParams.toString()) {
                       destino += (destino.includes('?') ? '&' : '?') + utmParams.toString();
                   }
                 }else{
                     tipo_click = "botao_sem_destino";
                    destino = "NA";
                }

           } else if (event.target.onclick.toString().includes("window.location.href='")) {
               const hrefMatch = event.target.onclick.toString().match(/window\.location\.href='(.*?)'/);
               if (hrefMatch) {
                    destino = hrefMatch[1];
                    if (checkoutPlatforms.some(platform => destino.includes(platform))) {
                      tipo_click = "INICIATE_CHECKOUT";
                   } else{
                       tipo_click = "botao_sem_destino";
                  }
              }else{
                    destino = "NA";
                     tipo_click = "botao_sem_destino";
                 }

          }  else {
               destino = "NA";
                tipo_click = "botao_sem_destino";
          }

      }  else {
          destino = "NA";
          tipo_click = "botao_sem_destino";
      }
   }  else{
      return;
  }

  const now = new Date();
  const origem = window.location.href;
  const utms = {};


  const urlParamsOrigem = new URLSearchParams(window.location.search);
  if (destino && destino != "NA") {
        const urlParamsDestino = new URLSearchParams(new URL(destino, origem).search);
          for (const [key, value] of urlParamsDestino.entries()) {
              if (key.startsWith('utm_')) {
                  utms[key] = value;
               }
          }
         for (const [key, value] of urlParamsOrigem.entries()) {
          if (key.startsWith('utm_')) {
            utms[key] = value;
              }
          }

  }else{
      for (const [key, value] of urlParamsOrigem.entries()) {
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

    if (event.target.tagName === 'A' && event.target.hostname !== window.location.hostname){
            event.preventDefault();
             fetch(webhookURL, {
                method: 'POST',
                   headers: {
                      'Content-Type': 'application/json',
                    },
                  body: JSON.stringify(data),
               })
                 .then(() => {
                    window.location.href = destino;
                  });
        } else if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
                fetch(webhookURL, {
                     method: 'POST',
                       headers: {
                          'Content-Type': 'application/json',
                       },
                       body: JSON.stringify(data),
                  });
          }


});