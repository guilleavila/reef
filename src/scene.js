import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { MotionPathPlugin, ScrollToPlugin } from "gsap/all"

import elements from './assets/scene.json'
import { ShinyCoral } from "./corals/shinyCoral"
import { SpriteElement } from "./element/element"
import { BlowFish, PathFish, PathStingray, StaticFish, StraightPathFish } from "./fish/fish"
import { HoverCoral } from "./corals/hoverCoral"

gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

const scene = {
    sceneState: 1,
    framesCounter: 0,
    intervalId: undefined,
    stingray: undefined,
    blowFish: undefined,
    anemona: undefined,
    fish: [],
    shinyCorals: [],
    spriteCorals: [],
    hoverCorals: [],
    referenceSize: undefined,
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

    sceneLoop() {
        this.intervalId = setInterval(() => {
            this.framesCounter >= 600 ? this.framesCounter = 0 : this.framesCounter++

            if (this.introState === 'on') {
                document.addEventListener('mousemove', this.sceneState === 1 ? this.showScene : this.hideTransitionScreen)
            }

            // if (this.sceneState === 1) {
            //     this.swimState === 'on' && this.stingraySwim('stingray-path-1', 15, 90,0)
            //     if(this.swimState === 'stingray-path-1-done') {
            //         this.stingraySwim('stingray-path-2', 15, 90,0)
            //         this.hideLogo()
            //     } 
            // }

            if (this.sceneState === 2) {
                this.swimState === 'on' && this.stingraySwim('stingray-path-9', 15, 0, 0)
            }

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

        document.querySelectorAll('.depth-plane').forEach(plane => {
            const speed = plane.getAttribute('data-speed')

            const x = (window.innerWidth - e.pageX * speed) / 100
            const y = (window.innerHeight - e.pageY * speed) / 100

            const { width, height } = plane.getBoundingClientRect()
            plane.style.transform = `translateX(${x}px) translateY(-${(height / 100) + y}px)`
        });
    },

    getDivID(depth) {
        const divID = `${depth.toUpperCase()}-S${this.sceneState}`
        return divID
    },

    createShinyCorals(scene) {
        elements[scene].shinyCorals.forEach(elm => this.shinyCorals.push(
            new ShinyCoral(elm.posX, elm.posY, elm.width, elm.speed, elm.id, elm.sceneID, elm.depth, elm.type, elm.name, elm.color)
        ))
    },

    createSpriteCorals(scene) {
        const isCoral = scene === 'scene-2'
        elements[scene].spriteCorals.forEach(elm => this.spriteCorals.push(
            new SpriteElement(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.spriteCorals.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, this.getDivID(elm.depth), isCoral)
        ))
    },

    createStingray() {
        const { posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation } = elements.stingray
        this.stingray = new PathStingray(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, this.getDivID(depth))
    },

    createFish(scene) {
        elements[scene].staticFish.forEach(elm => this.fish.push(
            new StaticFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.fish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, this.getDivID(elm.depth))
        ))
        elements[scene].pathFish.forEach(elm => this.fish.push(
            new PathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.fish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, this.getDivID(elm.depth), elm.path, elm.duration, elm.delay)
        ))
        elements[scene].straightPathFish?.forEach(elm => this.fish.push(
            new StraightPathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.fish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.totalFrames, elm.animation, this.getDivID(elm.depth), elm.duration, elm.delay)
        ))
    },

    drawSpriteCorals() {
        this.spriteCorals.forEach(elm => elm.draw())
    },

    fishSwim() {
        this.fish.forEach(fish => fish.swim())
    },

    stingraySwim(path, duration, rotation, delay) {
        this.swimState = path
        this.stingray.swim(path, duration, rotation, delay)
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
                // visibility: 'hidden',
                zIndex: -80
            })
            gsap.to('.text-intro', {
                opacity: 0,
                duration: 1,
                delay: 0.25,
                onComplete: () => this.swimState = 'on'
            })
        }
    },

    hideTransitionScreen() {
        this.introState = 'done'
        gsap.to('#intro-screen', {
            duration: 1,
            opacity: 0,
            delay: 0.5
        })
        gsap.to('.text-intro', {
            duration: 1,
            opacity: 0,
            delay: 0.25
        })
    },

    hideLogo() {
        gsap.to('#r', {
            duration: 1,
            opacity: 0,
            delay: 8.2,
            onComplete: () => this.showButton()
        })
        gsap.to('#e1', {
            duration: 1,
            opacity: 0,
            delay: 7.8,
        })
        gsap.to('#e2', {
            duration: 1,
            opacity: 0,
            delay: 7.3,
        })
        gsap.to('#f', {
            duration: 1,
            opacity: 0,
            delay: 6.9,
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

        gsap.to('.text-intro', {
            duration: 1,
            opacity: 1,
            zIndex: 105
        })
        gsap.to('#intro-screen', {
            duration: 0.5,
            opacity: 1,
            zIndex: 100,
            onComplete: () => {
                this.sceneState = 2
                this.introState = 'on'
                this.swimState = 'on'
                this.emptyScene()
                this.scene2Init()
            }
        })

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
    },

    scene2Init() {
        this.showScene2()

        this.createS2Elements()
        this.fishSwim()
        this.addHoverCoralListener()
        this.addBlowFishClickEvent()
        this.createScrollTrigger()
    },

    showScene2() {
        const scene2 = document.getElementById('scene-2')
        scene2.style.visibility = 'visible'
    },

    createS2Elements() {
        this.createFish('scene-2')
        this.createSpriteCorals('scene-2')
        this.createHoverCorals('scene-2')
        this.createS2Stingray('scene-2')
        this.createBlowFish()
        this.createAnemona()
    },

    createHoverCorals(scene) {
        elements[scene].hoverCorals.forEach(elm => this.hoverCorals.push(
            new HoverCoral(elm.posX, elm.posY, elm.width, elm.speed, `${elm.name}-${this.hoverCorals.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name)
        ))
    },

    createS2Stingray(scene) {
        const { posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation } = elements[scene].stingray
        this.stingray = new PathStingray(posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, this.getDivID(depth))
    },

    createBlowFish() {
        const { posX, posY, width, height, speed, sceneID, depth, type, name, totalFrames, animation } = elements['scene-2'].blowFish
        this.blowFish = new BlowFish(posX, posY, width, height, speed, 'blowfFish-1', sceneID, depth, type, name, totalFrames, animation, this.getDivID(depth))
    },

    createAnemona() {
        const { posX, posY, width, height, speed, sceneID, depth, type, name, totalFrames, animation } = elements['scene-2'].anemona
        this.anemona = new SpriteElement(posX, posY, width, height, speed, 'anemona', sceneID, depth, type, name, totalFrames, animation, 'P1-2-S2', false)
    },

    addHoverCoralListener() {
        const hoverNodes = document.querySelectorAll('.hoverCoral')
        hoverNodes.forEach(elm => elm.addEventListener("mouseover", () => {
            this.hoverCorals.forEach(coral => {
                coral.id === elm.id && coral.animate()
            })
        }))
    },

    addBlowFishClickEvent() {
        const blowFishNode = document.getElementById(this.blowFish.id)
        blowFishNode.addEventListener('click', () => {
            !this.blowFish.hasPopped && this.blowFish.pop()
            gsap.to('#P1-depth', { zIndex: -80 })
        })
    },

    calculateReference() {
        const element = document.getElementById('BG-S2')
        return element.clientHeight - window.innerHeight
    },

    createScrollTrigger() {
        // S1-1 --> DOWN MOVEMENT
        let scene21TL = gsap.timeline()
        ScrollTrigger.create({
            animation: scene21TL,
            trigger: '.scrollElement',
            start: "top top",
            end: "25% 100%",
            scrub: 3,
            markers: true
        })

        // PLANES
        scene21TL.to('#BLURED-1', { bottom: '-1vh' }, 0)
        scene21TL.to('#P1-1', { bottom: '-3vh' }, 0)
        scene21TL.to('#P2-1', { bottom: '5vh' }, 0)
        scene21TL.to('#P3-1', { bottom: '10vh' }, 0)

        scene21TL.to('#BG-S2', { top: `-${this.calculateReference()}` }, 0)
        scene21TL.to('.depth-element', { top: `-${this.calculateReference()}` }, 0)

        // CORALS
        this.spriteCorals.forEach(elm => {
            elm.depth === 'p1' && scene21TL.to(`#${elm.id}`, { bottom: `${elm.position.y + 80}vh` }, 0)
            elm.depth === 'p2' && scene21TL.to(`#${elm.id}`, { bottom: `${elm.position.y + 65}vh` }, 0)
        })
        this.hoverCorals.forEach(elm => scene21TL.to(`#${elm.id}`, { bottom: `${elm.position.y + 80}vh` }, 0))

        // FISH
        this.fish.forEach(elm => {
            elm.depth === 'p1' && scene21TL.to(`#${elm.id}`, { bottom: `${elm.position.y + 80}vh` }, 0)
            elm.depth === 'p2' && scene21TL.to(`#${elm.id}`, { bottom: `${elm.position.y + 65}vh` }, 0)
        })
        scene21TL.to(`#${this.blowFish.id}`, { bottom: `${this.blowFish.position.y + 80}vh` }, 0)

        // STINGRAY
        scene21TL.to(`#${this.stingray.id}`, { bottom: `${this.stingray.position.y + 95}vh` }, 0)

        // PARTICLES
        scene21TL.to('#particles-js', { top: `-95vh` }, 0)
        scene21TL.to('#particles-p2-js', { top: `-75vh` }, 0)


        // S2-2 ---> RIGHT MOVEMENT
        let scene22TL = gsap.timeline()
        ScrollTrigger.create({
            animation: scene22TL,
            trigger: '.scrollElement',
            start: "25% bottom",
            end: "40% 100%",
            scrub: 3,
            markers: true
        })

        scene22TL.to('#BG-S2', { right: '0vw', scale: 1.8, transformOrigin: "100% 94%" }, 0)
        scene22TL.to('#BLURED-1', { right: '100vw', scale: 3.5, transformOrigin: "100% 80%" }, 0)
        scene22TL.to('#BLURED-2', { right: '-370vw' }, 0)

        scene22TL.to('#P1-S2', {
            right: '110vw', scale: 1.8, transformOrigin: "100% 94%",
            onComplete: () => gsap.to('#P1-depth', { zIndex: 110 })
        }, 0)
        scene22TL.to('#P2-S2', { right: '60vw', scale: 1.2, transformOrigin: "100% 90%" }, 0)
        scene22TL.to('#P3-1', { right: '7vw', scale: 1.05, transformOrigin: "100% 90%" }, 0)
        scene22TL.to('#particles-js', { left: '-120vw', scale: 2.2, transformOrigin: "100% 94%", opacity: 0 }, 0)


        // S2-3 ---> ZOOM IN
        let scene23TL = gsap.timeline()
        ScrollTrigger.create({
            animation: scene23TL,
            trigger: '.scrollElement',
            start: "40% bottom",
            end: "60% 100%",
            scrub: 3,
            markers: true
        })

        scene23TL.to('#BLURED-2', { right: '-373vw', scale: 6, transformOrigin: "0% 100%" }, 0)
        scene23TL.to('#P1-S2', { right: '210vw', bottom: '-12vh', scale: 4, transformOrigin: "100% 94%" }, 0)
        scene23TL.to('#P2-S2', { right: '70vw', scale: 1.5, transformOrigin: "100% 90%" }, 0)
        scene23TL.to('#P3-1', { right: '7.5vw', scale: 1.2, transformOrigin: "100% 90%" }, 0)


        // S2-4 ---> ZOOM OUT
        let scene24TL = gsap.timeline()
        ScrollTrigger.create({
            animation: scene24TL,
            trigger: '.scrollElement',
            start: "60% bottom",
            end: "80% 100%",
            scrub: 3,
            markers: true
        })

        scene24TL.to('#BLURED-2', { right: '-370vw', scale: 1.6, transformOrigin: "0% 100%" }, 0)
        scene24TL.to('#P1-S2', { right: '110vw', bottom: '0vh', scale: 1.8, transformOrigin: "100% 94%" }, 0)
        scene24TL.to('#P2-S2', { right: '60vw', scale: 1.2, transformOrigin: "100% 90%" }, 0)
        scene24TL.to('#P3-1', { right: '7vw', scale: 1.05, transformOrigin: "100% 90%" }, 0)


        // S2-5 ---> RIGHT MOVEMENT
        let scene25TL = gsap.timeline()
        ScrollTrigger.create({
            animation: scene25TL,
            trigger: '.scrollElement',
            start: "80% bottom",
            end: "100% 100%",
            scrub: 3,
            markers: true
        })

        scene25TL.to('#BLURED-2', { right: '-100vw', scale: 0.8, transformOrigin: "0% 100%", ease: 'none' }, 0)
            .to('#BLURED-2', {
                right: '270vw', scale: 1.5, transformOrigin: "0% 100%", ease: 'none', onStart: () => {
                    this.stingraySwim('stingray-path-10', 10, 0, 0)
                    this.changeBackGroundSrc()
                }
            })
        scene25TL.to('#BLURED-3', { right: '300vw' }, 0.3)
        scene25TL.to('#P1-S2', { right: '145vw', scale: 1, transformOrigin: "100% 94%" }, 0)
            .to('#P1-S2', { right: '180vw' }, 0.5)
        scene25TL.to('#P1-2-S2', { right: '235vw', scale: 1.01, duration: 1.1 }, 0)
        scene25TL.to('#P2-S2', { right: '100vw', scale: 1, transformOrigin: "100% 90%" }, 0)
        scene25TL.to('#P3-1', { right: '21vw', scale: 1, transformOrigin: "100% 90%" }, 0)
    },

    changeBackGroundSrc() {
        const bgNode = document.getElementById('BG-S2')
        bgNode.src = './images/scene-2/elements/BG-2.png'

        const d2Node = document.getElementById('D2')
        d2Node.src = './images/scene-2/elements/D2-2.png'

        const d3Node = document.getElementById('D2')
        d3Node.src = './images/scene-2/elements/D3-2.png'
    }

}

export default scene