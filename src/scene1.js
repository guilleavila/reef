import gsap, { wrapYoyo } from "gsap"
import { CustomEase, MotionPathPlugin } from "gsap/all"
import { ShinyCoral, ShinyCoralP2, SpikedCoral, SpriteCoral } from "./corals/coral"
import { Stingray } from "./stingray/stingray"

gsap.registerPlugin(MotionPathPlugin)

const scene1 = {
    p1Speed: 0.5,
    p2Speed: 0.3,
    framesCounter: 0,
    intervalId: undefined,
    stingrays: [],
    shinyCorals: [],
    spikedCorals: [],
    spriteCorals: [],

    init() {

        this.createSpikedCorals()
        this.spikedCorals.forEach(spikedCoral => spikedCoral.draw())

        this.createShinyCorals()
        this.shinyCorals.forEach(shinyCoral => shinyCoral.draw())

        this.createSpriteCorals()
        this.spriteCorals.forEach(spriteCoral => spriteCoral.draw())

        this.createStingrays()
        this.stingrays.forEach(stingray => stingray.draw())

        this.sceneLoop()
        this.stingRaySwim()

        document.addEventListener('mousemove', this.createDepth)
    },

    sceneLoop() {
        this.intervalId = setInterval(() => {
            this.framesCounter >= 600 ? this.framesCounter = 0 : this.framesCounter++
            this.spriteCorals.forEach(coral => coral.animate(this.framesCounter, coral.id))
            this.stingrays.forEach(stingray => stingray.animate(this.framesCounter, stingray.id))
            this.framesCounter % 80 === 0 && this.shinyCorals.forEach(coral => coral.animate())
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

        // UP
        this.shinyCorals.push(new ShinyCoral(45, 1, 3, this.p1Speed, 'shiny-1', 'p3', 'pink'))
        this.shinyCorals.push(new ShinyCoral(42, 1, 5, this.p1Speed, 'shiny-2', 'p2', 'pink'))
        this.shinyCorals.push(new ShinyCoral(47, -1, 5.5, this.p2Speed, 'shiny-3', 'p2', 'blue'))
        this.shinyCorals.push(new ShinyCoral(49, 7, 4, this.p2Speed, 'shiny-4', 'p2', 'blue'))
        this.shinyCorals.push(new ShinyCoral(51, 7, 5, this.p1Speed, 'shiny-5', 'p1', 'blue'))

        // -- NEXT TO WHITE CORAL --
        this.shinyCorals.push(new ShinyCoral(23, 57, 3.7, this.p1Speed, 'shiny-6', 'p1', 'green'))
        this.shinyCorals.push(new ShinyCoral(24, 51, 3.4, this.p2Speed, 'shiny-7', 'p2', 'blue'))
        this.shinyCorals.push(new ShinyCoral(21, 52, 4.2, this.p1Speed, 'shiny-8', 'p2', 'pink'))
        this.shinyCorals.push(new ShinyCoral(20, 47, 5.4, this.p2Speed, 'shiny-9', 'p3', 'blue'))


        // -- DOWN --
        this.shinyCorals.push(new ShinyCoral(31, 70, 3.6, this.p2Speed, 'shiny-10', 'p3', 'blue'))
        this.shinyCorals.push(new ShinyCoral(30, 84, 3.4, this.p1Speed, 'shiny-11', 'p3', 'pink'))
        this.shinyCorals.push(new ShinyCoral(30, 79, 3, this.p1Speed, 'shiny-12', 'p2', 'green'))
        this.shinyCorals.push(new ShinyCoral(32, 73, 4, this.p2Speed, 'shiny-13', 'p2', 'blue'))
        this.shinyCorals.push(new ShinyCoral(31, 72, 2.5, this.p1Speed, 'shiny-14', 'p2', 'pink'))
        this.shinyCorals.push(new ShinyCoral(34, 79, 4.3, this.p2Speed, 'shiny-15', 'p2', 'blue'))
        this.shinyCorals.push(new ShinyCoral(30, 77, 5, this.p1Speed, 'shiny-16', 'p1', 'green'))

        // -- OTHERS --
        this.shinyCorals.push(new ShinyCoral(14, 83, 3, this.p2Speed, 'shiny-17', 'p3', 'blue'))
        this.shinyCorals.push(new ShinyCoral(-5, 82, 6, this.p2Speed, 'shiny-18', 'p2', 'blue'))

    },

    createSpikedCorals() {
        this.spikedCorals.push(new SpikedCoral(85, 59, 10, this.p1Speed, 'spiked-1', 'p1'))
    },

    createSpriteCorals() {

        // -- BLUE PINK CORAL --
        this.spriteCorals.push(new SpriteCoral(-4, 69, 12, this.p1Speed, 'blue-pink-coral-1', 'p1', 13, 'blue-pink-coral'))
        this.spriteCorals.push(new SpriteCoral(59, 53, 9, this.p2Speed, 'blue-pink-coral-2', 'p2', 13, 'blue-pink-coral'))

        // -- ORANGE HEART CORAL --
        this.spriteCorals.push(new SpriteCoral(-8, 88, 15, this.p1Speed, 'sprite-coral-1', 'p1', 15, 'orange-heart-coral'))
        this.spriteCorals.push(new SpriteCoral(71, 70, 13, this.p1Speed, 'sprite-coral-2', 'p1', 15, 'orange-heart-coral'))

        // -- WHITE CORAL --
        this.spriteCorals.push(new SpriteCoral(10, 54, 12, this.p1Speed, 'white-coral-1', 'p1', 15, 'white-coral'))
        this.spriteCorals.push(new SpriteCoral(75, 80, 15, this.p2Speed, 'white-coral-2', 'p2', 15, 'white-coral'))
    },

    createStingrays() {
        this.stingrays.push(new Stingray(0, 0, 25, 'stingray-1', 50, 'p1', 'stingray'))
    },

    stingRaySwim() {

        gsap.timeline()
            .to('#stingray-1', {
                duration: 15,
                motionPath: {
                    path: "#path-1",
                    align: "#path-1",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90
                },
                ease: "linear"
            })
            .to('#stingray-1', {
                duration: 15,
                motionPath: {
                    path: "#path-2",
                    align: "#path-2",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90
                },
                ease: "linear",
                delay: 2
            })
    },
}

export default scene1