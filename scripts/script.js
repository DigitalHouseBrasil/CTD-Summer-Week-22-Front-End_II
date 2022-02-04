/* Capturando os INPUTS do formulário */
let inputNome = document.getElementById('nome');
let inputDescricao = document.getElementById('descricao');
let inputLinkSite = document.getElementById('linkSite');
let inputModalidadePagamento = document.getElementById('modalidadePagamento');
let inputValorPago = document.getElementById('valorPago');

/* Capturando o Botão e a lista de serviços */
let btnSalvaServico = document.getElementById('salvaServico');
let listaServicos = document.querySelector('.lista-servicos'); // UL

let formulario = document.getElementById('formulario');
let contadorServicos = document.getElementById('contador-servicos');
let valorTotalHtml = document.getElementById('valorTotalHtml');

let contador = 0;
let identificadorServico = 1;
let valorAPagarTotal = 0;

let totalRegistros = localStorage.length;

/* Função responsável por criar os 'cards' com os serviços */
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
                <small class="text-muted">${capturaDataPagamento()}</small>
              </div>

              <div>
                <small class="id-servico text-muted">ID#${identificadorServico}</small>
                <br>
                <span class="valor-pago text-muted">R$${inputValorPago.value}</span>
                <br>
                <a href="#" class="remover card-link">Remover</a>
              </div>

            </li>`
  );

  // Atribuindo o conteúdo ao elemento criado
  criaElementoLi.innerHTML = criaConteudoLi.data;

  //Adicionando o novo elemento criado a lista principal (UL)
  listaServicos.appendChild(criaElementoLi);

  contador++;

  //Salvando as informações no localStorage
  setLocalStorage(identificadorServico, criaElementoLi.innerHTML);

  ++identificadorServico;
}

/* Função que renderiza/exibe os serviços presentes no localStorage
- É executada automaticamente ao carregar a página HTML */
function exibeServicosLocais() {

  //SpreadOperator para pegar apenas os registros essênciais
  const servicosCapturados = { ...localStorage }

  //Percorre os valores presentes no objeto
  for (var s in servicosCapturados) {

    //Cria elemento LI
    let criaElementoLi = document.createElement('li');

    let criaConteudoLi = document.createTextNode(servicosCapturados[s]);

    //Associa o conteúdo ao elemento
    criaElementoLi.innerHTML = criaConteudoLi.data; //Já está no formato que precisamos

    //Adiciona ao elemento pai
    listaServicos.appendChild(criaElementoLi);

    //### Exibindo automaticamente o contador de acordo com o LocalStorage

    //Atualiza os dados do contador-geral
    contador = totalRegistros;

    // Atribui o valor do contador ao HTML 
    contadorServicos.innerText = contador;


    //Capturo o valor em formato de texto desse elemento 
    let valorComCifrao = criaElementoLi.querySelector('.valor-pago').innerText;

    //SLICE
    let valorServico = valorComCifrao.slice(2); //Remove o R$ e deixa apenas o valor

    // Atribui a variável global o valor decrementado convertido  
    valorAPagarTotal += parseFloat(valorServico);

    // Modificando o valor do texto no HTML 
    valorTotalHtml.innerText = "R$" + valorAPagarTotal.toString();

  }
}

// Executa a função ao clicar no botão de salvar serviço
btnSalvaServico.addEventListener('click', function () {

  let formularioValido;

  /* Validação que garante que todos os campos do formulário estejam válidos, antes de prosseguir a execução */
  if (formulario.checkValidity() === false) {
    formularioValido = false;
  } else {
    formularioValido = true;
  }

  //Se o formulário for válido
  if (formularioValido) {

    //Chama a função que cria o card de serviços
    criaCardServico();

    //Atualiza o contador de serviços
    contadorServicos.innerText = contador;

    //Atualiza o valor total a pagar
    valorAPagarTotal += parseFloat(inputValorPago.value);
    valorTotalHtml.innerText = "R$" + valorAPagarTotal.toString();

    limpaCamposFormulario();
  }

})


/* Função que retorna a data informado no Input. Apresenta a formatação no padrão BRA assim como o fuso horario correto */
function capturaDataPagamento() {
  let dataPagamento = document.getElementById('dataPagamento').valueAsDate;
  dataPagamento = dataPagamento.toLocaleDateString("pt-BR", { timeZone: 'UTC' });
  return dataPagamento;
}

function limpaCamposFormulario() {
  inputNome.value = '';
  inputDescricao.value = '';
  inputLinkSite.value = ''
  inputModalidadePagamento.value = '';
  inputValorPago.value = '';

  /* Maneira de resetar o campo de data */
  let dateControl = document.querySelector('input[type="date"]');
  dateControl.value = '';
}

/* REMOÇÃO de registros na página */
listaServicos.addEventListener('click', evento => {

  evento.preventDefault();

  //Captura o elemento que será removido <li> principal
  let servico = evento.target.parentNode.parentNode;

  //Interação com o usuário
  let removeServico = confirm("Você realmente deseja remover esse serviço?");

  //Caso verdadeiro
  if (removeServico) {

    //Remove do elemento pai <ul> o elemento <li> selecionado
    servico.parentNode.parentNode.removeChild(servico.parentNode);

    //Decrementa o contador de serviços
    contador--;
    contadorServicos.innerText = contador;

    //Subtrai os valores dos serviços que foram removidos
    let valorComCifrao = servico.querySelector('.valor-pago').innerText;
    let valorServico = valorComCifrao.slice(2);
    valorAPagarTotal -= parseFloat(valorServico);
    valorTotalHtml.innerText = "R$" + valorAPagarTotal.toString();

    // ### Remove o registro do localStorage
    //Captura o identificador do serviço
    let idServicoRemovido = servico.querySelector('.id-servico').innerText;

    //SLICE
    let idServico = idServicoRemovido.slice(3); //Remove o ID# e deixa apenas o ID(número)

    //Remove do localStorage
    removeLocalStorage(idServico);
  }

})

// ### Funções utilizadas para o localStorage
function setLocalStorage(chave, valor) {
  localStorage.setItem(chave, valor);
}

function removeLocalStorage(chave) {
  localStorage.removeItem(chave);
}






