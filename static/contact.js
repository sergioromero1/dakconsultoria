document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 0;
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.nextButton');
    
    nextButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const current = steps[currentStep];
            const next = steps[currentStep + 1];

            current.classList.add('slide-out');
            current.classList.add('hidden');
            next.classList.remove('hidden');
            next.classList.add('slide-in');

            currentStep++;

        });
    });

    document.getElementById('submitButton').addEventListener('click', function() {
        let input1Value = document.getElementById('input1').value;
        let input2Value = document.getElementById('input2').value;
        let input3Value = document.getElementById('input3').value;
        alert('Primer dato: ' + input1Value + '\nSegundo dato: ' + input2Value + 'Tercer dato: ' + input3Value);
    });
});