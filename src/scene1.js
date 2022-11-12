import gsap from "gsap"
import { MotionPathPlugin } from "gsap/all"
import { scene1PathFish, scene1ShinyCorals, scene1SpriteCorals, scene1StaticFish } from "./assets/scene1-assets"
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

    init() {

        this.animateIntroScreen()
        
        this.createElements()
        this.fishSwim()

        this.hideLogo()

        this.stingRaySwim()
        this.sceneLoop()

        document.addEventListener('mousemove', this.createDepth)
    },

    createElements() {
        this.createShinyCorals()
        this.createSpriteCorals()
        this.createStingrays()
        this.createFish()
    },

    fishSwim() {
        this.fish.forEach(fish => fish.swim())
    },

    sceneLoop() {
        this.intervalId = setInterval(() => {
            this.framesCounter >= 600 ? this.framesCounter = 0 : this.framesCounter++

            if (this.introState === 'on') {
                document.addEventListener('mousemove', this.prueba)
                // this.introState = 'done'
            }

            this.canStartSwimming && this.stingRaySwim()

            // -- ELEMENTS ANIMATIONS --
            this.spriteCorals.forEach(coral => coral.animate(this.framesCounter, coral.id))
            this.stingrays.forEach(stingray => stingray.animate(this.framesCounter, stingray.id))
            this.framesCounter % 80 === 0 && this.shinyCorals.forEach(coral => coral.animate())
            this.fish.forEach(fish => fish.animate(this.framesCounter, fish.id))
        }, 1000 / 60)
    },
    prueba() {
        this.introState = 'done'
        this.canStartSwimming = true
        scene1.hideIntroScreen()
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
        scene1ShinyCorals.forEach(elm => this.shinyCorals.push(new ShinyCoral(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.color)))
    },

    createSpriteCorals() {
        scene1SpriteCorals.forEach(elm => this.spriteCorals.push(new SpriteElement(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames)))
    },

    createStingrays() {
        this.stingrays.push(new PathStingray(0, 0, 25, this.p1Speed, 'stingray-1', 'p1', 'fish', 'stingray', 50, 15))
    },

    createFish() {
        scene1StaticFish.forEach(elm => this.fish.push(new StaticFish(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames)))
        scene1PathFish.forEach(elm => this.fish.push(new PathFish(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames, elm.path, elm.duration, elm.delay)))
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