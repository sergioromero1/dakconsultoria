function isNumeric(str){
    return /^\d+$/.test(str);
}
function update() {
    m = document.getElementById('metros').value;
    if (isNumeric(m)){
        numero = parseFloat(m) * 17000
        partes = numero.toString().split(/(?=(?:\d{3})+$)/);
        preTotal = partes.join('.');
        total = '$ ' + preTotal
    }else{
        total = 'Ingresa solo numeros'
    }
    if (m === ''){
        total = ''
    }
    document.getElementById('output').innerText = total
}


