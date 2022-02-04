//Capturando os elementos HTML para a interação
let elementomPai = document.getElementById('elementoPai');
let btnBuscaNaApi = document.getElementById('buscarNaApi');

//EndPoint que estamos buscando
const urlApi = "https://randomuser.me/api/?results=20";
//&gender=female

//Função executada ao clicar no botão
btnBuscaNaApi.addEventListener('click', function (event) {
    event.preventDefault();
    carregaDadosApi();
})


//Precisa ser assincrono, pois estamos requisitando dados de um servidor!
async function carregaDadosApi() {

    //Busca dados na API e armazena a resposta
    let respostaApi = await fetch(urlApi); //GET

    //Converte para json
    let respostaJson = await respostaApi.json();

    //Pega apenas os resultados
    let users = respostaJson.results; // A Api exige isso, as vzs vem como "data"

    //Percorrendo os dados: forEach
    users.forEach(user => {

        let novoElemento = document.createElement('div');

        //Informando as classes para o bootstrap (Para manter a responsividade)
        novoElemento.classList.add('col-lg-3');
        novoElemento.classList.add('col-md-6');

        //Criando novo elemento
        let conteudoNovoElemento = document.createTextNode(
            `<div>
            <img src="${user.picture.large}" alt="Avatar do usuário" class="bd-placeholder-img rounded-circle" width="140" height="140">
            <h2>${user.name.first}</h2>
            <div>${user.email}</div>
            <div>${user.location.city}/${user.location.state}</div>
            <div>${user.cell}</div>
            <br>
            <p><a class="btn btn-secondary" href="#">Ver perfil &raquo;</a></p>
        </div>`
        );

        novoElemento.innerHTML = conteudoNovoElemento.data;

        //Adiciona o elemento ao elemento pai
        elementomPai.appendChild(novoElemento);
    });

}