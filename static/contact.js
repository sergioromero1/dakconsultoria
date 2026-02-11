document.addEventListener('DOMContentLoaded', function () {

    // Track page load time for anti-spam speed check
    const pageLoadTime = Date.now();
    const MIN_INTERACTION_TIME = 3000; // 3 seconds
    const SUBMISSION_COOLDOWN = 5 * 60 * 1000; // 5 minutes in milliseconds

    // We only have one submit button now
    document.getElementById('submitButton').addEventListener('click', function () {
        let nameValue = document.getElementById('input3').value;
        let emailValue = document.getElementById('input2').value;
        let honeypotValue = document.getElementById('website_hp').value;

        const resultMessage = document.getElementById('result-message');
        const currentTime = Date.now();

        // --- Anti-Spam Checks ---

        // 1. Honeypot check
        if (honeypotValue !== '') {
            // Silently fail or pretend to succeed to confuse the bot
            console.log("Bot detected: Honeypot filled");
            resultMessage.innerText = ''; // No feedback for bots
            return;
        }

        // 2. Speed check (Human interaction time)
        if (currentTime - pageLoadTime < MIN_INTERACTION_TIME) {
            console.log("Bot detected: Too fast");
            resultMessage.innerText = 'Por favor espera unos segundos antes de enviar.';
            resultMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');
            return;
        }

        // 3. Rate Limiting (LocalStorage)
        const lastSubmission = localStorage.getItem('lastContactSubmission');
        if (lastSubmission && (currentTime - parseInt(lastSubmission) < SUBMISSION_COOLDOWN)) {
            const minutesLeft = Math.ceil((SUBMISSION_COOLDOWN - (currentTime - parseInt(lastSubmission))) / 60000);
            resultMessage.innerText = `Por favor espera ${minutesLeft} minutos antes de enviar otro mensaje.`;
            resultMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');
            return;
        }

        // --- Validation ---
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

        if (!isValid) {
            resultMessage.innerText = message;
            resultMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-light');
            return;
        }

        // If valid, send data
        if (isValid) {
            // Save submission time
            localStorage.setItem('lastContactSubmission', currentTime.toString());

            // Send to Telegram (Phone/Input1 is now unused/empty)
            my_other_funct_throttled("", emailValue, nameValue);

            // Send to Supabase
            saveToSupabase(nameValue, emailValue);

            // Facebook Pixel Lead Tracking
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }

            // Google Ads Conversion
            if (typeof gtag_report_conversion === 'function') {
                gtag_report_conversion();
            }

            resultMessage.innerHTML = `<p class="success-message">¡Gracias ${nameValue}! Te contactaremos pronto.</p>`;

            // Clear inputs
            document.getElementById('input3').value = '';
            document.getElementById('input2').value = '';
        }
    });
});

const SUPABASE_URL = 'https://vdvjilvxzufypygyczjt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_I3PTdAiB_xyj6N83uUtb-g_9jqb0hnJ';

function saveToSupabase(name, email) {
    const url = `${SUPABASE_URL}/rest/v1/Contactos`;
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    };
    const body = JSON.stringify({
        nombre: name,
        email: email
    });

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    }).then(response => {
        if (!response.ok) {
            console.warn('Supabase Error:', response.statusText);
        } else {
            console.log('Saved to Supabase');
        }
    }).catch(error => {
        console.error('Supabase Network Error:', error);
    });
}


function my_funct(component) {
    const p1 = "72795";
    const p2 = "19499:";
    const p3 = "AAHkVt";
    const p4 = "5T4cCmf";
    const p5 = "jmaJTd_";
    const p6 = "MZD4g6";
    const p7 = "JRImjq";
    const p8 = "U" + component;


    return p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8
}

function my_function2(component) {

    my_var = my_funct('V' + component)
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

function my_other_funct(phone, email, name) {

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


