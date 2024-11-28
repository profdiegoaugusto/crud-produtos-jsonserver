export class ProdutoService {

    constructor() {
      this.urlBase = "/produtos";
    }
  
    async getProdutos() {
      const resposta = await fetch(this.urlBase);
      return resposta.json();
    }
  
    async getProduto(id) {
      const resposta = await fetch(`${this.urlBase}/${id}`);
      return resposta.json();
    }
  
    async criarProduto(produto) {
      const resposta = await fetch(this.urlBase, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
      return resposta.json();
    }
  
    async atualizarProduto(id, produto) {
      const resposta = await fetch(`${this.urlBase}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
      return resposta.json();
    }
  
    async excluirProduto(id) {
      const resposta = await fetch(`${this.urlBase}/${id}`, {
        method: "DELETE",
      });
      return resposta.json();
    }
  }