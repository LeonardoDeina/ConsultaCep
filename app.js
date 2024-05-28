/*function jsPadrao() {
    let xhr = new XMLHttpRequest();
    // define the request
    xhr.open('GET', 'https://viacep.com.br/ws/01001000/json/');

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        const DONE = 4; // readyState 4 means the request is done.
        const OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log(xhr.responseText); // 'This is the output.'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
    xhr.send();
}

/**
 * para testar essa função usar descomentar essa linha no html
 *     <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>    
 
function jqueryGet() {
    $.get('https://viacep.com.br/ws/01001000/json/', (data) => {
        console.log(data)
    })
}
*/

let enderecos = []

function cadastrarEndereco() {
    let id = 0;

    if (!localStorage.getItem('enderecos'))
        id = 0;
    else
        id = JSON.parse(localStorage.getItem('enderecos')).length;

        const infCEP = document.getElementById('cep').value;
        const infLogradouro = document.getElementById('logradouro').value;
        const infNmr = document.getElementById('nmr').value;
        const infComp = document.getElementById('comp').value;
        const infBairro = document.getElementById('bairro').value;
        const infCidade = document.getElementById('cidade').value;
        const infUF = document.getElementById('UF').value;

        let endereco = {
            Id: id,
            Cep: infCEP,
            Logradouro: infLogradouro,
            Numero: infNmr,
            Complemento: infComp,
            Bairro: infBairro,
            Cidade: infCidade,
            UF: infUF,
        }

        try {

            let enderecosLocalStorage = JSON.parse(localStorage.getItem('enderecos')) || [];
    
            enderecosLocalStorage.push(endereco);
    
            localStorage.setItem('enderecos', JSON.stringify(enderecosLocalStorage));
    
            alert('Endereço cadastrado com sucesso.');

            montaTabela();
    
        } catch {
            alert("Algo deu errado ao adicionar o endereço.");
        }

        limpaCampos()
}

function consultaCep() {
   const cep = document.querySelector('#cep').value 
   const retorno = document.querySelector('#retorno')
   const logradourof = document.querySelector('#logradouro')
   const bairrof = document.querySelector('#bairro') 
   const cidadef = document.querySelector('#cidade')
   const uff = document.querySelector('#UF')
   fetch(`https://viacep.com.br/ws/${cep}/json/`)
   .then(resposta => resposta.json())
//    .then(json => console.log(json))
   .then(json => {
    logradourof.value = json.logradouro
    bairrof.value = json.bairro 
    cidadef.value = json.localidade
    uff.value = json.uf
   })
   .catch(error => console.log(error))
}

function abreForm(){
    form = document.getElementById("Form");
    form.setAttribute('open','open')
}

function abreLista(){
    lista = document.getElementById("List");
    lista.setAttribute('open', 'open')
}

function fechaForm(){
    form = document.getElementById("Form");
    form.close()
}
function fechaLista(){
    lista = document.getElementById("List");
    lista.close()
}

function limpaCampos() {
    document.getElementById('Form_Cad').reset();
}

function recuperaLocalStorage() {
    let dados = JSON.parse(localStorage.getItem("enderecos"));
    return dados;
}

function montaTabela() {
    let dados = recuperaLocalStorage();
    let tabela = document.querySelector('#table tbody');
    let contador = 0
    for (contador = 0; contador < dados.length; contador++) {
        let item = tabela.insertRow();
        item.id = "endereco" + dados[contador].id;

        item.innerHTML =
            "<td id='" + "campoCEP" + contador + "'>" + dados[contador].Cep + "</td>"
            + "<td id='" + "campoLogradouro" + contador + "'>" + dados[contador].Logradouro + "</td>"
            + "<td id='" + "campoNmr" + contador + "'>" + dados[contador].Numero + "</td>"
            + "<td id='" + "campoComplemento" + contador + "'>" + dados[contador].Complemento + "</td>"
            + "<td id='" + "campoBairro" + contador + "'>" + dados[contador].Bairro + "</td>"
            + "<td id='" + "campoCidade" + contador + "'>" + dados[contador].Cidade + "</td>"
            + "<td id='" + "campoUF" + contador + "'>" + dados[contador].UF + "</td>"
    }  
}      
window.onload = function () { montaTabela(); }