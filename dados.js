// Defina o Channel ID e a Read API Key do canal ThingSpeak
const channelID = '2729417';
const apiKey = 'TX4DII61ERLE57S2';  // Coloque sua chave de leitura, se o canal for privado

// URL da API ThingSpeak
const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=1`;

// Função para buscar e exibir os dados
async function buscarDados() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Acessa os dados mais recentes
        const feed = data.feeds[0];
        const dadosDiv = document.getElementById('dados');
        
        // Converte o horário para o fuso horário de Brasília
        const dataUTC = new Date(feed.created_at); // Hora em UTC do ThingSpeak
        const opcoes = { 
            timeZone: 'America/Sao_Paulo', 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        const horarioBrasilia = new Intl.DateTimeFormat('pt-BR', opcoes).format(dataUTC);

        // Exibe os dados na página
        dadosDiv.innerHTML = `
            <p>Data e Hora: ${horarioBrasilia}</p>
            <p>Lixeira 1: ${feed.field1} cm livres</p>
            <!-- Adicione outros campos, se houver mais -->
        `;
    } catch (error) {
        console.error('Erro ao buscar dados do ThingSpeak:', error);
    }
}

// Chama a função ao carregar a página e a cada intervalo de 1 segundo
buscarDados();
setInterval(buscarDados, 1000);  // Atualiza a cada 1 segundo (1000 ms)
