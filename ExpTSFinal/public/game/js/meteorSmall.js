import { TAMX, TAMY, PROB_ENEMY_METEOR_SMALL, OBSTACLE_SPEED_MIN, OBSTACLE_SPEED_MAX } from "./config.js"
import { space } from "./space.js"

export let currentSpeedMin = OBSTACLE_SPEED_MIN
export let currentSpeedMax = OBSTACLE_SPEED_MAX

function randomSpeed() {
  return Math.floor(Math.random() * (currentSpeedMax - currentSpeedMin + 1)) + currentSpeedMin
}

class MeteorSmall {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-meteor-small"
    this.element.src = "assets/png/meteorSmall.png"
    this.element.style.top = "-50px"
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 50))}px`
    this.element.style.width = "50px"
    this.element.style.height = "50px"
    this.speed = randomSpeed()
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`
  }
}

const meteorSmalls = []

export const createRandomMeteorSmall = () => {
  if (Math.random() < PROB_ENEMY_METEOR_SMALL) meteorSmalls.push(new MeteorSmall())
}

export const moveMeteorSmalls = () => {
  for (let i = meteorSmalls.length - 1; i >= 0; i--) {
    const m = meteorSmalls[i]
    m.move()
    if (parseInt(m.element.style.top) > TAMY) {
      m.element.remove()
      meteorSmalls.splice(i, 1)
    }
  }
}

export { meteorSmalls }