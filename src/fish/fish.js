import gsap from "gsap"

class Fish {
    constructor(posX, posY, width, speed, id, depth, fishFrames, name) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.speed = speed
        this.id = id
        this.depth = depth
        this.fishFrames = fishFrames
        this.framesIndex = 1
        this.name = name
        this.backwards = false
    }

    draw() {
        const fishImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/fish/${this.name}/${this.name}-${this.framesIndex}.png`,
            'alt': 'sprite-fish',
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            fishImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(fishImage)
    }

    animate(framesCounter, fishID) {

        if (this.framesIndex === 1) {
            this.backwards = false
        } else if (this.framesIndex === this.fishFrames) {
            this.backwards = true
        }

        const fishImage = document.getElementById(fishID)

        if (framesCounter % 3 == 0 && this.backwards) {
            fishImage.src = `./images/scene1/sprites/fish/${this.name}/${this.name}-${this.framesIndex--}.png`
        } else if (framesCounter % 3 == 0 && !this.backwards) {
            fishImage.src = `./images/scene1/sprites/fish/${this.name}/${this.name}-${this.framesIndex++}.png`
        }
    }
}

export class StaticFish extends Fish {
    constructor(posX, posY, width, speed, id, depth, fishFrames, name) {
        super(posX, posY, width, speed, id, depth, fishFrames, name)
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

export class PathFish extends Fish {
    constructor(posX, posY, width, speed, id, depth, fishFrames, name, path, duration,delay) {
        super(posX, posY, width, speed, id, depth, fishFrames, name)
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