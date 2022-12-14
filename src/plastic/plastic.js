import gsap from "gsap"
import { Element } from "../element/element"
import { getNode } from "../utils/getNode"

export class Plastic extends Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name, divID) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name)
        this.divID = divID
        this.draw()
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/${this.sceneID}/elements/${this.type}//${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; 
                bottom: ${this.position.y}vh; 
                right: ${this.position.x}vw; 
                width: ${this.width}vw;`,
            'class': `${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        const divNode = getNode(this.divID)
        divNode.appendChild(elementImage)
    }

    animate() {
        const plasticTL = gsap.timeline()
        plasticTL
            .to(`#${this.id}`, {
                rotate: Math.random() < 0.5 ? -360 : 360,
                duration: Math.random()*(30 - 20) + 20,
                repeat: -1,
                ease: 'linear'
            },0)
            .to(`#${this.id}`, {
                right:`${this.position.x + (Math.random() < 0.5 ? -2 : 2)}vw`,
                duration: Math.random()*(10 - 5) + 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            },0)
            .to(`#${this.id}`, {
                bottom:`105%`,
                duration: 105 - this.position.y,
                ease: "linear"
            },0)
    }
}