import {createPainter} from "./utils.js"

const container = document.getElementById('container')
// const criar = document.getElementById('criar')
const salvar = document.getElementById('salvar')
const abrir = document.getElementById('abrir')
const range = document.getElementById('range')
const numRange = document.getElementById('numRange')
const pincel = document.getElementById('pincel')
const borracha = document.getElementById('borracha')
const balde = document.getElementById('balde')
const gotas = document.getElementById('gotas')
const corA = document.getElementById('corA')
const corB = document.getElementById('corB')

numRange.textContent = range.value

let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d', {
    alpha: true,
    willReadFrequently: true,
})
const painter = createPainter(ctx,canvas)

// canvas.style.backgroundColor = 'black'

ctx.imageSmoothingEnabled = false
ctx.imageSmoothingQuality = "low"

let img = new Image();
let scale = 1;

let lineStroke = [0,0,0,255]
// canvas.width = 100
// canvas.height = 100 

function resize() {
    const rect = container.getBoundingClientRect()
    const saved = ctx.getImageData(0,0,canvas.width,canvas.height)
    canvas.width  = rect.width / scale
    canvas.height = rect.height / scale
    ctx.fillStyle = corB.value
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.putImageData(saved,0,0)
}
resize()

ctx.fillStyle = corB.value
ctx.fillRect(0,0,canvas.width,canvas.height)

const resizeObserver = new ResizeObserver(resize)
resizeObserver.observe(container)

container.appendChild(canvas)

let pressed = false
let size = 2;

canvas.addEventListener('pointerdown', (e)=>{
    const [mx,my] = painter.canvasRelative(e.clientX,e.clientY)

    if (balde.checked){
        painter.fill(mx,my,painter.hexToRgba(corA.value))
    }else if (pincel.checked || borracha.checked){
        if (e.button!=0) return;
        pressed = true
        painter.moveTo(mx, my)

        lineStroke = borracha.checked
            ? painter.hexToRgba(corB.value)
            : painter.hexToRgba(corA.value)

        painter.drawDot(mx, my, size, lineStroke)
    }
})

document.addEventListener('pointerup', (e) => {
    pressed = false
    painter.endLine()
    if (balde.checked) return
    
})

canvas.addEventListener('pointerup', (e)=>{
    if (!gotas.checked) return

    e.preventDefault()
    e.stopPropagation()

    const [mx, my] = painter.canvasRelative(e.clientX, e.clientY)

    const image = ctx.getImageData(mx, my, 1, 1)

    corA.value = painter.rgbaToHex(
        image.data[0],
        image.data[1],
        image.data[2]
    )
})
canvas.addEventListener('pointermove', (e)=>{
    if (balde.checked){

    }else if (pincel.checked || borracha.checked){
        if (!pressed) {return};
        const rect = canvas.getBoundingClientRect()
        const [mx,my] = painter.canvasRelative(e.clientX,e.clientY)
        if (borracha.checked){
            lineStroke = painter.hexToRgba(corB.value)
        }else{
            lineStroke = painter.hexToRgba(corA.value)
        }
        painter.lineTo(mx, my, size, lineStroke)
        ctx.stroke()
    }
})

range.addEventListener('input',(e)=>{
    numRange.textContent = Math.max(range.value,1)
    size = numRange.textContent
})

salvar.addEventListener('pointerup',(e)=>{
    e.preventDefault()
    e.stopPropagation()

    if (!canvas) return

    canvas.toBlob(blob =>{
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = "FKDraw.png"
        link.click()

        URL.revokeObjectURL(url)
    },"image/png")
})

abrir.addEventListener('change',(e)=>{
    const file = abrir.files[0]
    if (!file) return 
    
    const url = URL.createObjectURL(file)

    img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(img,0,0)
        
        scale = container.clientHeight / canvas.height
        
        container.style.width = (img.width * scale) + "px"
        container.style.height = (img.height * scale) + "px"
        URL.revokeObjectURL(file)
    }
    img.src = url
})