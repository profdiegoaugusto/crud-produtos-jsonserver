// Função para formatar a data para o padrão local brasileiro
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Função para formatar a hora para o padrão local brasileiro
function formatarHora(data) {
    return new Date(data).toLocaleTimeString('pt-BR');
}

// Função para formatar valores financeiros no padrão brasileiro (Real)
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Exporta as funções para uso em outros módulos
export { formatarData, formatarHora, formatarMoeda };