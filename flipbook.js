let Flipbook = function (imageSource, frameCount, container) {
    this.absoluteImage = document.createElement('img')
    this.absoluteImage.src = imageSource
    this.image = document.createElement('div')
    this.image.style.backgroundImage = `url('${imageSource}')`
    this.index = 0
    this.scale = .2
    this.frameCount = frameCount
    container.appendChild(this.image)
    this.absoluteImage.addEventListener('load', () => {
        this.image.style.width = `${this.absoluteImage.width * this.scale / frameCount}px`
        this.image.style.height = `${this.absoluteImage.width * this.scale / frameCount}px`
        this.image.style.backgroundSize = `${this.absoluteImage.width * this.scale}px ${this.absoluteImage.height * this.scale}px`
        // window.setInterval(() => {
        //     this.index += 1
        //     this.update()
        // }, 70)
    })
}

Flipbook.prototype.update = function () {
    this.image.style.backgroundPositionX = `${
        (-1) * this.absoluteImage.width * this.scale / this.frameCount * this.index
    }px`
}

window.addEventListener('load', () => {
    let container = document.getElementById('flipbook-container')
    window.demo = new Flipbook ('images/deeps-demo-filmstrip.png', 7, container)
})

let onScroll = () => {
    let minDiff = 0
    let maxDiff = document.body.scrollHeight - (demo.image.getBoundingClientRect().height * 2)
    demo.index = Math.round((
        (demo.image.offsetTop - demo.image.getBoundingClientRect().top) / maxDiff
    ) * demo.frameCount)
    demo.update()
}

window.addEventListener('scroll', onScroll)
window.addEventListener('touchmove', onScroll)
