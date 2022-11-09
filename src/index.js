import './styles.css'

const createDepth = (e) => {
    document.querySelectorAll('.plane').forEach(plane => {
        const speed = plane.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX * speed) / 100
        const y = (window.innerHeight - e.pageY * speed) / 100

        // conseguir el 50% de las medidas



        const { width, height } = plane.getBoundingClientRect()
        console.log(width, height)

        plane.style.transform = `translateX(${(width / 2) + x}px) translateY(-${(height / 2) + y}px)`
    });
}

document.addEventListener('mousemove', createDepth)

