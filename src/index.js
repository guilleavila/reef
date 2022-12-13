import scene from './scene'
import { getNode } from './utils/getNode';

window.onload = () => {
    particlesJS.load('particles-js', 'assets/particlesP1.json', function () {
        console.log('callback - particles.js config loaded');
    });
    particlesJS.load('particles-p2-js', 'assets/particlesP2.json', function () {
        console.log('callback - particles.js p2 config loaded');
    });

    const startButton = getNode('start-button')
    startButton.addEventListener('click', () => {
        scene.updateSceneStatus()
    })

    scene.scene1Init()
}