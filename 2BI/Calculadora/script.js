const display = document.getElementById("display");

function adicionar(valor){
    display.value += valor;
}

function limpar(){
    display.value = "";
}

function apagar(){
    display.value = display.value.slice(0,-1);
}

function calcular(){
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "Erro";
    }
}

function potencia(){
    let base = prompt("Digite a base:");
    let expoente = prompt("Digite o expoente:");

    if(base !== null && expoente !== null){
        display.value = Math.pow(base, expoente);
    }
}

function logaritmo(){
    let numero = prompt("Digite o número:");
    let base = prompt("Digite a base:");

    if(numero > 0 && base > 0 && base != 1){
        display.value = Math.log(numero) / Math.log(base);
    }else{
        display.value = "Erro";
    }
}