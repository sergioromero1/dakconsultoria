document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 0;
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.nextButton');

    isValid = true;
    
    nextButtons.forEach((button) => {
        button.addEventListener('click', function() {

            if (button.parentNode.id === 'step1'){
                validPhoneNumber()
            } else if (button.parentNode.id === 'step2'){
                validMeters()
            } else if (button.parentNode.id === 'step3'){
                validName()
            }

            if (isValid === true){

                const current = steps[currentStep];
                const next = steps[currentStep + 1];
    
                // current.classList.add('slide-out');
                current.classList.add('hidden');
                next.classList.remove('hidden');
                // next.classList.add('slide-in');
    
                currentStep++;
            }

        });
    });

    document.getElementById('submitButton').addEventListener('click', function() {
        let input1Value = document.getElementById('input1').value;
        let input2Value = document.getElementById('input2').value;
        let input3Value = document.getElementById('input3').value;
        submit = document.getElementById('submitButton');
        if (submit.parentNode.id === 'step3'){
            validName()
        }

        if (isValid === true) {
            //alert('Primer dato: ' + input1Value + '\nSegundo dato: ' + input2Value + 'Tercer dato: ' + input3Value);
            
            my_other_funct(input1Value, input2Value, input3Value)

            // const inputContainer = document.getElementById('result-box');
            // inputContainer.innerHTML = `
            //     <div class="confirmation">
            //         <img src="https://img.icons8.com/ios-filled/50/FFFFFF/checkmark.png" alt="Checkmark">
            //     </div>
            // `;

            const resultMessage = document.getElementById('result-message');
            resultMessage.innerHTML = `<p class="success-message">¡Gracias ${input3Value}! Te contactaremos pronto con tu cotización.</p>`;
            steps[2].classList.add('inactive');

            // document.getElementById('result-message').innerText = 'Gracias Pronto te contactaremos'
            // document.getElementById('result-message').style.color = getComputedStyle(document.documentElement).getPropertyValue('--success-green');
            
            document.getElementById('input1').value = ''
            document.getElementById('input2').value = ''
            document.getElementById('input3').value = '';

            // // Lógica para volver a mostrar el 'step1'
            // const current = steps[currentStep];
            // const firstStep = steps[0]; // Selecciona el primer step (step1)

            // // Oculta el paso actual
            // current.classList.add('hidden');
            // current.classList.remove('slide-in');
            
            // // Muestra el primer step (step1)
            // firstStep.classList.remove('hidden');
            // firstStep.classList.add('slide-in');
            
            // currentStep = 0; // Reinicia el contador de pasos al primer p


        }
    });
});



//////////////////////////// Validaciones ////////////////////////////////////

function validPhoneNumber() {
    phoneNumber = document.getElementById('input1').value;
    const phonePattern = /^[0-9]{10}$/;
    let m = '';

    // Verifica si el campo está vacío
    if (phoneNumber === '') {
        m = 'El campo del teléfono está vacío';
        isValid = false;

    } 
    // Verifica que el número tenga exactamente 10 dígitos
    else if (!phonePattern.test(phoneNumber)) {
        m = 'El número debe contener exactamente 10 dígitos sin símbolos';
        isValid = false;
    }else{
        m = ''
        isValid = true;
    }
    document.getElementById('result-message').innerText = m
    document.getElementById('result-message').style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');
}

function validMeters(){
    meters = document.getElementById('input2').value;
    const metersPattern = /^\d+$/;
    let m = '';

    // Verifica si el campo está vacío
    if (meters === ''){
        m = 'El campo está vacío';
        isValid = false;
    }
    else if (!metersPattern.test(meters)) {
        m = 'Ingresa solo números'
        isValid = false;
    }else{
        m = ''
        isValid = true;
    }
    document.getElementById('result-message').innerText = m
    document.getElementById('result-message').style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');
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
    document.getElementById('result-message').innerText = m
    document.getElementById('result-message').style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');


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
    document.getElementById('result-message').innerText = m
    document.getElementById('result-message').style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');

}

function validName(){
    n = document.getElementById('input3').value;
    const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;
    if (n === ''){
        m = 'El nombre no puede estar vacío.'
        isValid = false;
    // if (n.trim() === '') {
    }else if (!namePattern.test(n)) {
            m = 'El nombre solo puede tener letras';
            isValid = false;
    } else{
        m = ''
        isValid = true;
    }
    document.getElementById('result-message').innerText = m
    document.getElementById('result-message').style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');

}

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

function my_other_funct(input1Value, input2Value, input3Value){

    const id = '333685986'
    const home = my_function2('0')

    const text = `Telefono: ${input1Value}\nMetros: ${input2Value}\nNombre: ${input3Value}`;

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

