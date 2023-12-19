# Desafio Técnico - Devio-BackEnd

### Deploy
##

<a href="https://devio-front-end-ochre.vercel.app/">Deploy FrontEnd!</a>

<a href="https://www.youtube.com/watch?v=U4NBCmdfA6E">Video Demo FrontEnd!</a>


<a href="https://fastfooddevioapi.onrender.com">Deploy BackEnd!</a>

<a href="https://www.youtube.com/watch?v=S-5DNV5WMIU">Video Demo BackEnd!</a>

##

###### o server pode estar em stand by dependendo do horario

## Descrição 👾
Um restaurante precisa poder registrar suas vendas de forma fácil e rápida, este trabalha com preparo de comidas rápidas e o método atual por comanda deixa o processo como um todo mais lento. O restaurante gostaria de ter um ambiente intuitivo listando os produtos mais vendidos e possibilitando a fácil inserção desses no checkout, ele também gostaria de um visual simples, porém moderno.

## Imagens
##

<img src="./src/assets/images/README/Captura de tela 2023-12-19 135325.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135339.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135419.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135653.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135710.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135732.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135754.png"/>
<img src="./src/assets/images/README/Captura de tela 2023-12-19 135808.png"/>

## 
### Histórias de Usuário 🧑‍🍳
- O usuário poderá ver uma pequena quantidade de produtos na tela para seleção rápida.
- O usuário terá a opção de digitar o nome ou código para encontrar o produto.
- O usuário irá poder adicionar/remover itens e acompanhar o resumo do pedido.
- O usuário poderá ver o total e o troco.
- Deverá poder incluir o nome do cliente para ser entregue o pedido.
- Ao finalizar o pedido este deverá ser impresso em uma via para o cliente (impressora térmica), liberando a tela para o próximo pedido.
  - Obs: A solução é muito mais simples do que se parece.
- O pedido deverá aparecer para a cozinha junto ao nome do cliente.
- A cozinha poderá dar baixa nos pedidos concluídos.

### Histórias Bônus (opcionais) 💘
- Os pedidos devem aparecer para a cozinha em tempo real.
  - Obs: Utilização de Long Pooling ou WebSockets facilitam a solução.
- O usuário poderá incluir uma observação a cozinha.
- O usuário poderá atribuir múltiplas formas de pagamento na finalização do pedido.
- Os pedidos baixados devem aparecer em uma tela com o nome do cliente, apitando para ser feito a retirada.

### Observações 👀
- Não há a necessidade de fazer telas de cadastro, os registros poderão ser vir de uma base fixa.
- Os itens bônus não são obrigatórios, porém se feitos serão bastante relevantes e mostraram o empenho do candidato junto a vaga/empresa.
- Será levado em consideração conceitos diversos, porém o mínimo que se espera aplicação de conceitos de qualidade e manutenção de código.
- Use a criatividade, não tenha medo, isso será um fator crucial na análise.


## Tecnologias e bibliotecas

- React + TypeScript
- Vite
- Styled Components
- Axios
- Eslint

## Como rodar

1. Rode o comando `git clone https://github.com/CaioNeme/Devio-FrontEnd.git`
2. Rode o comando `cd cd Devio-FrontEnd`
3. Rode o comando `npm i`
4. Configure o aquivo `.env` se baseando no arquivo `.env.example`
5. Rode o comando `npm run dev`