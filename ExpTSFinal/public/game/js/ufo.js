import { TAMX, TAMY, PROB_ENEMY_UFO, OBSTACLE_SPEED_MIN, OBSTACLE_SPEED_MAX } from "./config.js"
import { space } from "./space.js"

export let currentSpeedMin = OBSTACLE_SPEED_MIN
export let currentSpeedMax = OBSTACLE_SPEED_MAX

function randomSpeed() {
  return Math.floor(Math.random() * (currentSpeedMax - currentSpeedMin + 1)) + currentSpeedMin
}

class UFO {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ufo"
    this.element.src = "assets/png/enemyUFO.png"
    this.element.style.top = "-40px"
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 70))}px`
    this.element.style.width = "60px"
    this.element.style.height = "60px"
    this.speed = randomSpeed()
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`
  }
}

const ufos = []

export const createRandomUFO = () => {
  if (Math.random() < PROB_ENEMY_UFO) ufos.push(new UFO())
}

export const moveUFOs = () => {
  for (let i = ufos.length - 1; i >= 0; i--) {
    const u = ufos[i]
    u.move()
    if (parseInt(u.element.style.top) > TAMY) {
      u.element.remove()
      ufos.splice(i, 1)
    }
  }
}

export { ufos }