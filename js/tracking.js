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
  
  // Função para salvar os dados de volta no JSON (agora cria um arquivo temporário)
  async function saveData(data) {
    try {
      const response = await fetch('data-temp.json', { // Cria um arquivo temporário
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("saveData: falha ao criar arquivo temporário - ", response.status, response.statusText);
        return;
      }
  
      console.log("saveData: sucesso ao criar arquivo temporário - ", data);
        await replaceDataJson();
    }
    catch (error) {
      console.error("saveData: falha ao criar arquivo temporário:", error);
    }
  
  }
  async function replaceDataJson()
  {
      try {
        // Pega os dados do arquivo temporário
          const tempResponse = await fetch('data-temp.json');
        if (!tempResponse.ok) {
            console.log('Falha ao pegar arquivo temp - ', tempResponse.status, tempResponse.statusText)
             return;
        }
        const tempData = await tempResponse.json();
        console.log('Arquivo temporário lido com sucesso: ', tempData);
  
          // Cria o arquivo data.json com os dados do arquivo temporário
        const dataResponse = await fetch('data.json',{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempData)
            })
          if (!dataResponse.ok) {
               console.log('Falha ao atualizar data.json - ', dataResponse.status, dataResponse.statusText)
              return;
          }
         console.log('Arquivo data.json atualizado com sucesso: ', tempData)
  
  
      } catch (error)
        {
            console.error('Erro ao atualizar o data.json - ', error)
        }
  }
  
  // Função para registrar pageview
  async function registerPageView() {
    console.log("registerPageView: PageView function called");
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
    console.log("registerClickCTA: ClickCTA function called");
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
    console.log("registerPurchase: Purchase function called");
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