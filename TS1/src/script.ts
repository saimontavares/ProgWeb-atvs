document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('circle-form') as HTMLInputElement;
    const radiusInput = document.getElementById('radius')as HTMLInputElement;
    const areaOutput = document.getElementById('area')as HTMLInputElement;
    const circumferenceOutput = document.getElementById('circumference')as HTMLInputElement;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const radius = parseFloat(radiusInput.value);
        if (isNaN(radius) || radius <= 0) {
            alert('Por favor, insira um raio válido.');
            return;
        }

        const area = Math.PI * radius * radius;
        const circumference = 2 * Math.PI * radius;

        areaOutput.value = area.toFixed(2);
        circumferenceOutput.value = circumference.toFixed(2);
    });
})