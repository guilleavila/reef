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
    constructor(posX, posY, width, height, speed, id, depth, type, name, totalFrames, animation) {
        super(posX, posY, width, speed, id, depth, type, name)
        this.height = height
        this.totalFrames = totalFrames
        this.animation = animation
        this.draw()
    }

    draw() {
        const elementIcon = document.createElement('i')

        const attributes = {
            'id': this.id,
            'src': `./images/scene1/sprites/${this.type}/${this.name}/${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; 
                top: ${this.position.y}%; 
                left: ${this.position.x}%; 
                width: ${this.width}vw;
                height: ${this.height}vw;
                background: url(./images/scene1/sprites/${this.type}/${this.name}/${this.name}.png) no-repeat;
                background-size: ${this.width * this.totalFrames}vw ${this.height}vw;
                background-position: 0vw 0vw;
                animation: ${this.animation.name} ${this.animation.duration}s steps(${this.totalFrames}) alternate-reverse infinite;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementIcon.setAttribute(attr, attributes[attr])
        }

        document.body.appendChild(elementIcon)
    }
}