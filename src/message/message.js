import gsap from "gsap"
import { getNode } from "../utils/getNode"

export class Message {
    constructor(text) {
        this.text = text
        this.node = document.createElement('p')
        this.node.innerText = text

        this.addToDOM()
    }

    addToDOM() {
        const messagesDiv = getNode('messages')
        messagesDiv.appendChild(this.node)
        this.showMessage()
    }

    showMessage() {
        gsap.to('#messages', { opacity: 1, duration: 1.5 })
    }

    hideMessage() {
        gsap.to('#messages', { opacity: 0, duration: 1.5, delay: 1 })

        setTimeout(() => {
            this.node.remove()
        }, 2500)
    }
}