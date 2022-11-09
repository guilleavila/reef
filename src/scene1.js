import { ShinyCoral, ShinyCoralP2, SpikedCoral, SpriteCoral } from "./corals/coral"

const scene1 = {
    p1Speed: 0.5,
    p2Speed: 0.3,
    shinyCorals: [],
    spikedCorals: [],
    spriteCorals: [],

    init() {
        this.createShinyCorals()
        this.shinyCorals.forEach(shinyCoral => shinyCoral.draw())

        this.createSpikedCorals()
        this.spikedCorals.forEach(spikedCoral => spikedCoral.draw())

        this.createSpriteCorals()
        this.spriteCorals.forEach(spriteCoral => spriteCoral.draw())

        document.addEventListener('mousemove', this.createDepth)
    },

    createDepth(e) {
        document.querySelectorAll('.plane').forEach(plane => {
            const speed = plane.getAttribute('data-speed')

            const x = (window.innerWidth - e.pageX * speed) / 100
            const y = (window.innerHeight - e.pageY * speed) / 100

            const { width, height } = plane.getBoundingClientRect()
            plane.style.transform = `translateX(${(width / 2) + x}px) translateY(-${(height / 2) + y}px)`
        });
    },

    createShinyCorals() {
        this.shinyCorals.push(new ShinyCoralP2(47, -1, 5, this.p2Speed, 'shiny-4', 'blue-2'))
        this.shinyCorals.push(new ShinyCoralP2(48, 8, 4, this.p2Speed, 'shiny-5', 'blue-2'))
        this.shinyCorals.push(new ShinyCoralP2(-7, 87, 6, this.p2Speed, 'shiny-6', 'blue-2'))

        this.shinyCorals.push(new ShinyCoral(42, 1, 5, this.p1Speed, 'shiny-1', 'pink'))
        this.shinyCorals.push(new ShinyCoral(30, 77, 5, this.p1Speed, 'shiny-2', 'green'))
        this.shinyCorals.push(new ShinyCoral(51, 7, 5, this.p1Speed, 'shiny-3', 'blue'))

    },

    createSpikedCorals() {
        this.spikedCorals.push(new SpikedCoral(85, 59, 10, this.p1Speed, 'spiked-1'))
    },

    createSpriteCorals() {
        this.spriteCorals.push(new SpriteCoral(7, 54, 15, this.p1Speed, 'sprite-coral-1', 15))
    }
}

export default scene1