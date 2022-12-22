import gsap from "gsap"
import { getNode } from "../utils/getNode"

export class Message {
    constructor(text, divID, messageID) {
        this.text = text
        this.divID = divID
        this.node = document.createElement('p')
        this.node.id = messageID
        this.node.innerText = text

        this.addToDOM()
    }

    addToDOM() {
        const messagesDiv = getNode(this.divID)
        messagesDiv.appendChild(this.node)
        this.divID === 'messages' && this.showMessage()
    }

    showMessage() {
        gsap.to(`#${this.node.id}`, { opacity: 1, duration: 1.5 })
    }

    hideMessage() {
        gsap.to(`#${this.node.id}`, { opacity: 0, duration: 1.5, delay: 1, onComplete: () => this.node.remove() })
    }
} 