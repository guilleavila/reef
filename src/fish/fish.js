import gsap from "gsap"
import { SpriteElement } from "../element/element"
import scene from "../scene"
import { getNode } from "../utils/getNode"


export class StaticFish extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID)
    }

    swim() {
        gsap.to(`#${this.id}`, {
            rotate: Math.random(10 - 3) + 3,
            right: `${this.position.x + 1}%`,
            duration: Math.random(5 - 1) + 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 1
        })
    }
}

export class StraightPathFish extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID, duration, delay) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID)
        this.duration = duration
        this.delay = delay
    }

    swim() {
        gsap.to(`#${this.id}`, {
            duration: this.duration,
            left: `${this.name.includes('reverse') ? '350' : '-10'}%`,
            ease: "linear",
            delay: this.delay
        })
    }
}

export class PathFish extends StraightPathFish {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID, path, duration, delay) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID, duration, delay)
        this.path = path
    }

    swim() {
        gsap.to(`#${this.id}`, {
            duration: this.duration,
            motionPath: {
                path: `#${this.path}`,
                align: `#${this.path}`,
                alignOrigin: [0.5, 0.5],
                autoRotate: 180
            },
            ease: "linear",
            delay: this.delay
        })
    }
}

export class PathStingray extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID)
    }

    swim(path, duration, rotation, delay) {
        gsap.to(`#${this.id}`, {
            duration: duration,
            motionPath: {
                path: `#${path}`,
                align: `#${path}`,
                alignOrigin: [0.5, 0.5],
                autoRotate: rotation
            },
            ease: "linear",
            delay: delay,
            onComplete: () => scene.swimState = `${path}-done`
        })
    }
}


export class BlowFish extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID)
        this.hasPopped = false
    }

    draw() {
        const elementIcon = document.createElement('i')

        const attributes = {
            'id': this.id,
            'src': `./images/${this.sceneID}/sprites/${this.type}/${this.name}/${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; 
                bottom: ${this.position.y}vh;
                right: ${this.position.x}vw; 
                width: ${this.width}vw;
                height: ${this.height}vw;
                background: url(./images/${this.sceneID}/sprites/${this.type}/${this.name}/${this.name}.png) no-repeat;
                background-size: ${this.width * this.totalFrames}vw ${this.height * 3}vw;
                background-position: 0vw 0vw;
                animation: ${this.animation.name} ${this.animation.duration}s steps(${this.totalFrames}) alternate-reverse infinite;`,
            'class': `${this.depth} blowFish`,
            'data-speed': `${this.speed}`
        }

        for (const attr in attributes) {
            elementIcon.setAttribute(attr, attributes[attr])
        }

        const divNode = getNode('P1-S2')
        divNode.appendChild(elementIcon)
    }

    pop() {
        this.hasPopped = true
        const blowFishNode = getNode(this.id)
        blowFishNode.style.backgroundPosition = '0vw -3vw'
        blowFishNode.style.animation = 'blowFishPopAnimation 0.15s steps(15) 1'

        setTimeout(() => {
            blowFishNode.style.backgroundPosition = '0vw -6vw'
            blowFishNode.style.animation = 'blowFishBigAnimation 0.7s steps(15) alternate-reverse infinite'
        }, 150)
    }
}