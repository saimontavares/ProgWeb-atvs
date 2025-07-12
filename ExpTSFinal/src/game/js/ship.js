import { TAMX, SHIP_SPEED } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    space.element.appendChild(this.element)
    this.width = this.element.width
    this.damaged = false
  }
  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    if (!this.damaged) {
      this.element.src = this.getCurrentDirectionImage()
    }
  }
  getCurrentDirectionImage() {
    return [
      "assets/png/playerLeft.png",
      "assets/png/player.png",
      "assets/png/playerRight.png",
    ][this.direction]
  }
  move() {
    const currentLeft = parseInt(this.element.style.left)
    if (this.direction === 0) {
      // Indo para a esquerda
      const newLeft = Math.max(0, currentLeft - SHIP_SPEED)
      this.element.style.left = `${newLeft}px`
    }
    if (this.direction === 2) {
      // Indo para a direita
      const newLeft = Math.min(TAMX - 99, currentLeft + SHIP_SPEED)
      this.element.style.left = `${newLeft}px`
    }
  }
  get
}

export const ship = new Ship()