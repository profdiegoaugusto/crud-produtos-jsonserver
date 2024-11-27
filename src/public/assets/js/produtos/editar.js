import { ProdutoService } from "../../../services/produto-service.js";

let produto = { };
const produtoService = new ProdutoService();

const URL_DADOS_CATEGORIAS_PRODUTOS = "../../../../data/categorias-produtos.json"

const idInput = document.querySelector("#id-input");
const nomeInput = document.querySelector("#nome-input");
const categoriaSelect = document.querySelector("#categoria-select");
const pesoKgInput = document.querySelector("#peso-input");
const precoInput = document.querySelector("#preco-input");
const precoMinInput = document.querySelector("#preco-min-input");
const garantiaMesesInput = document.querySelector("#garantia-input");
const descricaoTextarea = document.querySelector("#descricao-textarea");
const produtoDisponivelInput = document.querySelector('input[name="produto-disponivel"]:checked');

const atualizarBtn = document.querySelector("#atualizar-btn");


function salvar() {

    let produto = {
        id: idInput.value,
        nome: nomeInput.value.trim(),
        categoria: categoriaSelect.value,
        pesoKgs: +pesoKgInput.value,
        preco: +precoInput.value,
        precoMinimoVenda: +precoMinInput.value,
        garantiaMeses: +garantiaMesesInput.value,
        descricao: descricaoTextarea.value,
        estaDisponivel: produtoDisponivelInput.value,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
    }
    console.table(produto);
    produtoService.atualizarProduto(produto.id, produto);
    window.location.assign("index.html"); 
}


async function carregarDadosCategoria() {
    const resposta = await fetch(URL_DADOS_CATEGORIAS_PRODUTOS);
    return resposta.json();
}


async function preencherSelectCategorias() {

    let categoriasProdutos = await carregarDadosCategoria();
    let totalCategorias = categoriasProdutos.categorias.length;
    let categorias = categoriasProdutos.categorias;

    for (let i = 0; i < totalCategorias; i++) {
        const option = document.createElement("option");
        option.value = categorias[i];
        option.innerText = categorias[i];
        categoriaSelect.appendChild(option);  
    }

}


async function mostrarProduto() {

    let id = sessionStorage.getItem("id");
    produto = await produtoService.getProduto(id);

    idInput.value = id;
    nomeInput.value = produto.nome;
    categoriaSelect.value = produto.categoria;
    pesoKgInput.value = produto.pesoKgs;
    precoInput.value = produto.preco;
    precoMinInput.value = produto.precoMinimoVenda;
    garantiaMesesInput.value = produto.garantiaMeses;
    descricaoTextarea.value = produto.descricao;
    produtoDisponivelInput.value = produto.estaDisponivel;
}

window.addEventListener("load", () => {
    preencherSelectCategorias();
    mostrarProduto();
});

atualizarBtn.addEventListener("click", salvar);