import gsap from "gsap"
import { MotionPathPlugin } from "gsap/all"
import { ShinyCoral } from "./corals/shinyCoral"
import { SpriteElement } from "./element/element"
import { PathFish, PathStingray, StaticFish } from "./fish/fish"

gsap.registerPlugin(MotionPathPlugin)

const scene1 = {
    p1Speed: 0.5,
    p2Speed: 0.3,
    framesCounter: 0,
    intervalId: undefined,
    stingrays: [],
    fish: [],
    shinyCorals: [],
    spriteCorals: [],
    introState: 'none',
    state: 'undone',

    init() {

        this.animateIntroScreen()

        this.createShinyCorals()
        this.shinyCorals.forEach(shinyCoral => shinyCoral.draw())

        this.createSpriteCorals()
        this.spriteCorals.forEach(spriteCoral => spriteCoral.draw())

        this.createStingrays()
        this.stingrays.forEach(stingray => stingray.draw())

        this.createFish()
        this.fish.forEach(fish => {
            fish.draw()
            fish.swim()
        })
        this.hideLogo()

        this.stingRaySwim()
        this.sceneLoop()

        document.addEventListener('mousemove', this.createDepth)
    },

    sceneLoop() {
        this.intervalId = setInterval(() => {
            this.framesCounter >= 600 ? this.framesCounter = 0 : this.framesCounter++

            if (this.introState === 'on') {
                document.addEventListener('mousemove', this.hideIntroScreen)
                this.introState = 'done'
            }

            // -- ELEMENTS ANIMATIONS --
            this.spriteCorals.forEach(coral => coral.animate(this.framesCounter, coral.id))
            this.stingrays.forEach(stingray => stingray.animate(this.framesCounter, stingray.id))
            this.framesCounter % 80 === 0 && this.shinyCorals.forEach(coral => coral.animate())
            this.fish.forEach(fish => fish.animate(this.framesCounter, fish.id))
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
        this.shinyCorals.push(new ShinyCoral(50, 2, 3, this.p1Speed, 'shiny-1', 'p3', 'coral', 'shiny-coral', 'pink'))
        this.shinyCorals.push(new ShinyCoral(45, 1, 5, this.p1Speed, 'shiny-2', 'p2', 'coral', 'shiny-coral', 'pink'))
        this.shinyCorals.push(new ShinyCoral(50, -1, 5.5, this.p2Speed, 'shiny-3', 'p2', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(52, 7, 4, this.p2Speed, 'shiny-4', 'p2', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(54, 7, 5, this.p1Speed, 'shiny-5', 'p1', 'coral', 'shiny-coral', 'blue'))

        // -- NEXT TO WHITE CORAL --
        this.shinyCorals.push(new ShinyCoral(26, 57, 3.7, this.p1Speed, 'shiny-6', 'p1', 'coral', 'shiny-coral', 'green'))
        this.shinyCorals.push(new ShinyCoral(27, 51, 3.4, this.p2Speed, 'shiny-7', 'p2', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(24, 52, 4.2, this.p1Speed, 'shiny-8', 'p2', 'coral', 'shiny-coral', 'pink'))
        this.shinyCorals.push(new ShinyCoral(23, 47, 5.4, this.p2Speed, 'shiny-9', 'p3', 'coral', 'shiny-coral', 'blue'))


        // -- DOWN --
        this.shinyCorals.push(new ShinyCoral(33, 70, 3.6, this.p2Speed, 'shiny-10', 'p3', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(32, 84, 3.4, this.p1Speed, 'shiny-11', 'p3', 'coral', 'shiny-coral', 'pink'))
        this.shinyCorals.push(new ShinyCoral(32, 79, 3, this.p1Speed, 'shiny-12', 'p2', 'coral', 'shiny-coral', 'green'))
        this.shinyCorals.push(new ShinyCoral(34, 73, 4, this.p2Speed, 'shiny-13', 'p2', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(33, 72, 2.5, this.p1Speed, 'shiny-14', 'p2', 'coral', 'shiny-coral', 'pink'))
        this.shinyCorals.push(new ShinyCoral(36, 79, 4.3, this.p2Speed, 'shiny-15', 'p2', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(32, 77, 5, this.p1Speed, 'shiny-16', 'p1', 'coral', 'shiny-coral', 'green'))

        // -- OTHERS --
        this.shinyCorals.push(new ShinyCoral(16, 83, 3, this.p2Speed, 'shiny-17', 'p3', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(-5, 84, 6, this.p2Speed, 'shiny-18', 'p3', 'coral', 'shiny-coral', 'blue'))
        this.shinyCorals.push(new ShinyCoral(-5, 74, 4, this.p2Speed, 'shiny-19', 'p3', 'coral', 'shiny-coral', 'blue'))

    },

    createSpriteCorals() {

        // -- BLUE PINK CORAL --
        this.spriteCorals.push(new SpriteElement(-1, 69, 12, this.p1Speed, 'blue-pink-coral-1', 'p1', 'coral', 'blue-pink-coral', 13))
        this.spriteCorals.push(new SpriteElement(61, 53, 9, this.p2Speed, 'blue-pink-coral-2', 'p2', 'coral', 'blue-pink-coral', 13))

        // -- ORANGE HEART CORAL --
        this.spriteCorals.push(new SpriteElement(-6, 88, 15, this.p1Speed, 'sprite-coral-1', 'p1', 'coral', 'orange-heart-coral', 15))
        this.spriteCorals.push(new SpriteElement(74, 70, 13, this.p1Speed, 'sprite-coral-2', 'p1', 'coral', 'orange-heart-coral', 15))

        // -- WHITE CORAL --
        this.spriteCorals.push(new SpriteElement(12, 54, 12, this.p1Speed, 'white-coral-1', 'p1', 'coral', 'white-coral', 15))
        this.spriteCorals.push(new SpriteElement(78, 80, 15, this.p2Speed, 'white-coral-2', 'p2', 'coral', 'white-coral', 15))
    },

    createStingrays() {
        this.stingrays.push(new PathStingray(0, 0, 25, this.p1Speed, 'stingray-1', 'p1', 'fish', 'stingray', 50, 15))
    },

    createFish() {
        this.fish.push(new StaticFish(63, 50, 4, this.p2Speed, 'fish-orange-1', 'p3', 'fish', 'orange', 15))
        this.fish.push(new StaticFish(29, 68, 4.5, this.p2Speed, 'fish-green-1', 'p2', 'fish', 'green', 15))

        // -- VERTICAL --
        this.fish.push(new PathFish(0, 0, 4.1, this.p2Speed, 'fish-green-2', 'p2', 'fish', 'green', 15, 'path-3', 35, 0))
        this.fish.push(new PathFish(0, 0, 3, this.p2Speed, 'fish-red-1', 'p2', 'fish', 'red', 15, 'path-3', 35, 2))
        this.fish.push(new PathFish(0, 0, 3.5, this.p2Speed, 'fish-red-2', 'p1', 'fish', 'pink', 15, 'path-4', 35, 2))

        // -- HORIZONTAL --
        this.fish.push(new PathFish(0, 0, 4.5, this.p2Speed, 'fish-orange-3', 'p1', 'fish', 'red', 15, 'path-5', 35, 0))
        this.fish.push(new PathFish(0, 0, 2, this.p2Speed, 'fish-red-3', 'p3', 'fish', 'pink', 15, 'path-5', 35, 0.5))

        this.fish.push(new PathFish(0, 0, 4.1, this.p2Speed, 'fish-green-3', 'p2', 'fish', 'green', 15, 'path-6', 35, 14))
        this.fish.push(new PathFish(0, 0, 5.5, this.p2Speed, 'fish-purple-q', 'p2', 'fish', 'purple', 15, 'path-6', 35, 2))


    },

    stingRaySwim() {
        console.log('nadando')
        gsap.timeline()
            .to('#stingray-1', {
                duration: 15,
                motionPath: {
                    path: "#stingray-path-1",
                    align: "#stingray-path-1",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90
                },
                ease: "linear"
            })
            .to('#stingray-1', {
                duration: 15,
                motionPath: {
                    path: "#stingray-path-2",
                    align: "#stingray-path-2",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90
                },
                ease: "linear"
            })
    },

    animateIntroScreen() {
        gsap.from('#r', {
            duration: 1,
            opacity: 0,
            top: '80%',
            ease: "back.out(1.7)",
            delay: 0.5
        })
        gsap.from('#e1', {
            duration: 1,
            opacity: 0,
            top: '80%',
            ease: "back.out(1.7)",
            delay: 0.6
        })
        gsap.from('#e2', {
            duration: 1,
            opacity: 0,
            top: '80%',
            ease: "back.out(1.7)",
            delay: 0.7
        })
        gsap.from('#f', {
            duration: 1,
            opacity: 0,
            top: '80%',
            ease: "back.out(1.7)",
            delay: 0.8,
            onComplete: () => this.introState = 'on'
        })
        gsap.from('.text-intro', {
            duration: 1,
            opacity: 0,
            delay: 2
        })
    },

    hideIntroScreen() {
        gsap.to('#intro-screen', {
            duration: 1,
            opacity: 0,
            zIndex: -100,
            delay: 0.5
        })
        gsap.to('.logo-intro', {
            zIndex: -80
        })
        gsap.to('.text-intro', {
            opacity: 0,
            duration: 1
        })
    },

    hideLogo() {
        gsap.to('#r', {
            duration: 1,
            opacity: 0,
            delay: 21.9,
            onComplete: () => this.showButton()
        })
        gsap.to('#e1', {
            duration: 1,
            opacity: 0,
            delay: 21.6,
        })
        gsap.to('#e2', {
            duration: 1,
            opacity: 0,
            delay: 20.8,
        })
        gsap.to('#f', {
            duration: 1,
            opacity: 0,
            delay: 20.5,
        })
    },

    showButton() {
        gsap.fromTo('#start-button', { scale: 0.7 }, {
            visibility: 'visible',
            scale: 1,
            opacity: 0.8,
            duration: 0.5,
            delay: 1
        })
    },
}

export default scene1