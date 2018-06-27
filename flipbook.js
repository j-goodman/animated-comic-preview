let canvas = null
let ctx = null
let frameRate = 100

let setupCanvas = () => {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    drawPanels()
}

function Panel (obj) {
    this.frames = obj.frames
    this.frame = 0
    this.image = document.createElement('img')
    this.image.src = obj.imageSource
}

let drawPanels = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let objectiveScroll = window.scrollY
    panels.map((panel, index) => {
        let anchor = height(panel, canvas) * index
        let slide = panel.frames * frameRate
        if (window.scrollY > anchor && window.scrollY < anchor + slide) {
            objectiveScroll = anchor
            panel.frame = Math.floor(window.scrollY / (anchor + slide) * panel.frames)
        } else if (window.scrollY > anchor + slide) {
            objectiveScroll -= slide
        }
        let scrollOffset = anchor - objectiveScroll
        let frameOffset = panel.frame * canvas.width
        ctx.drawImage(panel.image, 0 - frameOffset, scrollOffset, canvas.width * panel.frames, height(panel, canvas))
    })
}

let height = (panel, canvas) => {
    return (panel.image.width / panel.frames * canvas.width) / panel.image.height
}

let panels = [
    new Panel ({
        imageSource: 'images/deeps-demo-color.png',
        frames: 7,
    }),
    new Panel ({
        imageSource: 'images/deeps-demo-filmstrip.png',
        frames: 7,
    }),
]

window.addEventListener('load', setupCanvas)
window.addEventListener('scroll', drawPanels)
