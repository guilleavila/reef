export class Stingray {
    constructor(posX, posY, width, id, stingrayFrames, depth, name) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.id = id
        this.stingrayFrames = stingrayFrames
        this.framesIndex = 1
        this.depth = depth
        this.name = name
    }

    draw() {
        const stingrayImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/${this.name}/${this.name}-${this.framesIndex}.png`,
            'alt': 'sprite-sting-ray',
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `${this.depth}`
        }

        for (const attr in attributes) {
            stingrayImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(stingrayImage)
    }

    animate(framesCounter, stingrayID) {

        if (this.framesIndex === 1) {
            this.backwards = false
        } else if (this.framesIndex === this.stingrayFrames) {
            this.backwards = true
        }

        const stingrayImage = document.getElementById(stingrayID)

        if (framesCounter % 3 == 0 && this.backwards) {
            stingrayImage.src = `./images/scene1/sprites/${this.name}/${this.name}-${this.framesIndex--}.png`
        } else if (framesCounter % 3 == 0 && !this.backwards) {
            stingrayImage.src = `./images/scene1/sprites/${this.name}/${this.name}-${this.framesIndex++}.png`
        }
    }
}