const URL_BASE = '/produtos'; 

async function carregarDados() {

    try {
        const resposta = await fetch(URL_BASE);

        if (!resposta.ok)
            throw new Error("Não foi possível carregar os dados!");

        const dados = await resposta.json();
        console.table(dados);
        

    } catch (erro) {
        console.error(erro);
    }
}

window.addEventListener("load", carregarDados);