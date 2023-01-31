import { getNode } from "../utils/getNode"

export class Element {
    constructor(posX, posY, width, speed, id, sceneID, depth, type, name, divID) {
        this.position = { x: posX, y: posY }
        this.width = width
        this.speed = speed
        this.id = id
        this.sceneID = sceneID
        this.depth = depth
        this.type = type
        this.name = name
        this.divID = divID
    }

    draw() {
        const elementImage = document.createElement('img')
        const attributes = {
            'id': this.id,
            'src': `./images/${this.sceneID}/elements/${this.type}/${this.name}.png`,
            'alt': `${this.name}`,
            'style': `position: fixed; bottom: ${this.position.y}vh; right: ${this.position.x}vw; width: ${this.width}vw;`,
            'class': `${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementImage.setAttribute(attr, attributes[attr])
        }

        const divNode = getNode(this.divID)
        divNode.appendChild(elementImage)
    }
}


export class SpriteElement extends Element {
    constructor(posX, posY, width, height, speed, id, sceneID, depth, type, name, divID, totalFrames, animation, isCoral) {
        super(posX, posY, width, speed, id, sceneID, depth, type, name, divID)
        this.height = height
        this.totalFrames = totalFrames
        this.animation = animation
        this.isCoral = isCoral
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
            'class': `${this.sceneID === 'scene-1' && 'plane'} ${this.depth}`,
            'data-speed': this.speed
        }

        for (const attr in attributes) {
            elementIcon.setAttribute(attr, attributes[attr])
        }

        const divNode = getNode(this.divID)
        if (this.id === 'stingray-4') {
            console.log('este es el divID --->', this.divID)
            console.log('este es el nodo --->', divNode)
        }
        divNode.appendChild(elementIcon)
    }
}