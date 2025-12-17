const container = document.getElementById('container')
const range = document.getElementById('range')
const numRange = document.getElementById('numRange')
const cor = document.getElementById('cor')

numRange.textContent = range.value

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

function resize() {
    console.log('neh')
    const rect = container.getBoundingClientRect()
    const saved = ctx.getImageData(0,0,canvas.width,canvas.height)
    canvas.width  = rect.width
    canvas.height = rect.height
    ctx.putImageData(saved,0,0)
}
resize()

const resizeObserver = new ResizeObserver(resize)
resizeObserver.observe(container)

container.appendChild(canvas)

let pressed = false
let size = 

canvas.addEventListener('pointerdown', (e)=>{
    if (e.button!=0) return;
    pressed = true  
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(mx, my)
    ctx.lineWidth = size
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = cor.value
    ctx.lineTo(mx, my)
    ctx.stroke()
})


document.addEventListener('pointerup', (e)=>{
    if (e.button!=0) return;
    pressed = false
    
    // ctx.beginPath()
    // ctx.fillStyle = 'black'
    // ctx.arc(mx+5, my+5, size, 0, Math.PI * 2)
    // ctx.fill()
    // console.log("neh")
})

canvas.addEventListener('pointermove', (e)=>{
    if (!pressed) {return};
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    ctx.strokeStyle = cor.value
    ctx.lineTo(mx, my)
    ctx.stroke()
    // ctx.beginPath()
    // ctx.fillStyle = 'black'
    // ctx.arc(mx+5, my+5, size, 0, Math.PI * 2)
    // ctx.fill()
})

range.addEventListener('input',(e)=>{
    numRange.textContent = Math.max(range.value,1)
    size = numRange.textContent
    console.log(range.value)
})