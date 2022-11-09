import ShinyCoral, { ShinyCoralP2 } from "./corals/shiny-coral"
import SpikedCoral from "./corals/spiked-coral"

const scene1 = {
    shinyCorals: [],
    spikedCorals: [],

    init() {
        this.createShinyCorals()
        this.shinyCorals.forEach(shinyCoral => shinyCoral.draw())

        this.createSpikedCorals()
        this.spikedCorals.forEach(spikedCoral => spikedCoral.draw())

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
        this.shinyCorals.push(new ShinyCoral(42, 1, 120, 'pink', 0.5, 'shiny-1'))
        this.shinyCorals.push(new ShinyCoral(30, 77, 105, 'green', 0.5, 'shiny-2'))
        this.shinyCorals.push(new ShinyCoral(51, 7, 105, 'blue', 0.5, 'shiny-3'))

        this.shinyCorals.push(new ShinyCoralP2(47, -1, 130, 'blue-2', 0.3, 'shiny-4'))
        this.shinyCorals.push(new ShinyCoralP2(48, 8, 80, 'blue-2', 0.3, 'shiny-5'))
        this.shinyCorals.push(new ShinyCoralP2(-7, 87, 150, 'blue-2', 0.3, 'shiny-6'))
    },

    createSpikedCorals() {
        this.spikedCorals.push(new SpikedCoral(85, 59, 250, 0, 1, 'spiked-1'))
    }
}

export default scene1