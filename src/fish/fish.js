import gsap from "gsap"
import { SpriteElement } from "../element/element"
import scene from "../scene"


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
            left: `${this.name.includes('reverse') ? '110' : '-10'}%`,
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