import gsap from "gsap"
import { Element } from "../element/element"

export class HoverCoral extends Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name, divID) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name, divID)
        this.draw()
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