# Tutorial de Instalação do Sistema de Gestão de Estoque

Este tutorial orienta na configuração inicial de um sistema simples utilizando Node.js e Json Server.


## 1. Instalação

### 1.1 Criar Diretório do Projeto
Crie um diretório para sua aplicação. No prompt, execute os comandos abaixo:

```bash
mkdir sistema-gestao-estoque
cd sistema-gestao-estoque
```

### 1.2 Verificar Node.js
Verifique se o Node.js está instalado na sua máquina:

```bash
node -v
```

### 1.3 Inicializar o Projeto
Use o comando `npm init` para criar o arquivo **package.json** da aplicação:

```bash
npm init -y
```

💡 **Nota:** A flag `-y` cria o arquivo `package.json` com valores padrão, sem perguntas interativas.

### 1.4 Instalar Json Server
Dentro do diretório do projeto, instale o Json Server:

```bash
npm install json-server@0.17.4
```

> **Dica:** Instale uma versão estável para evitar erros.

### 1.5 Configurar Servidor
Crie o arquivo `index.js` na raiz do projeto e insira o código abaixo:

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
```

> Código baseado na [documentação oficial do Json Server](https://github.com/typicode/json-server/tree/v0).

### 1.6 Configurar Script de Inicialização
No arquivo `package.json`, adicione um script `start` na seção `scripts`:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```


## 2. Criar Base de Dados

### 2.1 Criar Arquivo `db.json`
Adicione dados iniciais no arquivo `db.json`:

```json
{
  "produtos": [
    {
      "id": 1,
      "nome": "Smartphone X",
      "categoria": "Eletrônicos",
      "pesoKgs": 0.18,
      "preco": 1200.0,
      "precoMinimoVenda": 1100.0,
      "garantiaMeses": 24,
      "descricao": "Smartphone de última geração com tela de 6.5 polegadas.",
      "estaDisponivel": true,
      "criadoEm": "2023-06-01T10:00:00",
      "atualizadoEm": "2024-06-01T10:00:00"
    }
    // Outros produtos...
  ]
}
```

### 2.2 Configurar Diretório para Categorias
Crie o diretório `data` na pasta `public`, com o arquivo `categorias-produtos.json`.

## 3. Rodar o Servidor

Para executar a aplicação use `json-server data/db.json` ou inicie o servidor com o comando:

```bash
npm start
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

---
Pronto! Agora você pode começar a explorar e personalizar o sistema de gestão de estoque.
