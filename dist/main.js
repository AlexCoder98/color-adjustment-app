import { setRandomColorBtn } from "./button.js";
class ColorAdjustmentPanel {
    constructor() {
        this.colorAdjustmentInputs = document.querySelectorAll('[data-color-adjustment]');
        this.redInputAdjustment = document.querySelector('[data-red]');
        this.greenInputAdjustment = document.querySelector('[data-green]');
        this.blueInputAdjustment = document.querySelector('[data-blue]');
        this.colorPreviewDiv = document.querySelector('[data-color-preview]');
        this.opacityInputAdjustment = document.querySelector('[data-opacity]');
        this.colorCode = document.querySelector('[data-code]');
        this.h1ColorCode = document.querySelector('[data-code-h1]');
        this.colorAdjustmentInputs.forEach(input => input.addEventListener('input', this.adjustColor.bind(this)));
    }
    adjustColor(e) {
        e.target.valueAsNumber;
        this.updateBodyBgc();
    }
    updateBodyBgc() {
        const bgc = this.getRGBAColor();
        this.colorPreviewDiv.style.backgroundColor = bgc;
        this.colorCode.textContent = bgc;
    }
    checkColors(red, green, blue) {
        if (red <= 50 || green <= 50 || blue <= 50) {
            this.h1ColorCode.style.color = '#fff';
            this.h1ColorCode.style.textShadow = '0 0 5px #000';
        }
        else {
            this.h1ColorCode.style.color = '#000';
            this.h1ColorCode.style.textShadow = 'none';
        }
    }
    getRGBAColor() {
        const red = Math.round(this.redInputAdjustment.valueAsNumber / 0.392);
        const green = Math.round(this.greenInputAdjustment.valueAsNumber / 0.392);
        const blue = Math.round(this.blueInputAdjustment.valueAsNumber / 0.392);
        const opacity = +this.opacityInputAdjustment.valueAsNumber;
        const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        this.checkColors(red, green, blue);
        return rgbaColor;
    }
}
export const colorAdjustmentPanel = new ColorAdjustmentPanel();
console.log(setRandomColorBtn);
