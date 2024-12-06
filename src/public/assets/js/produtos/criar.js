import { ProdutoService } from "../../../services/produto-service.js";

const produtoService = new ProdutoService();

const URL_DADOS_CATEGORIAS_PRODUTOS = "../../data/categorias-produtos.json"

const idInput = document.querySelector("#id-input");
const nomeInput = document.querySelector("#nome-input");
const categoriaSelect = document.querySelector("#categoria-select");
const pesoKgInput = document.querySelector("#peso-input");
const precoInput = document.querySelector("#preco-input");
const precoMinInput = document.querySelector("#preco-min-input");
const garantiaMesesInput = document.querySelector("#garantia-input");
const descricaoTextarea = document.querySelector("#descricao-textarea");
const produtoDisponivelInput = document.querySelector('input[name="produto-disponivel"]:checked');

const salvarBtn = document.querySelector("#salvar-btn");


function salvar() {

    let produto = {
        id: null,
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
    produtoService.criarProduto(produto);
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


window.addEventListener("load", preencherSelectCategorias);
salvarBtn.addEventListener("click", salvar);