document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 0;
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.nextButton');

    isValid = true;
    
    nextButtons.forEach((button) => {
        button.addEventListener('click', function() {

            if (button.parentNode.id === 'step1'){
                validMeters()
            } else if (button.parentNode.id === 'step2'){
                validEmail()
            } else if (button.parentNode.id === 'step3'){
                validName()
            }

            if (isValid === true){

                const current = steps[currentStep];
                const next = steps[currentStep + 1];
    
                current.classList.add('slide-out');
                current.classList.add('hidden');
                next.classList.remove('hidden');
                next.classList.add('slide-in');
    
                currentStep++;
            }

        });
    });

    document.getElementById('submitButton').addEventListener('click', function() {
        // let input1Value = document.getElementById('input1').value;
        // let input2Value = document.getElementById('input2').value;
        // let input3Value = document.getElementById('input3').value;
        submit = document.getElementById('submitButton');
        if (submit.parentNode.id === 'step3'){
            validName()
        }
        if (isValid === true) {
            // alert('Primer dato: ' + input1Value + '\nSegundo dato: ' + input2Value + 'Tercer dato: ' + input3Value);
            document.getElementById('output').innerText = 'Gracias Pronto te contactaremos'
            document.getElementById('output').style.color = 'green';
            document.getElementById('input3').value = '';
        }
    });
});


//////////////////////////// Validaciones ////////////////////////////////////
function validMeters(){
    meters = document.getElementById('input1').value;
    m = ''
    if (meters === ''){
        m = ''
    }
    if (!/^\d+$/.test(meters)) {
        m = 'Ingresa solo numeros'
        isValid = false;
    } else{
        m = ''
        isValid = true;
    }
    document.getElementById('output').innerText = m
}

function validEmail(){
    email = document.getElementById('input2').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === ''){
        m = ''
    }
    if (!emailPattern.test(email) || /(\.\.)/.test(email)) {
        m = 'El correo debe tener la forma nombre@correo.com'
        isValid = false;
    } else{
        m = ''
        isValid = true;
    }
    document.getElementById('output').innerText = m
}

function validEmailKey(){
    email = document.getElementById('input2').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
        m = 'Correcto'
    } 
    if (email === ''){
        m = ''
    }
    document.getElementById('output').innerText = m
}

function validName(){
    n = document.getElementById('input3').value;
    if (n === ''){
        m = ''
    }
    if (n.trim() === '') {
        m = 'El nombre no puede estar vacío.'
        isValid = false;
    } else{
        m = ''
        isValid = true;
    }
    document.getElementById('output').innerText = m
}

//////////////////////////// Telegram  ////////////////////////////////////

const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = 'YOUR_TELEGRAM_CHAT_ID';

/// por modificar
document.getElementById('myButton').addEventListener('click', function() {
    const message = '¡El botón fue clickeado!';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const data = {
        chat_id: chatId,
        text: message
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Mensaje enviado:', result);
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
    });
});
//////////////////////////////////////////////////////////////////////////