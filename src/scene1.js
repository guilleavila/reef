import gsap from "gsap"
import { MotionPathPlugin } from "gsap/all"
import { ShinyCoral } from "./corals/shinyCoral"
import { SpriteElement } from "./element/element"
import { PathFish, PathStingray, StaticFish } from "./fish/fish"
import elements from './assets/scene1.json'

gsap.registerPlugin(MotionPathPlugin)

const scene1 = {
    framesCounter: 0,
    intervalId: undefined,
    stingrays: [],
    fish: [],
    shinyCorals: [],
    spriteCorals: [],
    introState: 'none',
    swimState: 'none',

    init() {
        this.animateIntroScreen()
        this.createElements()
        this.fishSwim()
        this.sceneLoop()
        this.addMouseMoveEvent()
    },

    addMouseMoveEvent() {
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
                document.addEventListener('mousemove', this.showScene)
            }

            this.swimState === 'on' && this.stingRaySwim()

            this.framesCounter % 80 === 0 && this.shinyCorals.forEach(coral => coral.animate())
        }, 1000 / 60)
    },

    showScene() {
        this.introState = 'done'
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
        elements.shinyCorals.forEach(elm => this.shinyCorals.push(new ShinyCoral(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.color)))
    },

    createSpriteCorals() {
        elements.spriteCorals.forEach(elm => this.spriteCorals.push(new SpriteElement(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation)))
    },

    createStingrays() {
        const { posX, posY, width, height, speed, id, depth, type, name, totalFrames, animation, duration } = elements.stingray
        this.stingrays.push(new PathStingray(posX, posY, width, height, speed, id, depth, type, name, totalFrames, animation, duration))
    },

    createFish() {
        elements.staticFish.forEach(elm => this.fish.push(new StaticFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation)))
        elements.pathFish.forEach(elm => this.fish.push(new PathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, elm.path, elm.duration, elm.delay)))
    },

    stingRaySwim() {

        this.swimState = 'done'

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
                onStart: () => this.hideLogo(),
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
        if (this.swimState === 'none') {
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
                duration: 1,
                onComplete: () => this.swimState = 'on'
            })
        }
    },

    hideLogo() {
        gsap.to('#r', {
            duration: 1,
            opacity: 0,
            delay: 7.2,
            onComplete: () => this.showButton()
        })
        gsap.to('#e1', {
            duration: 1,
            opacity: 0,
            delay: 6.8,
        })
        gsap.to('#e2', {
            duration: 1,
            opacity: 0,
            delay: 6.3,
        })
        gsap.to('#f', {
            duration: 1,
            opacity: 0,
            delay: 5.9,
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