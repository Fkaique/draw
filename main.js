const canvas = document.createElement('canvas')
const container = document.getElementById('container')
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
let size = 4

canvas.addEventListener('pointerdown', (e)=>{
    if (e.button!=0) return;
    ctx.moveTo(e.clientX,e.clientY)
    pressed = true  
})


document.addEventListener('pointerup', (e)=>{
    if (e.button!=0) return;
    pressed = false
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX
    const my = e.clientY
    ctx.lineWidth = size
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineTo(e.clientX,e.clientY)
    ctx.stroke()
    ctx.beginPath()
    
    // ctx.beginPath()
    // ctx.fillStyle = 'black'
    // ctx.arc(mx+5, my+5, size, 0, Math.PI * 2)
    // ctx.fill()
    // console.log("neh")
})

canvas.addEventListener('pointermove', (e)=>{
    if (!pressed) {return};
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX
    const my = e.clientY
    ctx.lineTo(e.clientX,e.clientY)
    ctx.stroke()
    // ctx.beginPath()
    // ctx.fillStyle = 'black'
    // ctx.arc(mx+5, my+5, size, 0, Math.PI * 2)
    // ctx.fill()
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