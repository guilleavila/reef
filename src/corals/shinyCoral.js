import gsap from "gsap"
import { CustomEase } from "gsap/all"
import { Element } from "../element/element"

gsap.registerPlugin(CustomEase)

export class ShinyCoral extends Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name, color) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name)
        this.color = color

        this.draw()
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/${this.sceneID}/sprites/${this.type}/${this.name}/${this.color}.png`,
            'alt': `${this.color}-${this.name}`,
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `${this.sceneID=== 'scene-1' && 'plane'} ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        const divNode = document.getElementById(this.sceneID)
        divNode.appendChild(elementImage)
    }

    animate() {
        const boolean = Math.random() < 0.5
        if (boolean) {
            const delay = Math.random() * 2
            gsap.to(`#${this.id}`, {
                scale: 0.9,
                rotate: 10,
                duration: 0.5,
                ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.085,0.988 0.302,0.988 0.722,0.988 0.818,0.001 1,0 "),
                delay: delay
            })
        }
    }
}