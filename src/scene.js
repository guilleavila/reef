import gsap from "gsap"
import { MotionPathPlugin } from "gsap/all"
import { ShinyCoral } from "./corals/shinyCoral"
import { SpriteElement } from "./element/element"
import { PathFish, PathStingray, StaticFish } from "./fish/fish"
import elements from './assets/scene1.json'

gsap.registerPlugin(MotionPathPlugin)

const scene = {
    sceneState: 1,
    framesCounter: 0,
    intervalId: undefined,
    stingray: undefined,
    fish: [],
    shinyCorals: [],
    spriteCorals: [],
    introState: 'none',
    swimState: 'none',

    init() {
        this.animateIntroScreen()
        this.createElements()
        // this.fishSwim()
        this.sceneLoop()
        this.addMouseMoveEvent()
    },

    addMouseMoveEvent() {
        document.addEventListener('mousemove', this.createDepth)
    },

    createElements() {
        this.createShinyCorals()
        this.createSpriteCorals()
        this.createStingray()
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

            // if (this.sceneState === 1) {
            //     this.swimState === 'on' && this.stingraySwim()
            // }
            // this.framesCounter % 80 === 0 && this.shinyCorals.forEach(coral => coral.animate())
        }, 1000 / 60)
    },

    showScene() {
        this.introState = 'done'
        scene.hideIntroScreen()
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

    createStingray() {
        const { posX, posY, width, height, speed, id, depth, type, name, totalFrames, animation, duration } = elements.stingray
        this.stingray = new PathStingray(posX, posY, width, height, speed, id, depth, type, name, totalFrames, animation, duration)
    },

    createFish() {
        elements.staticFish.forEach(elm => this.fish.push(new StaticFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation)))
        elements.pathFish.forEach(elm => this.fish.push(new PathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, elm.path, elm.duration, elm.delay)))
    },

    stingraySwim() {

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
        })
        gsap.from('.text-intro', {
            duration: 1,
            opacity: 0,
            delay: 2,
            onComplete: () => this.introState = 'on'
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
                visibility: 'hidden',
                zIndex: -80
            })
            gsap.to('.text-intro', {
                opacity: 0,
                duration: 1,
                onComplete: () => this.swimState = 'on'
            })
        }
    },

    hideTransitionScreen() {
        gsap.to('#intro-screen', {
            duration: 1,
            opacity: 0,
            zIndex: -100,
            delay: 1
        })
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

    updateSceneStatus() {

        gsap.to('#intro-screen', {
            duration: 0.5,
            opacity: 1,
            zIndex: 100,
            onComplete: () => this.emptyScene()
        })

        this.sceneState = 2
    },

    emptyScene() {
        // Delete DOM elements
        const scene1 = document.querySelector('#scene-1')
        document.body.removeChild(scene1)

        const planeElements = document.querySelectorAll('.plane')
        planeElements.forEach(elm => document.body.removeChild(elm))

        // Empty arrays
        this.spriteCorals = []
        this.shinyCorals = []
        this.fish = []

        this.scene2Init()
    },

    scene2Init() {
        const scene2 = document.getElementById('scene-2')
        scene2.style.visibility = 'visible'

        this.hideTransitionScreen()
    },

}

export default scene