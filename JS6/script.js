// script.js
const rastro = [];
const maxRastro = 8;

document.body.addEventListener("mousemove", (e) => {
  const ponto = document.createElement("div");
  ponto.className = "trail-dot";
  ponto.style.left = (e.pageX - 6) + "px";
  ponto.style.top = (e.pageY - 6) + "px";
  document.body.appendChild(ponto);
  rastro.push(ponto);

  if (rastro.length > maxRastro) {
    const antigo = rastro.shift();
    antigo.remove();
  }
});

console.log("JS carregado")