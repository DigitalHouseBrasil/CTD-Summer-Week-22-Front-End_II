/* Capturando os INPUTS do formulário */
let inputNome = document.getElementById('nome');
let inputDescricao = document.getElementById('descricao');
let inputLinkSite = document.getElementById('linkSite');
let inputModalidadePagamento = document.getElementById('modalidadePagamento');
let inputValorPago = document.getElementById('valorPago');

/* Capturando o Botão e a lista de serviços */
let btnSalvaServico = document.getElementById('salvaServico');
let listaServicos = document.querySelector('.lista-servicos');

function criaCardServico() {

  //Criando o novo elemento do tipo LI -> item da lista
  let criaElementoLi = document.createElement('li');

  //Criando conteúdo do LI
  let criaConteudoLi = document.createTextNode(

    `<li class="list-group-item d-flex justify-content-between lh-sm">

              <div>
                <h6 class="my-0">${inputNome.value}</h6>
                <small class="text-muted">${inputModalidadePagamento.value}</small>
                <br>
                <small class="text-muted">30/01/2022</small>
              </div>

              <div>
                <small class="text-muted">ID#01</small>
                <br>
                <span class="text-muted">R$${inputValorPago.value}</span>
                <br>
                <a href="#" class="remover card-link">Remover</a>
              </div>

            </li>`
  );

  // Atribuindo o conteúdo ao elemento criado
  criaElementoLi.innerHTML = criaConteudoLi.data;

  //Adicionando o novo elemento criado a lista principal (UL)
  listaServicos.appendChild(criaElementoLi);
}

// Executa a função ao clicar no botão de salvar serviço
btnSalvaServico.addEventListener('click', function () {

  //Chama a função que cria o card
  criaCardServico();

})


