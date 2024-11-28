import { ProdutoService } from "../../../services/produto-service.js";
import { formatarMoeda } from "../../../utils/formatador.js";

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
const produtoDisponivelInput = document.querySelector('input[name="produto-disponivel"]');

const atualizarBtn = document.querySelector("#atualizar-btn");


function salvar() {
    
    let produtoAtualizado = {
        id: idInput.value,
        nome: nomeInput.value.trim(),
        categoria: categoriaSelect.value,
        pesoKgs: +pesoKgInput.value,
        preco: +precoInput.value,
        precoMinimoVenda: +precoMinInput.value,
        garantiaMeses: +garantiaMesesInput.value,
        descricao: descricaoTextarea.value,
        estaDisponivel: JSON.parse(obterValorRadio()),
        criadoEm: produto.criadoEm,
        atualizadoEm: new Date().toISOString()
    }

    produtoService.atualizarProduto(produtoAtualizado.id, produtoAtualizado);
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
    precoInput.value = formatarMoeda(produto.preco);
    precoMinInput.value = formatarMoeda(produto.precoMinimoVenda);
    garantiaMesesInput.value = produto.garantiaMeses;
    descricaoTextarea.value = produto.descricao;
    produtoDisponivelInput.value = produto.estaDisponivel;
}


function obterValorRadio() {
    const radioSelecionado = document.querySelector('input[name="produto-disponivel"]:checked');
    if (radioSelecionado) {
        return radioSelecionado.value.toString(); // Retorna "true" ou "false", dependendo do valor marcado
    }
    return null; // Caso nenhum esteja marcado (situação incomum para rádios)
}

window.addEventListener("load", () => {
    preencherSelectCategorias();
    mostrarProduto();
});

atualizarBtn.addEventListener("click", salvar);


