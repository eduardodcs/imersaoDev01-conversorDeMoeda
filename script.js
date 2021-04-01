
var dataRetorno = new Date()
var mes = parseInt(dataRetorno.getMonth()) + 1
var dataURL = mes + "-" + dataRetorno.getDate() + "-" + dataRetorno.getFullYear()
var dataExibir = dataRetorno.getDate() + "/" + mes + "/" + dataRetorno.getFullYear()

var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" + dataURL + "'&$format=json";

let request = new XMLHttpRequest();
request.open('GET', url, true);

var valores

request.onload = function() {
    if (request.readyState == 4 && request.status == 200) {
        var resposta = JSON.parse(request.responseText);
        console.log(resposta)
        valores = resposta.value[0];

        var html = "<p id='valor-cotacao'>Cotação Atual: R$ " + valores.cotacaoCompra + "</p>"
        var htmlCotacao = document.getElementById("valor-cotacao")
        htmlCotacao.innerHTML = html

        var htmlData = '<p id="data-atual">Dia: ' + dataExibir + '</p>'
        var htmlNewData = document.getElementById("data-atual")
        htmlNewData.innerHTML = htmlData


        document.getElementById('btnConverter').disabled = false
    }
};
request.onerror = function() {
    console.log("Erro:"+request);
};
request.send();

function converter(){
    var valorEmDolar = document.getElementById("valor-dolar").value
    if (valorEmDolar != ""){
        valorEmDolar = trocarVirguladoPorPonto(valorEmDolar)
        var valorEmReal = parseFloat(valorEmDolar * valores.cotacaoCompra)
        valorEmReal = formatNumber(valorEmReal)
        var html = "<p id='valor-real'>Valor em Reais: " + valorEmReal + "</p>"
        var htmlConversao = document.getElementById("valor-real")
        htmlConversao.innerHTML = html
    } else {
        var html = "<p id='valor-real'>Valor em Reais: R$ 0,00 </p>"
        var htmlConversao = document.getElementById("valor-real")
        htmlConversao.innerHTML = html
    }
}

function trocarVirguladoPorPonto(value) {
    value = value.toString();
    value = value.replace(/,/,'.')
    value = parseFloat(value)
    return value
}

function formatNumber(value) {
    value = value.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    return value
}



