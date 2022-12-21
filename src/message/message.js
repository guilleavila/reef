import gsap from "gsap"
import { getNode } from "../utils/getNode"

export class Message {
    constructor(text, nodeID, messageID) {
        this.text = text
        this.nodeID = nodeID
        this.node = document.createElement('p')
        this.node.id = messageID
        this.node.innerText = text

        this.addToDOM()
    }

    addToDOM() {
        const messagesDiv = getNode(this.nodeID)
        messagesDiv.appendChild(this.node)
        this.showMessage()
    }

    showMessage() {
        gsap.to(`#${this.nodeID}`, { opacity: 1, duration: 1.5 })
    }

    hideMessage() {
        gsap.to(`#${this.nodeID}`, { opacity: 0, duration: 1.5, delay: 1, onComplete: () => this.node.remove() })
    }

    changeText(text){
        this.node.innerText = text
    }
} 