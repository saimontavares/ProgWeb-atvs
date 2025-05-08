document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('circle-form');
    const radiusInput = document.getElementById('radius');
    const areaOutput = document.getElementById('area');
    const circumferenceOutput = document.getElementById('circumference');

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
});