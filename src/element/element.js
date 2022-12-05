export class Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.speed = speed
        this.id = id
        this.sceneID = sceneID
        this.depth = depth
        this.type = type
        this.name = name
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/${this.sceneID}/sprites/${this.type}/${this.name}/${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; bottom: ${this.position.y}vh; right: ${this.position.x}vw; width: ${this.width}vw;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        const divNode = document.getElementById(this.sceneID)
        divNode.appendChild(elementImage)
    }
}


export class SpriteElement extends Element {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID, isCoral) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name)
        this.height = height
        this.totalFrames = totalFrames
        this.animation = animation
        this.isCoral = isCoral
        this.divID = divID
        this.draw()
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
                background-size: ${this.width * this.totalFrames}vw ${this.height}vw;
                background-position: 0vw 0vw;
                animation: ${this.animation.name} ${this.animation.duration}s steps(${this.totalFrames}) alternate-reverse infinite;`,
            'class': `plane ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementIcon.setAttribute(attr, attributes[attr])
        }

        const divNode = document.getElementById(this.divID)
        divNode.appendChild(elementIcon)
    }
}