import gsap from "gsap"
import { Element } from "../element/element"

export class Plastic extends Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name, divID) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name, divID)
        this.draw()
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