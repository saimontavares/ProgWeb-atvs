import { TAMX, TAMY, PROB_ENEMY_METEOR_BIG, OBSTACLE_SPEED_MIN, OBSTACLE_SPEED_MAX } from "./config.js"
import { space } from "./space.js"

export let currentSpeedMin = OBSTACLE_SPEED_MIN
export let currentSpeedMax = OBSTACLE_SPEED_MAX

function randomSpeed() {
  return Math.floor(Math.random() * (currentSpeedMax - currentSpeedMin + 1)) + currentSpeedMin
}

class MeteorBig {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-meteor-big"
    this.element.src = "assets/png/meteorBig.png"
    this.element.style.top = "-90px"
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 90))}px`
    this.element.style.width = "90px"
    this.element.style.height = "90px"
    this.speed = randomSpeed()
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`
  }
}

const meteorBigs = []

export const createRandomMeteorBig = () => {
  if (Math.random() < PROB_ENEMY_METEOR_BIG) meteorBigs.push(new MeteorBig())
}

export const moveMeteorBigs = () => {
  for (let i = meteorBigs.length - 1; i >= 0; i--) {
    const m = meteorBigs[i]
    m.move()
    if (parseInt(m.element.style.top) > TAMY) {
      m.element.remove()
      meteorBigs.splice(i, 1)
    }
  }
}

export { meteorBigs }