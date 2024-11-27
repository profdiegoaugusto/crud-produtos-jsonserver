import { ProdutoService } from "../../../services/produto-service.js";
import { formatarMoeda } from "../../../utils/formatador.js";

let totalProdutos = 0;

const produtoService = new ProdutoService();

function excluir(event) {

    let id = obterIdLinhaTabela(event);

    let confirmacao = confirm("Deseja excluir o produto?");

    if (confirmacao) {
        produtoService.excluirProduto(id);
    }

}

function preencherTabela(produtos) {

    const tbody = document.querySelector("tbody");

    for (let i = 0; i < totalProdutos; i++) {

        const tr = document.createElement("tr");

        const celulas = [
            produtos[i].id,
            produtos[i].nome,
            produtos[i].categoria,
            formatarMoeda(produtos[i].preco)
        ]

        for (let j = 0; j < celulas.length; j++) {

            const td = document.createElement("td");
            td.innerText = celulas[j];
            tr.appendChild(td);
        }

        const celulaOpcoes = document.createElement("td");
        criarOpcoes(celulaOpcoes);
        tr.appendChild(celulaOpcoes);
        tbody.appendChild(tr);
    }
    
}

function obterIdLinhaTabela(event) {
    let tr = event.target.parentNode.parentNode;
    return tr.firstChild.innerText;
}

function criarOpcoes(td) {

    const linkAbrir = document.createElement("a");
    linkAbrir.innerText = "Abrir";
    linkAbrir.href = "visualizar.html";
    linkAbrir.addEventListener("click", (event) => {
        let id = obterIdLinhaTabela(event);
        sessionStorage.setItem("id", id);
    });
    td.appendChild(linkAbrir);

    const linkEditar = document.createElement("a");
    linkEditar.innerText = "Editar";
    linkEditar.href = "editar.html";
    linkEditar.addEventListener("click", (event) => {
        let id = obterIdLinhaTabela(event);
        sessionStorage.setItem("id", id);
    });
    td.appendChild(linkEditar);

    const linkExcluir = document.createElement("a");
    linkExcluir.innerText = "Excluir";
    linkExcluir.href = "#";
    linkExcluir.addEventListener("click", excluir);
    td.appendChild(linkExcluir);
    
}

async function carregarDados() {
    const produtos = await produtoService.getProdutos();
    totalProdutos = produtos.length;
    preencherTabela(produtos);   
}



window.addEventListener("load", () => {
    carregarDados();
});