class Slider {
    constructor({ slider, sliderLine, prev, next, direction, autoPlay, autoPlayTime }) {
        this.slider = document.querySelector(slider);
        this.sliderLine = document.querySelector(sliderLine);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.time = autoPlayTime
            // this.time = autoPlayTime  ?? 5000
        this.dir = direction == undefined ? 'X' : direction.toUpperCase() == 'Y' ? 'Y' : 'X'
        this.slides = [...this.sliderLine.children]
        this.sliderLine.style = `height:${this.height()}px; overflow:hidden;`
        this.active = 0
        this.moveSize = this.dir == 'X' ? this.sliderLine.clientWidth : this.height()
        this.slides.forEach((slide, i) => {
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i == this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.moveSize}px)`
            }
        })
        this.next.addEventListener('click', () => this.move(this.next))
        this.prev.addEventListener('click', () => this.move(this.prev))
        if (autoPlay) {
            this.play = setInterval(() => {
                this.move(this.next)
            }, this.time);
            this.slider.onmouseover = () => clearInterval(this.play)
            this.slider.onmouseout = () =>
                this.play = setInterval(() => {
                    this.move(this.next)
                }, this.time);
        }
    }
    disableBtn() {
        this.prev.disabled = true
        this.next.disabled = true
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, 1100);
    }
    move(btn) {
        this.disableBtn()
        const moveSlide = btn == this.next ? -this.moveSize : this.moveSize
        this.slides.forEach((slide, i) => {
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${-moveSlide}px)`
                slide.style.transition = `0s`
            }
        })
        this.slides[this.active].style.transform = `translate${this.dir}(${moveSlide}px)`
        this.slides[this.active].style.transition = `1s`
        this.changeAcive(btn)
        this.slides[this.active].style.transform = `translate(0px)`
        this.slides[this.active].style.transition = `1s`
    }
    changeAcive(btn) {
        if (btn == this.prev) {
            this.active--
                if (this.active < 0) {
                    this.active = this.slides.length - 1
                }
        } else if (btn == this.next) {
            this.active++
                if (this.active > this.slides.length - 1) {
                    this.active = 0
                }
        }
    }
    height() {
        const size = this.slides.map(slide => slide.clientHeight)
        return Math.max(...size)
    }
}

new Slider({
    slider: '.slider',
    sliderLine: '.slider__line',
    prev: '.slider__prev',
    next: '.slider__next',
    direction: 'X',
    autoPlay: true,
    autoPlayTime: 3000
})































// class Slider {
//     constructor({ slider, sliderLine, prev, next, direction }) {
//         this.slider = document.querySelector(slider);
//         this.sliderLine = document.querySelector(sliderLine);
//         this.prev = document.querySelector(prev);
//         this.next = document.querySelector(next);
//         this.dir = direction == undefined ? 'X' : direction.toUpperCase() == 'Y' ? 'Y' : 'X'
//         this.slides = [...this.sliderLine.children]
//         this.sliderLine.style = `height:${this.height()}px`
//         this.active = 0
//         this.moveSize = this.dir == 'X' ? this.sliderLine.clientWidth : this.height()
//         this.slides.forEach((slide, i) => {
//             if (this.active != i) {
//                 slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
//             }
//             if (i == this.slides.length - 1) {
//                 slide.style.transform = `translate${this.dir}(${-this.moveSize}px)`
//             }
//         })
//         this.next.addEventListener('click', () => this.move(this.next))
//         this.prev.addEventListener('click', () => this.move(this.prev))
//     }
//     move(btn) {
//         const moveSlide = btn == this.next ? -this.moveSize : this.moveSize
//         this.slides.forEach((slide, i) => {
//             if (this.active != i) {
//                 slide.style.transform = `translate${this.dir}(${-moveSlide}px)`
//             }
//         })
//         this.slides[this.active].style.transform = `translate${this.dir}(${moveSlide}px)`
//         this.slides[this.active].style.transition = `1s`
//         this.changeActive(btn)
//         console.log(this.active)
//     }
//     changeActive(btn) {
//         if (btn == this.prev) {
//             this.active--
//                 if (this.active < 0) {
//                     this.active = this.slides.length - 1
//                 }
//         } else if (btn == this.next) {
//             this.active++
//                 if (this.active > this.slides.length - 1) {
//                     this.active = 0
//                 }
//         }
//     }
//     height() {
//         const size = this.slides.map(slide => slide.clientHeight)
//         return Math.max(...size)
//     }
// }
// new Slider({
//     slider: '.slider',
//     sliderLine: '.slider__line',
//     prev: '.slider__prev',
//     next: '.slider__next',
//     direction: 'X'
// })