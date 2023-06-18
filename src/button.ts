import { colorAdjustmentPanel } from './main.js'

// BASE BUTTON CLASS
class Button {
    protected btn: HTMLButtonElement;

    constructor(content: string, selector: string) {
        this.btn = document.querySelector(selector)! as HTMLButtonElement;
        this.btn.textContent = content;
    }
};

// RANDOM BGC GENERATOR BUTTON CLASS
class SetRandomColorButton extends Button {
    private h1ColorCode: HTMLHeadingElement;

    constructor(content: string, selector: string) {
        super(content, selector);
        this.h1ColorCode = document.querySelector('[data-code-h1]')! as HTMLHeadingElement;
        this.btn.addEventListener('click', this.setRandomBgc.bind(this));
    }

    private setInputValue(input: HTMLInputElement, color: number) {
        input.value = (color * 0.392).toString();
    }

    private setRandomBgc() {
        const { redInputAdjustment, greenInputAdjustment, blueInputAdjustment, opacityInputAdjustment } = colorAdjustmentPanel;

        const red = Math.round(Math.random() * 255);
        const green = Math.round(Math.random() * 255);
        const blue = Math.round(Math.random() * 255);
        const opacity = +Math.random().toFixed(1);

        this.setInputValue(redInputAdjustment, red);
        this.setInputValue(greenInputAdjustment, green);
        this.setInputValue(blueInputAdjustment, blue);
        this.setInputValue(opacityInputAdjustment, opacity);

        const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        document.body.style.backgroundColor = rgbaColor;
        (document.querySelector('[data-color-preview]')! as HTMLDivElement).style.backgroundColor = rgbaColor;
        (document.querySelector('[data-code]')! as HTMLSpanElement).textContent = rgbaColor;
        colorAdjustmentPanel.checkColors(red, green, blue);
        this.h1ColorCode.textContent = rgbaColor;
    };
};

// SHOW BGC ADJUSTMENT PANEL BUTTON CLASS
class ShowAdjustmentColorPanelButton extends Button {
    constructor(content: string, selector: string) {
        super(content, selector);
        this.btn.addEventListener('click', this.showAdjustmentColorPanel);
    };

    private showAdjustmentColorPanel() {
        (document.querySelector('.adjust-color-panel')! as HTMLElement).classList.add('active');
        (document.querySelector('.modal')! as HTMLDivElement).classList.add('active');
    };
};

// CLOSE ASIDE PANEL BUTTON CLASS
class CloseAsidePanelButton extends Button {
    constructor(content: string, selector: string) {
        super(content, selector);
        this.btn.addEventListener('click', this.closeAsidePanel);
    };

    private closeAsidePanel() {
        (document.querySelector('.adjust-color-panel')! as HTMLElement).classList.remove('active');
        (document.querySelector('.modal')! as HTMLDivElement).classList.remove('active');
    }
}

// SAVE CHANGES BUTTON CLASS
class SaveChangesButton extends Button {
    constructor(content: string, selector: string) {
        super(content, selector);
        this.btn.addEventListener('click', this.saveChanges);
    }

    private saveChanges() {
        const adjustedRGBAColor = colorAdjustmentPanel.getRGBAColor();
        const currentRGBAColor = (document.querySelector('[data-code-h1]')! as HTMLHeadingElement).textContent;

        if (adjustedRGBAColor !== currentRGBAColor) {
            alert('Background color has been changed! Do you want to save changes?');
        };

        document.body.style.backgroundColor = adjustedRGBAColor;
        colorAdjustmentPanel.h1ColorCode.textContent = adjustedRGBAColor;

        (document.querySelector('.adjust-color-panel')! as HTMLElement).classList.remove('active');
        (document.querySelector('.modal')! as HTMLDivElement).classList.remove('active');
    }
}

// CREATING BUTTONS' INSTANCES
export const setRandomColorBtn = new SetRandomColorButton('Set Random Color', '[data-set-random-color]');
export const showAdjustmentColorPanelBtn = new ShowAdjustmentColorPanelButton('Adjust Color', '[data-show-adjustment-color-panel]');
export const closeAsidePannelBtn = new CloseAsidePanelButton('close', '[data-close-panel]');
export const saveChangesBtn = new SaveChangesButton('Save Changes', '[data-save-changes]');
