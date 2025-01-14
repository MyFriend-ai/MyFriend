    // Função para obter a data atual no formato YYYY-MM-DD
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
      // Função para buscar os dados já existentes do JSON
      async function fetchData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                console.log("fetchData: erro no fetch data.json - ", response.status, response.statusText)
              return [];
            }
            const jsonData = await response.json();
              console.log("fetchData: sucesso no fetch data.json - ", jsonData)
            return jsonData;
        } catch (error) {
          console.error("fetchData: Erro ao carregar os dados:", error);
          return [];
        }
      }
      
      // Função para salvar os dados de volta no JSON
      async function saveData(data) {
        try{
          const response = await fetch('data.json',{
            method: 'PUT', // usa PUT para atualizar
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          })
            if (!response.ok) {
                console.log("saveData: falha ao salvar os dados no json - ", response.status, response.statusText);
            }
              console.log("saveData: sucesso ao salvar os dados no json - ", data);
        }
        catch (error)
        {
            console.error("saveData: falha ao salvar os dados no json:", error);
        }
      
      }
      
      
      // Função para registrar pageview
      async function registerPageView() {
         console.log("registerPageView: PageView function called"); // Adicione esta linha
        const currentDate = getCurrentDate();
        let existingData = await fetchData();
        let todayData = existingData.find(item => item.date === currentDate);
      
        if (todayData) {
          todayData.pageviews = (todayData.pageviews || 0) + 1;
        } else {
          existingData.push({
            date: currentDate,
            pageviews: 1,
            click_cta: 0,
            purchases: 0,
          });
        }
      
        await saveData(existingData)
      
      }
      
      // Função para registrar clique na CTA (deve ser chamada quando o botão/link for clicado)
      async function registerClickCTA() {
          console.log("registerClickCTA: ClickCTA function called"); // Adicione esta linha
          const currentDate = getCurrentDate();
          let existingData = await fetchData();
          let todayData = existingData.find(item => item.date === currentDate);
      
          if (todayData) {
              todayData.click_cta = (todayData.click_cta || 0) + 1;
          } else {
              existingData.push({
                  date: currentDate,
                  pageviews: 0,
                  click_cta: 1,
                  purchases: 0,
              });
          }
      
          await saveData(existingData)
      
      }
      
      
      // Função para registrar compra
      async function registerPurchase() {
              console.log("registerPurchase: Purchase function called"); // Adicione esta linha
            const currentDate = getCurrentDate();
            let existingData = await fetchData();
            let todayData = existingData.find(item => item.date === currentDate);
      
            if (todayData) {
                todayData.purchases = (todayData.purchases || 0) + 1;
            } else {
              existingData.push({
                  date: currentDate,
                  pageviews: 0,
                  click_cta: 0,
                  purchases: 1,
              });
            }
            await saveData(existingData)
      }
      
      
      document.addEventListener('DOMContentLoaded', registerPageView);