import { ShinyCoral, ShinyCoralP2, SpikedCoral, SpriteCoral } from "./corals/coral"

const scene1 = {
    p1Speed: 0.5,
    p2Speed: 0.3,
    framesCounter: 0,
    intervalId: undefined,
    stingRay: undefined,
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

        this.sceneLoop()

        document.addEventListener('mousemove', this.createDepth)
    },

    sceneLoop() {
        this.intervalId = setInterval(() => {
            this.framesCounter >= 600 ? this.framesCounter = 0 : this.framesCounter++
            this.spriteCorals.forEach(coral => coral.animate(this.framesCounter, coral.id))
        }, 1000 / 60)
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
        this.shinyCorals.push(new ShinyCoralP2(49, 7, 4, this.p2Speed, 'shiny-5', 'blue-2'))
        this.shinyCorals.push(new ShinyCoralP2(-7, 87, 6, this.p2Speed, 'shiny-6', 'blue-2'))

        this.shinyCorals.push(new ShinyCoral(42, 1, 5, this.p1Speed, 'shiny-1', 'pink'))
        this.shinyCorals.push(new ShinyCoral(30, 77, 5, this.p1Speed, 'shiny-2', 'green'))
        this.shinyCorals.push(new ShinyCoral(51, 7, 5, this.p1Speed, 'shiny-3', 'blue'))

    },

    createSpikedCorals() {
        this.spikedCorals.push(new SpikedCoral(85, 59, 10, this.p1Speed, 'spiked-1'))
    },

    createSpriteCorals() {

        // -- BLUE PINK CORAL --
        this.spriteCorals.push(new SpriteCoral(-4, 69, 12, this.p1Speed, 'blue-pink-coral-1', 13, 'p1', 'blue-pink-coral'))
        this.spriteCorals.push(new SpriteCoral(59, 53, 9, this.p2Speed, 'blue-pink-coral-2', 13, 'p2', 'blue-pink-coral'))

        // -- ORANGE HEART CORAL --
        this.spriteCorals.push(new SpriteCoral(-8, 88, 15, this.p1Speed, 'sprite-coral-1', 15, 'p1', 'orange-heart-coral'))
        this.spriteCorals.push(new SpriteCoral(71, 70, 13, this.p1Speed, 'sprite-coral-2', 15, 'p1', 'orange-heart-coral'))

        // -- WHITE CORAL --
        this.spriteCorals.push(new SpriteCoral(10, 54, 12, this.p1Speed, 'white-coral-1', 15, 'p1', 'white-coral'))
        this.spriteCorals.push(new SpriteCoral(75, 80, 15, this.p2Speed, 'white-coral-2', 15, 'p2', 'white-coral'))
    }
}

export default scene1