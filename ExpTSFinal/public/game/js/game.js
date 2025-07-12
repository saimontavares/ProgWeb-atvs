import { FPS, OBSTACLE_SPEED_MIN, OBSTACLE_SPEED_MAX } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips, currentSpeedMax as enemyShipSpeedMax, currentSpeedMin as enemyShipSpeedMin } from "./enemyShip.js"
import { createRandomUFO, moveUFOs, currentSpeedMax as UFOSpeedMax, currentSpeedMin as UFOSpeedMin } from "./ufo.js"
import { createRandomMeteorBig, moveMeteorBigs, currentSpeedMax as meteorBigSpeedMax, currentSpeedMin as meteorBigSpeedMin } from "./meteorBig.js"
import { createRandomMeteorSmall, moveMeteorSmalls, currentSpeedMax as meteorSmallSpeedMax, currentSpeedMin as meteorSmallSpeedMin } from "./meteorSmall.js"

import { enemyShips } from "./enemyShip.js"
import { ufos } from "./ufo.js"
import { meteorBigs } from "./meteorBig.js"
import { meteorSmalls } from "./meteorSmall.js"

let gameInterval = null
let paused = false

let score = 0
let lives = 3

let shots = []

function updateHUD() {
  document.getElementById("score").textContent = `${score.toString().padStart(6, "0")}`
  const livesContainer = document.getElementById("lives")
  livesContainer.innerHTML = ""
  for (let i = 0; i < lives; i++) {
    const img = document.createElement("img")
    img.src = "assets/png/life.png"
    img.alt = "Vida"
    livesContainer.appendChild(img)
  }
}

document.addEventListener("DOMContentLoaded", updateHUD)

function startGame() {
  if (!gameInterval) {
    score = 0
    lives = 3
    updateHUD()
    gameInterval = setInterval(run, 1000 / FPS)
    paused = false
    startDifficultyInterval()
  }
}

let difficultyInterval = null

function startDifficultyInterval() {
  if (difficultyInterval) clearInterval(difficultyInterval)
  difficultyInterval = setInterval(() => {
    enemyShipSpeedMin++
    enemyShipSpeedMax++
    UFOSpeedMin++
    UFOSpeedMax++
    meteorBigSpeedMin++
    meteorBigSpeedMax++
    meteorSmallSpeedMin++
    meteorSmallSpeedMax++
  }, 60000)
}

function stopDifficultyInterval() {
  if (difficultyInterval) {
    clearInterval(difficultyInterval)
    difficultyInterval = null
  }
}

function togglePause() {
  if (gameInterval && !paused) {
    clearInterval(gameInterval)
    gameInterval = null
    paused = true
    stopDifficultyInterval()
  } else if (paused) {
    gameInterval = setInterval(run, 1000 / FPS)
    paused = false
    startDifficultyInterval()
  }
}

function createShot() {
  const shot = document.createElement("div")
  shot.className = "shot"
  shot.style.position = "absolute"
  shot.style.width = "4px"
  shot.style.height = "20px"
  shot.style.background = "yellow"
  shot.style.left = `${parseInt(ship.element.style.left) + ship.element.width / 2 - 2}px`
  shot.style.bottom = `${parseInt(ship.element.style.bottom) + ship.element.height}px`
  space.element.appendChild(shot)
  shots.push(shot)
}

function moveShots() {
  for (let i = shots.length - 1; i >= 0; i--) {
    const shot = shots[i]
    shot.style.bottom = `${parseInt(shot.style.bottom) + 10}px`
    if (parseInt(shot.style.bottom) > 900) { // Limite superior
      shot.remove()
      shots.splice(i, 1)
      continue
    }
    // Colisão com obstáculos
    if (checkCollision(shot, enemyShips, 50)) { // nave extraterrestre
      score += 50
      updateHUD()
      shot.remove()
      shots.splice(i, 1)
      continue
    }
    if (checkCollision(shot, ufos, 20)) { // disco voador
      score += 20
      updateHUD()
      shot.remove()
      shots.splice(i, 1)
      continue
    }
    if (checkCollision(shot, meteorBigs, 10)) { // asteroide grande
      score += 10
      updateHUD()
      shot.remove()
      shots.splice(i, 1)
      continue
    }
    if (checkCollision(shot, meteorSmalls, 100)) { // asteroide pequeno
      score += 100
      updateHUD()
      shot.remove()
      shots.splice(i, 1)
      continue
    }
  }
}

function checkCollision(shot, obstacles, points) {
  for (let j = obstacles.length - 1; j >= 0; j--) {
    const obs = obstacles[j].element
    const shotRect = shot.getBoundingClientRect()
    const obsRect = obs.getBoundingClientRect()
    if (
      shotRect.left < obsRect.right &&
      shotRect.right > obsRect.left &&
      shotRect.top < obsRect.bottom &&
      shotRect.bottom > obsRect.top
    ) {
      obs.remove()
      obstacles.splice(j, 1)
      return true
    }
  }
  return false
}

function checkShipCollision(obstacles) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i].element
    const shipRect = ship.element.getBoundingClientRect()
    const obsRect = obs.getBoundingClientRect()
    if (
      shipRect.left < obsRect.right &&
      shipRect.right > obsRect.left &&
      shipRect.top < obsRect.bottom &&
      shipRect.bottom > obsRect.top
    ) {
      obs.remove()
      obstacles.splice(i, 1)
      return true
    }
  }
  return false
}

function damageShip() {
  ship.damaged = true
  ship.element.src = "assets/png/playerDamaged.png"
  setTimeout(() => {
    ship.damaged = false
    ship.element.src = ship.getCurrentDirectionImage()
  }, 5000)
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)
  if (e.code === "Space") {
    if (gameInterval) createShot()
    else startGame()
  }
  if (e.key.toLowerCase() === "p") togglePause()
})


function showGameOver() {
  clearInterval(gameInterval)
  gameInterval = null
  stopDifficultyInterval()
  document.getElementById("gameover").style.display = "block"
  fetch('/game-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
})
    .then(res => res.json())
    .then(data => {
      console.log('Score salvo!', data)
    })
    .catch(() => {
      console.log('Erro ao salvar o score')
    });
}

function hideGameOver() {
  document.getElementById("gameover").style.display = "none"
}

document.getElementById("restartBtn").onclick = function() {
  [enemyShips, ufos, meteorBigs, meteorSmalls].forEach(arr => {
    while (arr.length) {
      arr.pop().element.remove()
    }
  })
  shots.forEach(s => s.remove())
  shots = []
  score = 0
  lives = 3
  updateHUD()
  hideGameOver()
  ship.element.style.left = `${space.element.offsetWidth / 2 - 50}px`
  ship.direction = 1
  ship.element.src = ship.getCurrentDirectionImage()
  ship.damaged = false
  paused = false
  gameInterval = setInterval(run, 1000 / FPS)
  enemyShipSpeedMin = OBSTACLE_SPEED_MIN
  enemyShipSpeedMax = OBSTACLE_SPEED_MAX
  UFOSpeedMin = OBSTACLE_SPEED_MIN
  UFOSpeedMax = OBSTACLE_SPEED_MAX
  meteorBigSpeedMin = OBSTACLE_SPEED_MIN
  meteorBigSpeedMax = OBSTACLE_SPEED_MAX
  meteorSmallSpeedMin = OBSTACLE_SPEED_MIN
  meteorSmallSpeedMax = OBSTACLE_SPEED_MAX
  startDifficultyInterval()
}

// loop principal:
function run() {
  space.move()
  ship.move()
  createRandomEnemyShip()
  moveEnemyShips()
  createRandomUFO()
  moveUFOs()
  createRandomMeteorBig()
  moveMeteorBigs()
  createRandomMeteorSmall()
  moveMeteorSmalls()
  moveShots()
  if (
  checkShipCollision(enemyShips) ||
  checkShipCollision(ufos) ||
  checkShipCollision(meteorBigs) ||
  checkShipCollision(meteorSmalls)
) {
  if (!ship.element.classList.contains("damaged")) {
    lives--
    updateHUD()
    damageShip()
    ship.element.classList.add("damaged")
    setTimeout(() => {
      ship.element.classList.remove("damaged")
    }, 5000)
    if (lives <= 0) {
      showGameOver()
    }
  }
}
}