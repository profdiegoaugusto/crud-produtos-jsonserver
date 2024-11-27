import { ProdutoService } from "../../../services/produto-service.js";

const produtoService = new ProdutoService();

const ul = document.querySelector("#info-produto");


async function criarListaDetalhes() {

    let id = sessionStorage.getItem("id");
    let produto = await produtoService.getProduto(id);

    let rotulos = ["ID", "Nome", "Categoria", "Peso (Kgs)", "Preço", "Preço Mínimo Venda", "Garantia", "Descricao", "Está Disponivel"];
    let valores = Object.values(produto);

    for (let i = 0; i < rotulos.length; i++) {
        const li = document.createElement("li");
        const strong = document.createElement("strong");
        strong.innerText = rotulos[i] + ": "; // Adiciona um espaço e dois-pontos após o rótulo
        li.appendChild(strong);
        li.appendChild(document.createTextNode(valores[i])); // Adiciona o valor como um nó de texto
        ul.appendChild(li);
    }
}


window.addEventListener("load", criarListaDetalhes);