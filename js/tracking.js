async function updateStats(type, variant) {
    try {
        const response = await fetch('/admin/update-stats.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,  // 'visit' ou 'click'
                variant: variant // 'A' ou 'B'
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error);
    }
}

// Adicione isso no botão de cada página de teste
document.addEventListener('DOMContentLoaded', function() {
    // Registra visita
    updateStats('visit', 'A'); // ou 'B' para a página B
    
    // Registra click no botão
    const button = document.querySelector('#mainButton'); // ou o ID do seu botão
    if (button) {
        button.addEventListener('click', () => {
            updateStats('click', 'A'); // ou 'B' para a página B
        });
    }
});