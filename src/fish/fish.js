import gsap from "gsap"
import { SpriteElement } from "../element/element"


export class StaticFish extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation)
    }

    swim() {
        gsap.to(`#${this.id}`, {
            rotate: Math.random(10 - 3) + 3,
            left: `${this.position.x + 1}%`,
            duration: Math.random(5 - 1) + 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 1
        })
    }
}

export class PathFish extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, path, duration, delay) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation)
        this.path = path
        this.duration = duration
        this.delay = delay
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
            ease: "power2.Out",
            delay: this.delay
        })
    }
}

export class PathStingray extends SpriteElement {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, duration) {
        super(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation)
        this.duration = duration
    }

    swim() {
        gsap.timeline()
            .to(`#${this.id}`, {
                duration: this.duration,
                motionPath: {
                    path: '#stingray-path-1',
                    align: '#stingray-path-1',
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90
                },
                ease: "linear"
            })
            .to(`#${this.id}`, {
                duration: this.duration,
                motionPath: {
                    path: `#stingray-path-2`,
                    align: `#stingray-path-2`,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90
                },
                ease: "linear"
            })
    }
}