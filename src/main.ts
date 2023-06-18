import { setRandomColorBtn, showAdjustmentColorPanelBtn, closeAsidePannelBtn, saveChangesBtn } from "./button.js";

class ColorAdjustmentPanel {
    private colorAdjustmentInputs: NodeList;
    redInputAdjustment: HTMLInputElement;
    greenInputAdjustment: HTMLInputElement;
    blueInputAdjustment: HTMLInputElement;
    opacityInputAdjustment: HTMLInputElement;
    private colorPreviewDiv: HTMLDivElement;
    private colorCode: HTMLSpanElement;
    h1ColorCode: HTMLHeadingElement;

    constructor() {
        this.colorAdjustmentInputs = document.querySelectorAll('[data-color-adjustment]')! as NodeList;
        this.redInputAdjustment = document.querySelector('[data-red]')! as HTMLInputElement;
        this.greenInputAdjustment = document.querySelector('[data-green]')! as HTMLInputElement;
        this.blueInputAdjustment = document.querySelector('[data-blue]')! as HTMLInputElement;
        this.colorPreviewDiv = document.querySelector('[data-color-preview]')! as HTMLDivElement;
        this.opacityInputAdjustment = document.querySelector('[data-opacity]')! as HTMLInputElement;
        this.colorCode = document.querySelector('[data-code]')! as HTMLSpanElement;
        this.h1ColorCode = document.querySelector('[data-code-h1]')! as HTMLHeadingElement;
        this.colorAdjustmentInputs.forEach(input => input.addEventListener('input', this.adjustColor.bind(this)));
    }

    private adjustColor(e: Event) {
        (e.target! as HTMLInputElement).valueAsNumber;
        this.updateBodyBgc();
    }

    private updateBodyBgc() {
        const bgc = this.getRGBAColor();
        this.colorPreviewDiv.style.backgroundColor = bgc;
        this.colorCode.textContent = bgc;
    }

    checkColors(red: number, green: number, blue: number) {
        if (red <= 50 || green <= 50 || blue <= 50) {
            this.h1ColorCode.style.color = '#fff';
            this.h1ColorCode.style.textShadow = '0 0 5px #000';
        } else {
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