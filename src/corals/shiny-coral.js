import gsap from "gsap"
import { CustomEase } from "gsap/all"

gsap.registerPlugin(CustomEase)

class ShinyCoral {
    constructor(posX, posY, width, color, speed, id) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.color = color
        this.speed = speed
        this.id = id
        this.isAnimated = false
    }

    draw() {
        const coralImage = document.createElement('img')
        const attributes = {
            'id': `${this.id}`,
            'src': `./images/scene1/sprites/shiny-coral/${this.color}.png`,
            'alt': `${this.color}-shiny-coral`,
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}px; z-index:${this.depth};`,
            'class': 'plane',
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            coralImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(coralImage)
        coralImage.addEventListener('mouseover', this.animate)
    }

    animate() {
        if (!this.isAnimated) {
            console.log(this.scaleF)
            this.isAnimated = true
            gsap.to(`#${this.id}`, {
                scale: 0.6,
                duration: 1,
                ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.085,0.988 0.302,0.988 0.722,0.988 0.818,0.001 1,0 "),
                onComplete: () => this.isAnimated = false
            })
        }
    }
}

export class ShinyCoralP2 extends ShinyCoral {
    constructor(posX, posY, width, color, speed, id) {
        super(posX, posY, width, color, speed, id)
    }

    animate() {
        if (!this.isAnimated) {
            console.log(this.scaleF)
            this.isAnimated = true
            gsap.to(`#${this.id}`, {
                scale: 0.8,
                duration: 1,
                ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.085,0.988 0.302,0.988 0.722,0.988 0.818,0.001 1,0 "),
                onComplete: () => this.isAnimated = false
            })
        }
    }
}

export default ShinyCoral