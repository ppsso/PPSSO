// Definição dos recintos
const recintos = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, espacoLivre: 7, animais: ['macaco', 'macaco', 'macaco'] },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, espacoLivre: 5, animais: [] },
    { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, espacoLivre: 5, animais: ['gazela'] },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, espacoLivre: 8, animais: [] },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, espacoLivre: 6, animais: ['leão'] }
];

// Definição dos animais
const animais = {
    'LEAO': { tamanho: 3, biomas: ['savana'] },
    'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
    'CROCODILO': { tamanho: 3, biomas: ['rio'] },
    'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
    'GAZELA': { tamanho: 2, biomas: ['savana'] },
    'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
};

// Função para verificar se o animal é válido
function animalValido(tipo) {
    return animais.hasOwnProperty(tipo);
}

// Função para encontrar recintos viáveis
function encontrarRecintos(tipo, quantidade) {
    if (!animalValido(tipo)) {
        return "Animal inválido";
    }
    if (quantidade <= 0) {
        return "Quantidade inválida";
    }

    const animal = animais[tipo];
    const recintosViaveis = recintos.filter(recinto => {
        // Verifica se o bioma é adequado
        if (!animal.biomas.includes(recinto.bioma) && !(animal.biomas.includes('savana') && recinto.bioma === 'savana e rio')) {
            return false;
        }
        // Verifica se há espaço suficiente
        const espacoNecessario = quantidade * animal.tamanho + (recinto.animais.length > 0 ? 1 : 0);
        if (recinto.espacoLivre < espacoNecessario) {
            return false;
        }
        // Verifica se os animais já presentes no recinto são compatíveis
        if (recinto.animais.length > 0) {
            const primeiroAnimal = recinto.animais[0].toUpperCase();
            if (animais[primeiroAnimal].biomas.includes('savana') && tipo !== primeiroAnimal && tipo !== 'HIPOPOTAMO') {
                return false;
            }
            if (tipo === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                return false;
            }
        }
        return true;
    });

    if (recintosViaveis.length === 0) {
        return "Não há recinto viável";
    }

    return recintosViaveis.map(recinto => {
        const espacoLivre = recinto.espacoLivre - quantidade * animal.tamanho - (recinto.animais.length > 0 ? 1 : 0);
        return `Recinto nro ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
    });
}

// Exemplo de uso
const tipoAnimal = 'MACACO';
const quantidadeAnimal = 2;
console.log(encontrarRecintos(tipoAnimal, quantidadeAnimal));
