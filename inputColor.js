class ColorInputElement extends HTMLElement {
    #colorElement = null
    #opacityElement = null
    #value = null

    static observedAttributes = ['value']

    constructor() {
        super()
        const [color,opacity] = this.#parseValue(this.getAttribute('value') || "")
        const shadow = this.attachShadow({ mode: 'open' })
        
        this.#colorElement = document.createElement('input')
        this.#colorElement.type = 'color'
        this.#opacityElement = document.createElement('input')
        this.#opacityElement.type = 'range'
        this.#opacityElement.min = 0
        this.#opacityElement.max = 255
        this.#value = this.getAttribute('value')
        this.#colorElement.value = color
        this.#opacityElement.value = opacity
        shadow.append(this.#colorElement,this.#opacityElement)
    
        this.#colorElement.addEventListener('input', this.#onChange)
        this.#opacityElement.addEventListener('input', this.#onChange)
        
    }
    #onChange = () => { 
        const color = this.#colorElement.value || '#000000'
        const opacity = Number(this.#opacityElement.value?? 255)

        const value = this.#toValue(color, opacity)
        this.#value = value
        const event = new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: value
        })
        this.dispatchEvent(event)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name==='value'){
            if (!newValue) {
                this.#value = null
                this.#colorElement.value = "#000000"
                this.#opacityElement.value = 255
                return
            }
            const [color,opacity] = this.#parseValue(this.getAttribute('value') || "")
            this.#colorElement.value = color
            this.#opacityElement.value = opacity
            this.#value = newValue
        }
    }

    #parseValue(hex) {
        if (!hex) return ['#000000', 255]
        const cor = hex.substring(0, 7)
        const opacity = hex.substring(7, 9)
        return [cor, parseInt(opacity, 16)]
    }

    #toValue(cor, opacidade){
        if (cor.length === 4) {
            cor = cor.replaceAll(/^#([a-f0-9])([a-f0-9])([a-f0-9])$/,"#$1$1$2$2$3$3")
        }
        
        return cor + opacidade.toString(16).padStart(2,'0')
    }

    get value() {
        return this.#value
    }

    set value(value) {
        this.#value = value
    }

}

customElements.define('x-color-input', ColorInputElement)