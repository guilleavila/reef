export class Element {
    constructor(posX, posY, width, speed, id, depth, type, name) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.speed = speed
        this.id = id
        this.depth = depth
        this.type = type
        this.name = name
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/${this.type}/${this.name}/${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(elementImage)
    }
}

export class SpriteElement extends Element {
    constructor(posX, posY, width, speed, id, depth, type, name, totalFrames) {
        super(posX, posY, width, speed, id, depth, type, name)
        this.totalFrames = totalFrames
        this.framesIndex = 1
        this.backwards = false

        this.draw()
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/${this.type}/${this.name}/${this.name}-${this.framesIndex}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; top: ${this.position.y}%; left: ${this.position.x}%; width: ${this.width}%;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(elementImage)
        this.animate()
    }

    animate(framesCounter, elementID) {

        if (this.framesIndex === 1) {
            this.backwards = false
        } else if (this.framesIndex === this.totalFrames) {
            this.backwards = true
        }

        const elementImage = document.getElementById(elementID)

        if (framesCounter % 3 == 0 && this.backwards) {
            elementImage.src = `./images/scene1/sprites/${this.type}/${this.name}/${this.name}-${this.framesIndex--}.png`
        } else if (framesCounter % 3 == 0 && !this.backwards) {
            elementImage.src = `./images/scene1/sprites/${this.type}/${this.name}/${this.name}-${this.framesIndex++}.png`
        }
    }
}