<h2 align="center">🍕 Projeto Pizza na Brasa 🍕</h2>

[🔗Deploy](#link-deploy) | [🛠️Tecnologias](#tecnologias-utilizadas)

Esse é um case de teste da Shopper.com.br
criado para avaliar meus conhecimentos sobre desenvolvimento de software. 
A proposta é criar um formulário simples de cadastro de pedidos de supermercado.
Junto desse documento recebi um arquivo products.csv , que é uma lista com produtos 
disponíveis e seus respectivos preços e estoque com as seguintes definições:
- id = id do produto
- name = nome do produto
- price = preço do produto em reais. 
- qty_stock = quantidade em estoque
## 📋 Funcionalidades
### Abaixo estão os requisitos que o sistema deve atender:
1- O sistema deve ter um formulário de cadastro de pedidos

2- O usuário deve entrar com Nome do Cliente, Data de Entrega e uma lista de compras 

3- A lista de compras é composta por um ou mais produtos e a quantidade solicitada para 
cada um deles.

4- O usuário pode alterar a quantidade de itens já cadastrados ou excluir um item que ele 
não queira mais. 

5- A cada alteração na lista de compras o sistema deve calcular o valor total do pedido.

6- Todas essas informações devem ser salvas em um banco de dados que você vai modelar.

7- Cada pedido salvo deve debitar a quantidade do produto correspondente de seu estoque.

8- O sistema deve alertar o usuário caso a quantidade solicitada não esteja disponível no 
estoque.

9- O sistema também deve ter uma função para mostrar o estoque atual exibindo: Nome do 
produto e a quantidade em estoque.

No front-end o cliente cria um pequeno cadastro com o nome e data de entrega, onde é gerado um id que é salvo no local storage.
- Após o cadastro ele é direcionado para página de compras onde pode adicionar o produto que deseja quantas vezes quiser, dependendo da quantidade em estoque.
É possível visualizar os produtos adicionados ao carrinho com os preços de total da compra, também excluir algum produto em que adicionou demais ou erradamente. O aplicativo pode ser acessado pelo link:
http://ec2-44-210-91-174.compute-1.amazonaws.com:3000

- No back-end foram criados endpoints para as requisições onde são ligados ao banco de dados mysql, onde são salvos os dado do cliente. Os endpoints podem ser acessados pelo link da API:
https://documenter.getpostman.com/view/21554008/2s84Dst1nj

## 🛠Tecnologias Utilizadas
<div style="display: inline_block">  
  <img aline="center" width="100px" height="45px" alt="API REST" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJoxiAXVIxedd5WnxL3yepJpACK2lmCSl9w&usqp=CAU" />  
  <img aline="center" width="100px" height="45px" alt="TYPESCRIPT" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img aline="center" width="100px" height="45px" alt="NODE.JS" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img aline="center" width="100px" height="45px" alt="EXPRESS.JS" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />  
  <img aline="center" width="100px" height="45px" alt="MYSQL" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" />
</div>

## 🔗Link Deploy
- https://pizza-na-brasa.vercel.app/

## ✒️ Autor

## INTEGRANTE
Perfil      | Link do perfil no GITHUB
--------- | ------
[<img src="https://avatars.githubusercontent.com/KlebsonBicalhodeSousa" width="75px;"/>](https://github.com/KlebsonBicalhodeSousa) | [KlebsonBicalhodeSousa](https://github.com/KlebsonBicalhodeSousa)
