import { TAMX, TAMY, PROB_ENEMY_SHIP, OBSTACLE_SPEED_MIN, OBSTACLE_SPEED_MAX } from "./config.js"
import { space } from "./space.js"

export let currentSpeedMin = OBSTACLE_SPEED_MIN
export let currentSpeedMax = OBSTACLE_SPEED_MAX

function randomSpeed() {
  return Math.floor(Math.random() * (currentSpeedMax - currentSpeedMin + 1)) + currentSpeedMin
}

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/enemyShip.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.speed = randomSpeed()
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`
  }
}

const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => {
  for (let i = enemyShips.length - 1; i >= 0; i--) {
    const e = enemyShips[i]
    e.move()
    if (parseInt(e.element.style.top) > TAMY) {
      e.element.remove()
      enemyShips.splice(i, 1)
    }
  }
}

export { enemyShips }