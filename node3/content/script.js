window.onload = function () {
  var gerarButton = document.getElementById("gerar");
  gerarButton.onclick = function () {
    var numParagrafos = parseInt(document.getElementById("numParagrafos").value);
    if (isNaN(numParagrafos) || numParagrafos < 1) numParagrafos = 1;

    fetch(`https://baconipsum.com/api/?type=meat-and-filler&paras=${numParagrafos}&start-with-lorem=1`)
      .then(response => response.json())
      .then(result => {
        var loremBlock = document.getElementById("lorem");
        loremBlock.innerHTML = result.map(par => `<p>${par}</p>`).join('');
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };
};