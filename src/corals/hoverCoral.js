import gsap from "gsap"
import { Element } from "../element/element"

export class HoverCoral extends Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name)
        this.draw()
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/${this.sceneID}/sprites/${this.type}/${this.name}/${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; bottom: ${this.position.y}vh; right: ${this.position.x}vw; width: ${this.width}vw;`,
            'class': `plane ${this.depth} hoverCoral`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        const divNode = document.getElementById('hoverCorals')
        divNode.appendChild(elementImage)
    }

    animate() {
        const coralTL = gsap.timeline()
        coralTL
            .to(`#${this.id}`, {
                rotate: 90,
                scale: 0.2,
                duration: 0.8,
                ease: "power4.out"
            })
            .to(`#${this.id}`, {
                rotate: -90,
                scale: 1,
                duration: 2.5,
                ease: "circ.out"
            })
    }
}