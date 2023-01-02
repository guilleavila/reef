import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { MotionPathPlugin, ScrollToPlugin } from "gsap/all"

import elements from './assets/scene.json'
import { SpriteElement } from "./element/element"
import { BlowFish, Jellyfish, PathFish, PathStingray, StaticFish, StraightPathFish } from "./fish/fish"
import { HoverCoral } from "./corals/hoverCoral"
import { Message } from "./message/message"
import { Plastic } from "./plastic/plastic"

import { getNode } from "./utils/getNode"
import { toggleImage } from "./utils/toggleImage"

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
    referenceSize: undefined,
    message: undefined,
    storyMessages: [],
    fish: [],
    spriteCorals: [],
    hoverCorals: [],
    plastics: [],
    jellyfish: [],
    introState: 'none',
    swimState: 'none',
    TL3State: 'not created',
    TL4State: 'not created',
    bgAudio: new Audio('./sounds/bg-music.m4a'),

    scene1Init() {
        this.resetScroll()
        this.animateIntroScreen()
        this.createS1Elements('scene-1')
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

    createS1Elements(scene) {
        this.createSpriteCorals(scene)
        this.createStingray(scene)
        this.createFish(scene)
    },

    sceneLoop() {
        this.intervalId = setInterval(() => {
            this.framesCounter >= 600 ? this.framesCounter = 0 : this.framesCounter++

            if (this.introState === 'on') {
                document.addEventListener('mousemove', this.sceneState === 1 ? this.showIntroScene : this.hideTransitionScreen)
            }

            // if (this.sceneState === 1) {
            //     this.swimState === 'on' && this.stingraySwim('stingray-path-1', 15, 90, 0)
            //     if (this.swimState === 'stingray-path-1-done') {
            //         this.stingraySwim('stingray-path-2', 15, 90, 2)
            //         this.hideLogo()
            //     }
            // }

            if (this.sceneState === 2) {
                this.swimState === 'on' && this.stingraySwim('stingray-path-9', 15, 0, 0)
            }
        }, 1000 / 60)
    },

    showIntroScene() {
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

    createSpriteCorals(scene) {
        const isCoral = scene === 'scene-2'
        elements[scene].spriteCorals.forEach(elm => this.spriteCorals.push(
            new SpriteElement(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.spriteCorals.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID, elm.totalFrames, elm.animation, isCoral)
        ))
    },

    createStingray(scene) {
        const { posX, posY, width, height, speed, id, sceneID, depth, type, name, totalFrames, animation, divID } = elements[scene].stingray
        this.stingray = new PathStingray(posX, posY, width, height, speed, id, sceneID, depth, type, name, divID, totalFrames, animation)
    },

    createFish(scene) {
        elements[scene].staticFish?.forEach(elm => this.fish.push(
            new StaticFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.fish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID, elm.totalFrames, elm.animation)
        ))
        elements[scene].pathFish?.forEach(elm => this.fish.push(
            new PathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.fish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID, elm.totalFrames, elm.animation, elm.path, elm.duration, elm.delay)
        ))
        elements[scene].straightPathFish?.forEach(elm => this.fish.push(
            new StraightPathFish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.fish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID, elm.totalFrames, elm.animation, elm.duration, elm.delay)
        ))
    },

    createPlastics(scene) {
        elements[scene].plastics.forEach(elm => this.plastics.push(
            new Plastic(elm.posX, elm.posY, elm.width, elm.speed, `${elm.name}-${this.plastics.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID)
        ))
    },

    createJellyfish(scene) {
        elements[scene].jellyfish.forEach(elm => this.jellyfish.push(
            new Jellyfish(elm.posX, elm.posY, elm.width, elm.height, elm.speed, `${elm.name}-${this.jellyfish.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID, elm.totalFrames, elm.animation, elm.path, elm.duration, elm.delay)
        ))
    },

    drawSpriteCorals() {
        this.spriteCorals.forEach(elm => elm.draw())
    },

    fishSwim() {
        this.fish.forEach(fish => fish.swim())
    },

    jellyfishSwim() {
        this.jellyfish.forEach(jellyfish => jellyfish.swim())
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
                zIndex: -80,
                delay: 1
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
        gsap.to('#start-button', {
            visibility: 'visible',
            opacity: 0.8,
            duration: 1,
            delay: 1
        })
    },

    hideButton() {
        gsap.to('#start-button', { opacity: 0 })
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
                this.swimState = 'none'
                this.emptyScene()
                this.scene2Init()
            }
        })

    },

    emptyScene() {
        // Delete DOM elements
        const scene1 = getNode('scene-1')
        document.body.removeChild(scene1)

        const planeElements = document.querySelectorAll('#scene-1 .plane')
        planeElements.forEach(elm => document.body.removeChild(elm))

        // Empty arrays
        this.spriteCorals = []
        this.fish = []

        this.hideButton()
    },

    scene2Init() {
        this.showScene('scene-2')

        this.createS2Elements()
        this.fishSwim()
        this.addHoverCoralListener()
        this.createStoryMessages()
        this.createS2TL1()
        this.createS3TL1()
        this.playAudio()
    },

    playAudio() {
        this.bgAudio = new Audio('./sounds/bg-music.m4a')
        this.bgAudio.volume = 0.5
        this.bgAudio.play()
    },

    scrollButton(st) {
        const button = getNode('salto')
        button.addEventListener('click', () => {
            st.scroll(4800 - window.innerHeight)
        })
    },

    showScene(sceneID) {
        const sceneNode = getNode(sceneID)
        sceneNode.style.visibility = 'visible'
    },

    createS2Elements() {
        this.createAnemona()
        this.createSpriteCorals('scene-2')
        this.createFish('scene-2')
        this.createHoverCorals('scene-2')
        this.createStingray('scene-2')
        this.createBlowFish()
    },

    createHoverCorals(scene) {
        elements[scene].hoverCorals.forEach(elm => this.hoverCorals.push(
            new HoverCoral(elm.posX, elm.posY, elm.width, elm.speed, `${elm.name}-${this.hoverCorals.length + 1}`, elm.sceneID, elm.depth, elm.type, elm.name, elm.divID)
        ))
    },

    createBlowFish() {
        const { posX, posY, width, height, speed, sceneID, depth, type, name, totalFrames, animation, divID } = elements['scene-2'].blowFish
        this.blowFish = new BlowFish(posX, posY, width, height, speed, 'blowfFish-1', sceneID, depth, type, name, divID, totalFrames, animation)
    },

    createAnemona() {
        const { posX, posY, width, height, speed, sceneID, depth, type, name, totalFrames, animation, divID } = elements['scene-2'].anemona
        this.anemona = new SpriteElement(posX, posY, width, height, speed, 'anemona', sceneID, depth, type, name, divID, totalFrames, animation, false)
    },

    addHoverCoralListener() {
        const hoverNodes = document.querySelectorAll('#hoverCorals > img')
        hoverNodes.forEach(elm => elm.addEventListener('mouseover', () => {
            this.hoverCorals.forEach(coral => {
                coral.id === elm.id && coral.animate()
            })
            if (this.TL3State === 'not created') {
                this.TL3State = 'created'
                this.createS2TL3()
                this.message.hideMessage()
            }
        }))
    },

    addBlowFishClickEvent() {
        const blowFishNode = getNode(this.blowFish.id)
        blowFishNode.addEventListener('click', () => {
            if (!this.blowFish.hasPopped) {
                this.blowFish.pop()
                gsap.to('#P1-depth', { zIndex: -80 })
            }
            if (this.TL4State === 'not created') {
                this.TL4State = 'created'
                this.createS2TL4()
                this.message.hideMessage()
            }
        })
    },

    calculateReference() {
        const element = getNode('BG-S2')
        return element.clientHeight - window.innerHeight
    },

    createStoryMessages() {
        elements.storyMessages.forEach(elm => this.storyMessages.push(
            new Message(elm.message, elm.divID, elm.messageID)
        ))
    },

    createS2TL1() {

        // MESSAGES
        const scene2Messages = gsap.timeline()
        ScrollTrigger.create({
            animation: scene2Messages,
            trigger: '.scrollElement',
            start: 'top top',
            end: '10% 100%',
            scrub: 3,
            markers: true,
        })

        scene2Messages.to('#story-messages-1', { opacity: 1 }, 0)
        scene2Messages.to('#story-messages-1', { opacity: 0 }, 1)
        scene2Messages.to('#story-messages-2', { opacity: 1 }, 2)
        scene2Messages.to('#story-messages-2', { opacity: 0 }, 3)


        // -- DOWN MOVEMENT --
        const scene2TL1 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene2TL1,
            trigger: '.scrollElement',
            start: '10% bottom',
            end: '12.5% 100%',
            scrub: 3,
            markers: true,
        })

        scene2TL1.to('#BLURED-1', { bottom: '-1vh' }, 0)
        scene2TL1.to('#P1-S2', { scale: 1, bottom: '85vh' }, 0)
        scene2TL1.to('#P2-S2', { scale: 1, bottom: '65vh' }, 0)
        scene2TL1.to('#P3-1', { bottom: '10vh' }, 0)
        scene2TL1.to('#BG-S2', { top: `-${this.calculateReference()}` }, 0)
        scene2TL1.to('.depth-element', { top: `-${this.calculateReference()}` }, 0)
        scene2TL1.to('#particles-js', { top: `-95vh` }, 0)
        scene2TL1.to('#particles-p2-js', { top: `-75vh` }, 0)


        // -- RIGHT MOVEMENT --
        const scene2TL2 = gsap.timeline()
        const st = ScrollTrigger.create({
            animation: scene2TL2,
            trigger: '.scrollElement',
            start: '12.5% bottom',
            end: '20% 100%',
            scrub: 1.5,
            markers: true,
            onEnter: () => {
                this.scrollButton(st)
            }
        })

        scene2TL2.to('#BG-S2', { scale: 1.8, transformOrigin: '100% 94%' }, 0)
        scene2TL2.to('#BLURED-1', { right: '100vw', scale: 3.5, transformOrigin: '100% 80%' }, 0)
        scene2TL2.to('#BLURED-2', { right: '-370vw' }, 0)

        scene2TL2.to('#P1-S2', {
            right: '110vw', scale: 1.8, transformOrigin: '100% 178%',
            onComplete: () => {
                gsap.to('#P1-depth', { zIndex: 110 })
                this.message = new Message('Pasa por encima de los corales', 'messages', 'messages')
                // st.scroll(2400 - window.innerHeight)
            }
        }, 0)
        scene2TL2.to('#P2-S2', { right: '60vw', scale: 1.2, transformOrigin: '100% 155%' }, 0)
        scene2TL2.to('#P3-1', { right: '15vw', scale: 1.05, transformOrigin: '100% 90%' }, 0)
        scene2TL2.to('#particles-js', { left: '-120vw', scale: 2.2, transformOrigin: '100% 94%', opacity: 0 }, 0)
    },

    createS2TL3() {
        // -- ZOOM IN --
        const scene2TL3 = gsap.timeline()
        const st = ScrollTrigger.create({
            animation: scene2TL3,
            trigger: '.scrollElement',
            start: '20% bottom',
            end: '25% 100%',
            scrub: 1,
            markers: true
        })

        scene2TL3.to('#BLURED-2', {
            right: '-373vw', scale: 6, transformOrigin: '0% 100%', onComplete: () => {
                this.addBlowFishClickEvent()
                this.message = new Message('Haz click sobre el pez globo', 'messages', 'messages')
                // st.scroll(3000 - window.innerHeight)
            }
        }, 0)
        scene2TL3.to('#P1-S2', { right: '210vw', scale: 4, transformOrigin: '100% 178%' }, 0)
        scene2TL3.to('#P2-S2', { right: '70vw', scale: 1.5, transformOrigin: '100% 155%' }, 0)
        scene2TL3.to('#P3-1', { right: '17vw', scale: 1.2, transformOrigin: '100% 90%' }, 0)
    },

    createS2TL4() {
        // -- ZOOM OUT --
        const scene2TL4 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene2TL4,
            trigger: '.scrollElement',
            start: '25% bottom',
            end: '30% 100%',
            scrub: 3,
        })

        scene2TL4.to('#BLURED-2', { right: '-370vw', scale: 1.6, transformOrigin: '0% 100%' }, 0)
        scene2TL4.to('#P1-S2', { right: '110vw', scale: 1.8, transformOrigin: '100% 178%' }, 0)
        scene2TL4.to('#P2-S2', { right: '60vw', scale: 1.2, transformOrigin: '100% 155%' }, 0)
        scene2TL4.to('#P3-1', { right: '15vw', scale: 1.05, transformOrigin: '100% 90%' }, 0)
        scene2TL4.to('#particles-js', { left: '0vw' })


        // -- RIGHT MOVEMENT --
        const scene2TL5 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene2TL5,
            trigger: '.scrollElement',
            start: '30% bottom',
            end: '40% 100%',
            scrub: 3,
            onLeave: self => {
                self.kill(false, true)
                this.scene3Init()
            }
        })

        scene2TL5.to('#BLURED-2', { right: '-100vw', scale: 0.8, transformOrigin: '0% 100%', ease: 'none' }, 0)
            .to('#BLURED-2', {
                right: '70vw', scale: 1.2, transformOrigin: '100% 100%', ease: 'none', onStart: () => {
                    this.stingraySwim('stingray-path-10', 13, 0, 0)
                    toggleImage('BG-S2', 'BG-S3')
                    toggleImage('D2-S2', 'D2-S3')
                    toggleImage('D3-S2', 'D3-S3')
                }
            })
        scene2TL5.to('#BLURED-3', { right: '300vw' }, 0.3)
        scene2TL5.to('#P1-S2', { right: '200vw', scale: 1.3, transformOrigin: '100% 178%' }, 0)
            .to('#P1-S2', { right: '240vw', duration: 1.1 }, 0.5)
        scene2TL5.to('#P1-2-S2', { right: '235vw', scale: 1.01, duration: 1 }, 0)
        scene2TL5.to('#P2-S2', { right: '140vw', scale: 1, transformOrigin: '100% 155%', duration: 1 }, 0)
        scene2TL5.to('#P2-2', { right: '55vw', scale: 1.01, duration: 1 }, 0)
        scene2TL5.to('#P3-1', { right: '70vw', scale: 1, transformOrigin: '100% 90%', duration: 1 }, 0)
        scene2TL5.to('#particles-js', { left: '-50vw', scale: 1, transformOrigin: '0% 40%', opacity: 1, duration: 1.1 }, 0)
    },

    createS3TL1() {
        // -- DOWN MOVEMENT --
        const scene3TL1 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene3TL1,
            trigger: '.scrollElement',
            start: '40% bottom',
            end: '55% 100%',
            scrub: 3,
            markers: true,
        })

        scene3TL1.to('.water-S3', { top: '-100vh' }, 0)
        scene3TL1.to('.sun-rays', { top: '-50vh' }, 0)
        scene3TL1.to('#particles-js', { top: '-195vh' }, 0)
        scene3TL1.to('#particles-p2-js', { top: '-125vh' }, 0)

        scene3TL1.to('#BLURED-2', { bottom: '250vh' }, 0)
        scene3TL1.to('#P1-S2', { bottom: '240vh' }, 0)
        scene3TL1.to('#P2-S2', { bottom: '210vh' }, 0)
        scene3TL1.to('#P1-2-S2', { bottom: '200vh' }, 0)
        scene3TL1.to('#P2-2', { bottom: '100vh' }, 0)
        scene3TL1.to('#P3-1', { bottom: '150vh', opacity: 0 }, 0)

        scene3TL1.to('#P1-S3', { bottom: '175vh', scale: 1 }, 0)
        scene3TL1.to('#P2-S3', { bottom: '100vh', scale: 1 }, 0)
        scene3TL1.to('#P3-S3', { bottom: '70vh', scale: 1 }, 0)

        // -- DOWN MOVEMENT --> LIGHT FISH --
        const scene3TL2 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene3TL2,
            trigger: '.scrollElement',
            start: '55% bottom',
            end: '70% 100%',
            scrub: 3,
            markers: true,
            onEnter: () => this.stingraySwim('stingray-path-11', 12, 180, 0)
        })

        scene3TL2.to('.water-S3', { top: '-250vh' }, 0)
        scene3TL2.to('.sun-rays', { top: '-100vh' }, 0)
        scene3TL2.to('#particles-js', { top: '-295vh', opacity: 0.5 }, 0)
        scene3TL2.to('#particles-p2-js', { top: '-175vh', opacity: 0.25 }, 0)

        scene3TL2.to('#P1-S3', { bottom: '325vh', scale: 1 }, 0)
        scene3TL2.to('#P2-S3', { bottom: '200vh', scale: 1 }, 0)
        scene3TL2.to('#P3-S3', { bottom: '125vh', scale: 1 }, 0)

        // -- DOWN MOVEMENT --> TEXT --
        const scene3TL3 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene3TL3,
            trigger: '.scrollElement',
            start: '70% bottom',
            end: '80% 100%',
            scrub: 3,
            markers: true
        })

        scene3TL3.to('.water-S3', { top: '-350vh' }, 0)
        scene3TL3.to('#particles-js', { top: '-395vh', opacity: 1 }, 0)
        scene3TL3.to('#particles-p2-js', { top: '-225vh', opacity: 0.85 }, 0)

        scene3TL3.to('#P1-S3', { bottom: '475vh', scale: 1 }, 0)
        scene3TL3.to('#P2-S3', { bottom: '330vh', scale: 1 }, 0)
        scene3TL3.to('#P3-S3', { bottom: '220vh', scale: 1 }, 0)

        // -- TEXT --
        const scene3Messages = gsap.timeline()
        ScrollTrigger.create({
            animation: scene3Messages,
            trigger: '.scrollElement',
            start: '80% bottom',
            end: '90% 100%',
            scrub: 3,
            markers: true,
        })

        scene3Messages.to('#story-messages-3', { opacity: 1 }, 0)
        scene3Messages.to('#story-messages-3', { opacity: 0 }, 1)
        scene3Messages.to('#story-messages-4', { opacity: 1 }, 2)
        scene3Messages.to('#story-messages-4', { opacity: 0 }, 3)
        scene3Messages.to('#story-messages-5', { opacity: 1 }, 4)
        scene3Messages.to('#story-messages-5', { opacity: 0 }, 5)

        // -- DOWN MOVEMENT --> CITY --
        const scene3TL4 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene3TL4,
            trigger: '.scrollElement',
            start: '90% bottom',
            end: '100% 100%',
            scrub: 3,
            markers: true,
            onEnter: () => {
                this.stingray = new PathStingray(0, 0, 25, 12.5, 0.5, 'stingray-4', 'scene-3', 'p2', 'fish', 'stingray', 50, { name: 'sFrontStingrayAnimate', duration: 3 }, 'P2-S3')
                this.stingraySwim('stingray-path-9', 15, 0, 3)
            }
        })

        scene3TL4.to('.water-S3', { top: '-460vh' }, 0)
        scene3TL4.to('#particles-js', { top: '-455vh', opacity: 1 }, 0)
        scene3TL4.to('#particles-p2-js', { top: '-245vh', opacity: 0.85 }, 0)
        scene3TL4.to('#P1-S3', { top: '-570vh', scale: 0.85, transformOrigin: '50% 50%' }, 0)
        scene3TL4.to('#P2-S3', { top: '-405vh', scale: 0.9, transformOrigin: '50% 50%' }, 0)
        scene3TL4.to('#P3-S3', { top: '-275vh', scale: 0.95, transformOrigin: '50% 50%' }, 0)

        scene3TL4.fromTo('#CITY', { scale: 1.3 }, { top: '0vh', scale: 1 }, 0)
        scene3TL4.fromTo('#P2-CORAL', { scale: 1.7 }, { top: '0vh', scale: 1 }, 0)
        scene3TL4.fromTo('#P1-CORAL', { scale: 2.2 }, { top: '0vh', scale: 1 }, 0)
        scene3TL4.fromTo('#BLURED-CORAL', { scale: 3 }, { top: '0vh', scale: 1 }, 0)
    },

    createS3TL2() {
        const scene3TL2 = gsap.timeline()
        ScrollTrigger.create({
            animation: scene3TL2,
            trigger: '.scrollElement',
            start: '55% bottom',
            end: '70% 100%',
            scrub: 3,
            markers: true
        })

        scene3TL2.to('.water-S3', { top: '-250vh' }, 0)
        scene3TL2.to('.sun-rays', { top: '-100vh' }, 0)
        scene3TL2.to('#particles-js', { top: '-295vh', opacity: 0.5 }, 0)
        scene3TL2.to('#particles-p2-js', { top: '-175vh', opacity: 0.25 }, 0)

        scene3TL2.to('#P1-S3', { bottom: '325vh', scale: 1 }, 0)
        scene3TL2.to('#P2-S3', { bottom: '200vh', scale: 1 }, 0)
        scene3TL2.to('#P3-S3', { bottom: '110vh', scale: 1 }, 0)
    },

    scene3Init() {
        this.showScene('scene-3')
        this.createS3Elements()
        this.fishSwim()
        this.jellyfishSwim()
        this.animatePlastics()
    },

    createS3Elements() {
        this.createPlastics('scene-3')
        this.createJellyfish('scene-3')
        this.createFish('scene-3')
        this.createStingray('scene-3')
    },

    animatePlastics() {
        this.plastics.forEach(elm => elm.animate())
    }
}

export default scene