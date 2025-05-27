const buttonDraw = document.getElementById("draw-graph")
buttonDraw.onclick = () => {
    const bar1 = document.getElementById("barra1")
    const bar2 = document.getElementById("barra2")
    const bar3 = document.getElementById("barra3")
    const bar4 = document.getElementById("barra4")
    const bar5 = document.getElementById("barra5")

    const height1 = parseInt(document.getElementById("altura1").value)
    const height2 = parseInt(document.getElementById("altura2").value)
    const height3 = parseInt(document.getElementById("altura3").value)
    const height4 = parseInt(document.getElementById("altura4").value)
    const height5 = parseInt(document.getElementById("altura5").value)
    const width = parseInt(document.getElementById("largura").value)
    if(isNaN(height1) || isNaN(height2) || isNaN(height3) || isNaN(height4) || isNaN(height5) || isNaN(width)){
        alert("Algum(ns) valores informados não são números ou não foram informados!")
        return;
    }
    // console.log(height1, height2, height3, height4, height5)
    bar1.style.height = height1 + "px"
    bar1.style.width = width + "px"
    bar2.style.height = height2 + "px"
    bar2.style.width = width + "px"
    bar3.style.height = height3 + "px"
    bar3.style.width = width + "px"
    bar4.style.height = height4 + "px"
    bar4.style.width = width + "px"
    bar5.style.height = height5 + "px"
    bar5.style.width = width + "px"
}