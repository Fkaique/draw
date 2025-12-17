const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')


document.body.appendChild(canvas)

let pressed = false

canvas.addEventListener('pointerdown', ()=>{
    pressed = true    
})

function resize() {
  const dpr = window.devicePixelRatio || 1

  canvas.width  = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width  = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}
resize()

canvas.addEventListener('pointerup', ()=>{
    pressed = false
})
document.addEventListener('pointerup', ()=>{
    pressed = false
})

let size = 4

canvas.addEventListener('click', (e)=>{
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX
    const my = e.clientY
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(mx+5, my+5, size, 0, Math.PI * 2)
    ctx.fill()
})

canvas.addEventListener('pointermove', (e)=>{
    if (!pressed) {return};
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX
    const my = e.clientY
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(mx+5, my+5, size, 0, Math.PI * 2)
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