# Sebo Online S.A.

Essa documentação é destinada a desenvolvedores que desejam se integrar à API do Sebo Online S.A. Nela, é possível cadastrar usuários, livros e suas transações.

## Início

O trabalho e seus arquivos estão disponíveis no seguinte repositório do GitHub: [https://github.com/mcavalle/api-sebo-online](https://github.com/mcavalle/api-sebo-online)

Os demais arquivos necessários com informações sensíveis estão dentro da pasta compactada enviada. Nela, é possível baixar o arquivo .env, com os dados necessários para acesso ao banco.

Para iniciar o programa, no terminal deve ser utilizado o comando “npm start”. É preciso aparecer a mensagem de “Conectamos ao MongoDB”, informando que a conexão foi bem sucedida:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled.png)

## Autorização

Algumas rotas são privadas e exclusivas para o administrador. Para acessar essas rotas, será necessário realizar o login como usuário administrador e pegar o Token que é fornecido, conforme exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%201.png)

O tipo de autorização definido deverá ser “Bearer Token” e ter seu valor informado para ter acesso às rotas privadas:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%202.png)

## Endpoints

### Cadastrar usuários

É possível cadastrar um novo usuário no sistema utilizando o método POST HTTP, pela seguinte URL: http://localhost:3000/usuario/cadastro

No Body da requisição, as informações do usuário devem ser fornecidas, conforme o exemplo abaixo. 

{
      "name": "Jane Doe",
      "email": "[jane@sebo.com.br](mailto:jane@sebo.com.br)",
      "password": "SPFC2023",
      "confirmPassword": "SPFC2023",
      "active": true,
      "type": "administrador",
      "date": "2022-04-05",
      "area": "Teste"
}

As informações de nome, e-mail, senha e se o usuário está ativo ou não são obrigatórias para todos os usuários cadastrados. Já os campos de date (data de início) e area (área de especialização) só podem ser preenchidos por usuários do tipo “administrador”.

Se a solicitação for bem sucedida, será retornado o status 201 e uma mensagem de confirmação de cadastro:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%203.png)

### Login de usuário

O usuário pode realizar o seu login no sistema através do método POST HTTP, pela seguinte URL: http://localhost:3000/usuario/login

No Body da requisição, as informações de e-mail e senha devem ser fornecidas, conforme o exemplo abaixo.

{
"email": "jane@sebo.com.br",
"password": "SPFC2023"
}

Se o login for bem sucedido, será retornado o status 200 OK e uma mensagem de login realizado com sucesso:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%204.png)

Para o login, devem ser preenchidos um e-mail já cadastrado e uma senha válida.

### Alterar informações do usuário

É possível realizar alterações no usuário através do método PATCH HTTP, pela seguinte URL: http://localhost:3000/usuario/{ID}

Para esse método, precisamos fornecer o ID do usuário na URL, conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%205.png)

No Body, as informações do usuário devem ser fornecidas, alterando o campo desejado:

{
"name": "Jane Doe",
"email": "jane@sebo.com.br",
"password": "SPFC2023@CopadoBrasil",
"confirmPassword": "SPFC2023@CopadoBrasil",
"active": true,
"type": "administrador",
"date": "2022-04-05",
"area": "Teste"
}

Se a atualização for bem sucedida, será retornado um status 200 OK, com os dados atualizados

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%206.png)

### Excluir um usuário

Para essa API, os cadastros não podem ser totalmente excluídos do banco. Apenas é possível inativar os cadastros já existentes. Isso é possível através do método DELETE HTTP, pela seguinte URL: http://localhost:3000/usuario/{ID}

O ID do usuário a ser excluído deve ser informado na URL, conforme o exemplo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%207.png)

Se a requisição for bem sucedida, será retornado um status 200 OK e uma mensagem de sucesso:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%208.png)

### Logout

Para fazer o logout, basta acessar utilizar o método GET através da seguinte URL: http://localhost:3000/usuario/logout

Se a requisição for bem sucedida, será retornada um status 200 OK e o usuário será retornado à página inicial:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%209.png)

### Login de administrador

Usuários administradores podem fazer login por uma rota diferente, que irá retornar um token para acesso à rotas privadas. Para isso é preciso utilizar o método POST através da seguinte URL: http://localhost:3000/admin/login

No Body da requisição, as informações de e-mail e senha devem ser fornecidas, conforme o exemplo abaixo.

{
"email": "jane@sebo.com.br",
"password": "SPFC2023"
}

Se o login for bem sucedido, será retornado o status 200 OK e uma mensagem de login realizado com sucesso e o token:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2010.png)

### Listar usuários

É possível listar todos os usuários do sistema através do método GET, pela seguinte URL: http://localhost:3000/admin/usuarios

Essa é uma rota privada, portanto o token deve ser informado conforme o tópico “Autenticação”.

Se a requisição for bem sucedida, será retornado o status 200 OK e a lista dos usuários do sistema:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2011.png)

### Buscar usuário por ID

Para buscar um usuário em específico, a busca pode ser feita através do ID do usuário, fornecido na URL. Para isso, deve ser usado o método GET, pela seguinte URL: http://localhost:3000/admin/usuario/{ID}

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2012.png)

Essa é uma rota privada, portanto o token deve ser informado conforme o tópico “Autenticação”.

Se a requisição for bem sucedida, será retornado o status 200 OK e as informações do usuário em questão:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2013.png)

### Relatórios

É possível gerar um relatório das transações realizadas. Para isso, deve ser usado o método GET, pela seguinte URL: http://localhost:3000/admin/relatorios

Essa é uma rota privada, portanto o token deve ser informado conforme o tópico “Autenticação”.

### Logout administrador

Para fazer o logout, basta acessar utilizar o método GET através da seguinte URL: http://localhost:3000/admin/logout

Se a requisição for bem sucedida, será retornada um status 200 OK e o usuário será retornado à página inicial:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%209.png)

### Cadastrar categorias

É possível cadastrar uma nova categoria no sistema utilizando o método POST HTTP, pela seguinte URL: http://localhost:3000/categoria/cadastro

No Body da requisição, as informações da categoria devem ser fornecidas, conforme o exemplo abaixo. 

{
"name": "Fantasia",
"description": "Fantasia é um gênero da ficção em que se usa geralmente fenômenos sobrenaturais, mágicos e outros como um elemento primário do enredo, tema ou configuração.",
"active": true
}

Se a solicitação for bem sucedida, será retornado o status 201 e uma mensagem de confirmação de cadastro:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2014.png)

### Alterar informações da categoria

É possível realizar alterações no usuário através do método PATCH HTTP, pela seguinte URL: http://localhost:3000/categoria/{ID}

No final da URL, é preciso informar qual o ID da categoria a ser alterada, conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2015.png)

No Body, as informações da categoria devem ser fornecidas, alterando o campo desejado:

{
"name": "Suspense",
"description": "Suspense é um sentimento de incerteza ou ansiedade mediante as consequências de determinado fato, mais frequentemente referente à perceptividade da audiência em um trabalho dramático.",
"active": true
}

Se a solicitação for bem sucedida, será retornado o status 200 e o cadastro atualizado:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2016.png)

### Listar categorias

É possível listar todas as categorias pelo método GET HTTP, através da seguinte URL: http://localhost:3000/categoria

Se a solicitação for bem sucedida, será retornado status 200 e a listagem das categorias:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2017.png)

### Buscar categoria por ID

É possível buscar uma categoria específica pelo seu ID, utilizando o método GET HTTP, através da seguinte URL: http://localhost:3000/categoria/{ID}

Basta informar o ID da categoria conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2018.png)

Se a solicitação for bem sucedida, será retornado o status 200 e a categoria especificada:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2019.png)

### Delete de categoria

É possível fazer o soft delete de uma categoria específica pelo seu ID, utilizando o método DELETE HTTP, através da seguinte URL: http://localhost:3000/categoria/{ID}

Basta informar o ID da categoria conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2020.png)

Se a solicitação for bem sucedida, será retornado o status 200 e uma mensagem de sucesso:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2021.png)

### Cadastro de itens

É possível cadastrar uma novo item no sistema utilizando o método POST HTTP, pela seguinte URL: http://localhost:3000/item/cadastro

No Body da requisição, as informações do item devem ser fornecidas, conforme o exemplo abaixo. 

{
"title": "Sobre os Ossos dos Mortos",
"author": "Rick Riordan",
"type": "Livro",
"categoryId": "6539486625641d2aa2cb4d43",
"price": 40,
"description": "A aclamada autora mistura thriller e humor nesta reflexão sobre a condição humana e a natureza. Vencedora do prêmio Nobel de literatura",
"active": true,
"editionDate": "2019-10-30",
"sellerId": "65202d6277ca04e38bbf95e0"
}

Se a solicitação for bem sucedida, será retornado o status 201 e uma mensagem de confirmação de cadastro:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2022.png)

### Alterar item

É possível realizar alterações no usuário através do método PATCH HTTP, pela seguinte URL: http://localhost:3000/item/{ID}

No final da URL, é preciso informar qual o ID do item a ser alterado, conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2023.png)

No Body, as informações do item devem ser fornecidas, alterando o campo desejado:

{
"title": "Sobre os Ossos dos Mortos",
"author": "Olga Tokarczuk",
"type": "Livro",
"categoryId": "6539486625641d2aa2cb4d43",
"price": 40,
"description": "A aclamada autora mistura thriller e humor nesta reflexão sobre a condição humana e a natureza. Vencedora do prêmio Nobel de literatura",
"active": true,
"editionDate": "2019-10-30",
"sellerId": "65202d6277ca04e38bbf95e0"
}

Se a solicitação for bem sucedida, será retornado o status 200 e o cadastro atualizado:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2024.png)

### Listar itens

É possível listar todos os itens pelo método GET HTTP, através da seguinte URL: http://localhost:3000/item

Se a solicitação for bem sucedida, será retornado status 200 e a listagem dos itens:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2025.png)

### Buscar item por ID

É possível buscar um item específico pelo seu ID, utilizando o método GET HTTP, através da seguinte URL: http://localhost:3000/item/{ID}

Basta informar o ID da categoria conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2026.png)

Se a solicitação for bem sucedida, será retornado o status 200 e o item especificado:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2027.png)

### Delete de item

É possível fazer o soft delete de uma categoria específica pelo seu ID, utilizando o método DELETE HTTP, através da seguinte URL: http://localhost:3000/item/{ID}

Basta informar o ID do item conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2028.png)

Se a solicitação for bem sucedida, será retornado o status 200 e uma mensagem de sucesso:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2029.png)

### Cadastrar clientes

É possível cadastrar uma novo cliente no sistema utilizando o método POST HTTP, pela seguinte URL: http://localhost:3000/cliente/cadastro

No Body da requisição, as informações do cliente devem ser fornecidas, conforme o exemplo abaixo. 

{
"name": "Pam Beesly",
"email": "[pam@dundermifflin.com.br](mailto:pam@dundermifflin.com.br)",
"active": true
}

Se a solicitação for bem sucedida, será retornado o status 201 e uma mensagem de confirmação de cadastro:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2030.png)

### Alterar cliente

É possível realizar alterações no cliente através do método PATCH HTTP, pela seguinte URL: http://localhost:3000/cliente/{ID}

No final da URL, é preciso informar qual o ID do cliente a ser alterado, conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2031.png)

No Body, as informações da categoria devem ser fornecidas, alterando o campo desejado:

{
"name": "Pam B. Halpert",
"email": "pam@dundermifflin.com.br",
"active": true
}

Se a solicitação for bem sucedida, será retornado o status 200 e o cadastro atualizado:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2032.png)

### Listar clientes

É possível listar todos os clientes pelo método GET HTTP, através da seguinte URL: http://localhost:3000/cliente

Se a solicitação for bem sucedida, será retornado status 200 e a listagem dos clientes:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2033.png)

### Buscar cliente por ID

É possível buscar um cliente específico pelo seu ID, utilizando o método GET HTTP, através da seguinte URL: http://localhost:3000/cliente/{ID}

Basta informar o ID do cliente conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2034.png)

Se a solicitação for bem sucedida, será retornado o status 200 e o cliente especificado:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2035.png)

### Delete de cliente

É possível fazer o soft delete de um cliente específico pelo seu ID, utilizando o método DELETE HTTP, através da seguinte URL: http://localhost:3000/cliente/{ID}

Basta informar o ID do cliente conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2036.png)

Se a solicitação for bem sucedida, será retornado o status 200 e uma mensagem de sucesso:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2037.png)

### Cadastrar transação

É possível incluir transações no sistema utilizando o método POST HTTP, pela seguinte URL: http://localhost:3000/transacao/cadastro

No Body da requisição, as informações da transação devem ser fornecidas, conforme o exemplo abaixo. 

{
"clientId": "6539bf3fefa3c92bea2c248a",
"sellerId": "652030ee8a8ef4418cf980a9",
"itemId": "653af0033da4f622708f1b5f",
"price": 70,
"transactionDate": "2021-10-26"
}

Se a solicitação for bem sucedida, será retornado o status 201 e uma mensagem de confirmação de cadastro:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2038.png)

### Listar transações

É possível listar todas as transações feitas no sistema pelo método GET HTTP, através da seguinte URL: http://localhost:3000/transacao

Se a solicitação for bem sucedida, será retornado status 200 e a listagem das transações:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2039.png)

### Buscar transação por vendedor

É possível filtrar transações de um vendedor específico, utilizando o método GET HTTP, através da seguinte URL: http://localhost:3000/vendedor/{ID}

Basta informar o ID do vendedor conforme o exemplo abaixo:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2040.png)

Se a solicitação for bem sucedida, será retornado o status 200 e o cliente especificado:

![Untitled](Sebo%20Online%20S%20A%20ea975eb3fb8c4ee08f4f29388c1a5b59/Untitled%2041.png)

### Otimização de buscas

Para a otimização de buscas, utilizaria algoritmos de QuickSort para ordenar os dados de forma mais eficiente e Elasticsearch para realizar buscas mais eficiente

## Referências

Para o desenvolvimento do projeto, foram utilizadas as referências abaixo:

Crie uma API RESTful com Node.js e MongoDB | CRUD com Node, Express e Mongoose. Link para acesso: [https://www.youtube.com/watch?v=K5QaTfE5ylk](https://www.youtube.com/watch?v=K5QaTfE5ylk)

Autenticação com Node.js e MongoDB com JWT - Login e Registro com Node.js. Link para acesso: [https://www.youtube.com/watch?v=qEBoZ8lJR3k](https://www.youtube.com/watch?v=qEBoZ8lJR3k)

Build a REST API with Node JS and Express | CRUD API Tutorial. Link para acesso: [https://www.youtube.com/watch?v=l8WPWK9mS5M](https://www.youtube.com/watch?v=l8WPWK9mS5M)

Cookies HTTP em NodeJS. Link para acesso: [https://acervolima.com/cookies-http-em-node-js/](https://acervolima.com/cookies-http-em-node-js/)

Cookie. Link para acesso: [https://www.npmjs.com/package/cookie](https://www.npmjs.com/package/cookie)

QuickSort Algorithm in JavaScript. Link para acesso: [https://www.guru99.com/quicksort-in-javascript.html](https://www.guru99.com/quicksort-in-javascript.html)

Elasticsearch. Link para acesso: [https://www.elastic.co/guide/en/cloud/current/ec-getting-started-node-js.html](https://www.elastic.co/guide/en/cloud/current/ec-getting-started-node-js.html)