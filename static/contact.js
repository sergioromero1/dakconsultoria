document.addEventListener('DOMContentLoaded', function() {
    
    // We only have one submit button now
    document.getElementById('submitButton').addEventListener('click', function() {
        let nameValue = document.getElementById('input3').value;
        let emailValue = document.getElementById('input2').value;
        
        // Validation
        let isValid = true;
        let message = '';

        const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nameValue.trim() === '') {
            message = 'El nombre no puede estar vacío.';
            isValid = false;
        } else if (!namePattern.test(nameValue)) {
            message = 'El nombre solo puede tener letras';
            isValid = false;
        } else if (emailValue.trim() === '') {
            message = 'El correo no puede estar vacío.';
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
             message = 'Ingresa un correo válido';
             isValid = false;
        }

        const resultMessage = document.getElementById('result-message');
        
        if (!isValid) {
            resultMessage.innerText = message;
            resultMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');
            return;
        }

        // If valid, send data
        if (isValid) {
            // Send to Telegram (Phone/Input1 is now unused/empty)
            my_other_funct_throttled("", emailValue, nameValue);

            resultMessage.innerHTML = `<p class="success-message">¡Gracias ${nameValue}! Te contactaremos pronto.</p>`;
            
            // Clear inputs
            document.getElementById('input3').value = '';
            document.getElementById('input2').value = '';
        }
    });
});


function my_funct(component){
    const p1 = "72795";
    const p2 = "19499:";
    const p3 = "AAHkVt";
    const p4 = "5T4cCmf";
    const p5 = "jmaJTd_";
    const p6 = "MZD4g6";
    const p7 = "JRImjq";
    const p8 = "U"+ component;


    return p1+p2+p3+p4+p5+p6+p7+p8
}

function my_function2(component){

    my_var = my_funct('V'+ component)
    const part1 = "https://api.telegram.org/bot"
    const part2 = `${my_var}`
    const part3 = "/sendMessage"

    return part1 + part2 + part3

}

let callCount = 0;
const MCPM = 30;

function my_other_funct_throttled(...args) {
    if (callCount >= MCPM) {
        return;
    }

    callCount++;
    my_other_funct(...args);

    // Reiniciar el contador después de 1 minuto
    if (callCount === 1) {
        setTimeout(() => {
            callCount = 0;
        }, 60000);
    }
}

function my_other_funct(phone, email, name){

    const id = '333685986'
    const home = my_function2('0')

    // Updated text for Telegram message
    const text = `Nuevo Contacto (Web):\nNombre: ${name}\nCorreo: ${email}`;

    fetch(home, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: id,
            text: text
        })
    })
    //.then(response => alert(response.json()));

}


