import scene from './scene'

window.onload = () => {
    particlesJS.load('particles-js', 'assets/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });

    const startButton = document.querySelector('#start-button')
    startButton.addEventListener('click', () => {
        scene.updateSceneStatus()
    })

    scene.init()
}