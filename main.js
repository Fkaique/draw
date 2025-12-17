const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.body.appendChild(canvas)

let pressed = false

canvas.addEventListener('mousedown', ()=>{
    pressed = true    
})

canvas.addEventListener('mouseup', ()=>{
    pressed = false
})
document.addEventListener('mouseup', ()=>{
    pressed = false
})

let size = 4

canvas.addEventListener('click', (e)=>{
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX
    const my = e.clientY
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(mx-5, my-5, size, 0, Math.PI * 2)
    ctx.fill()
})

canvas.addEventListener('mousemove', (e)=>{
    if (!pressed) {return};
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX
    const my = e.clientY
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(mx-5, my-5, size, 0, Math.PI * 2)
    ctx.fill()

})

document.addEventListener('keydown',(e)=>{
    if (e.key=='+'){
        size=Math.min(size+1,50);
    }
    if (e.key=='-'){
        size=Math.max(size-1,1)
        console.log(size)
    }
})