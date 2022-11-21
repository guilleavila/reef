import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { MotionPathPlugin, ScrollToPlugin } from "gsap/all"

import elements from './assets/scene.json'
import { ShinyCoral } from "./corals/shinyCoral"
import { SpriteElement } from "./element/element"
import { PathFish, PathStingray, StaticFish } from "./fish/fish"

gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

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
        this.resetScroll()
        this.animateIntroScreen()
        this.createElements('scene-1')
        // this.fishSwim()
        this.sceneLoop()
        this.addMouseMoveEvent()
    },

    addMouseMoveEvent() {
        document.addEventListener('mousemove', this.createDepth)
    },

    resetScroll() {
        ScrollTrigger.refresh()
        gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            overwrite: true,
            duration: 1,
            ease: 'expo.out'
        })
    },

    createElements(scene) {
        this.createShinyCorals(scene)
        this.createSpriteCorals(scene)
        this.createStingray()
        this.createFish(scene)
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

        document.querySelectorAll('.plane2').forEach(plane => {
            const speed = plane.getAttribute('data-speed')

            const x = (window.innerWidth - e.pageX * speed) / 100
            const y = (window.innerHeight - e.pageY * speed) / 100

            const { width, height } = plane.getBoundingClientRect()
            plane.style.transform = `translateX(${x}px) translateY(-${(height / 100) + y}px)`
        });
    },

    createShinyCorals(scene) {
        elements[scene].shinyCorals.forEach(elm => this.shinyCorals.push(
            new ShinyCoral(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.sceneID, elm.depth, elm.type, elm.name, elm.color)
        ))
    },

    createSpriteCorals(scene) {
        elements[scene].spriteCorals.forEach(elm => this.spriteCorals.push(
            new SpriteElement(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation)
        ))
    },

    createStingray() {
        const { posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, duration } = elements.stingray
        this.stingray = new PathStingray(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, duration)
    },

    createFish(scene) {
        elements[scene].staticFish.forEach(elm => this.fish.push(
            new StaticFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation)
        ))
        elements[scene].pathFish.forEach(elm => this.fish.push(
            new PathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, elm.id, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, elm.path, elm.duration, elm.delay)
        ))
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

        const planeElements = document.querySelectorAll('#scene-1 .plane')
        planeElements.forEach(elm => document.body.removeChild(elm))

        // Empty arrays
        this.spriteCorals = []
        this.shinyCorals = []
        this.fish = []

        this.scene2Init()
    },

    scene2Init() {
        this.showScene2()
        this.hideTransitionScreen()

        this.createS2Elements()
        console.log(this.fish)
        this.fishSwim()

        this.createScrollTrigger()
    },

    showScene2() {
        const scene2 = document.getElementById('scene-2')
        scene2.style.visibility = 'visible'
    },

    createS2Elements() {
        this.createFish('scene-2')
        this.createSpriteCorals('scene-2')
    },

    createScrollTrigger() {
        console.log('sos k pasa ahora')
        let scene2TL = gsap.timeline()
        ScrollTrigger.create({
            animation: scene2TL,
            trigger: '.scrollElement',
            start: "top top",
            end: "25% 100%",
            scrub: 3,
            markers: true
        })

        // SCENE2 ANIMATION
        scene2TL.to('#reef-0', { top: '-50%' }, 0)
        scene2TL.to('#reef-1', { top: '-50%' }, 0)
        scene2TL.to('#reef-2', { top: '-50%' }, 0)
        scene2TL.to('#reef-3', { top: '-50%' }, 0)

        // corals
        scene2TL.to('#blue-pink-coral-1', { top: '46%' }, 0)
        scene2TL.to('#blue-pink-coral-2', { top: '67%' }, 0)
        scene2TL.to('#orange-heart-coral-1', { top: '49%' }, 0)
        scene2TL.to('#white-coral-1', { top: '80%' }, 0)

        // fish
        scene2TL.to('#fish-blue-1', { top: '45%' }, 0)
        scene2TL.to('#fish-yellow-1', { top: '60%' }, 0)
        scene2TL.to('#fish-green-1', { top: '65%' }, 0)
        scene2TL.to('#fish-light-blue-1', { top: '27%' }, 0)
        scene2TL.to('#fish-red-1', { top: '37%' }, 0)


        scene2TL.to('.bg', { top: `${-59}%` }, 0)
        scene2TL.to('.depth-element', { top: `${-59}%` }, 0)
    }

}

export default scene