import gsap from "gsap"
import { CustomEase } from "gsap/all"

gsap.registerPlugin(CustomEase)

class Coral {
    constructor(posX, posY, width, speed, id, depth) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.speed = speed
        this.id = id
        this.depth = depth
        this.isAnimated = false
    }
}

export class SpikedCoral extends Coral {
    constructor(posX, posY, width, speed, id, depth) {
        super(posX, posY, width, speed, id, depth)
    }

    draw() {
        const coralImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': './images/scene1/sprites/spiked-coral/spiked-coral.png',
            'alt': 'spiked-coral',
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `plane ${this.depth}`,
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
            this.isAnimated = true
            gsap.to(`#${this.id}`, {
                scale: 0,
                rotate: 360,
                duration: 2,
                ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.106,0.626 0.208,0.638 0.658,0.691 0.818,0.001 1,0 "),
                onComplete: () => this.isAnimated = false
            })
        }
    }
}

export class ShinyCoral extends Coral {
    constructor(posX, posY, width, speed, id, depth, color) {
        super(posX, posY, width, speed, id, depth)
        this.color = color
    }

    draw() {
        const coralImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/shiny-coral/${this.color}.png`,
            'alt': `${this.color}-shiny-coral`,
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            coralImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(coralImage)
        // coralImage.addEventListener('mouseover', this.animate)
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

// export class ShinyCoralP2 extends ShinyCoral {
//     constructor(posX, posY, width, speed, id, depth, color) {
//         super(posX, posY, width, speed, id, depth, color)
//     }

//     animate() {
//         if (!this.isAnimated) {
//             this.isAnimated = true
//             gsap.to(`#${this.id}`, {
//                 scale: 0.8,
//                 duration: 1,
//                 ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.085,0.988 0.302,0.988 0.722,0.988 0.818,0.001 1,0 "),
//                 onComplete: () => this.isAnimated = false
//             })
//         }
//     }
// }

export class SpriteCoral extends Coral {

    constructor(posX, posY, width, speed, id, depth, coralFrames, name) {
        super(posX, posY, width, speed, id, depth)
        this.coralFrames = coralFrames
        this.framesIndex = 1
        this.name = name
    }

    draw() {
        const coralImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/${this.name}/${this.name}-${this.framesIndex}.png`,
            'alt': 'sprite-coral',
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            coralImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(coralImage)
    }

    animate(framesCounter, coralID) {

        if (this.framesIndex === 1) {
            this.backwards = false
        } else if (this.framesIndex === this.coralFrames) {
            this.backwards = true
        }

        const coralImage = document.getElementById(coralID)

        if (framesCounter % 3 == 0 && this.backwards) {
            coralImage.src = `./images/scene1/sprites/${this.name}/${this.name}-${this.framesIndex--}.png`
        } else if (framesCounter % 3 == 0 && !this.backwards) {
            coralImage.src = `./images/scene1/sprites/${this.name}/${this.name}-${this.framesIndex++}.png`
        }
    }
}