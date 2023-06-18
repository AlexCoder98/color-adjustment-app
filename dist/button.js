import { colorAdjustmentPanel } from './main.js';
class Button {
    constructor(content, selector) {
        this.btn = document.querySelector(selector);
        this.btn.textContent = content;
    }
}
;
class SetRandomColorButton extends Button {
    constructor(content, selector) {
        super(content, selector);
        this.h1ColorCode = document.querySelector('[data-code-h1]');
        this.btn.addEventListener('click', this.setRandomBgc.bind(this));
    }
    setInputValue(input, color) {
        input.value = (color * 0.392).toString();
    }
    setRandomBgc() {
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
        document.querySelector('[data-color-preview]').style.backgroundColor = rgbaColor;
        document.querySelector('[data-code]').textContent = rgbaColor;
        colorAdjustmentPanel.checkColors(red, green, blue);
        this.h1ColorCode.textContent = rgbaColor;
    }
    ;
}
;
class ShowAdjustmentColorPanelButton extends Button {
    constructor(content, selector) {
        super(content, selector);
        this.btn.addEventListener('click', this.showAdjustmentColorPanel);
    }
    ;
    showAdjustmentColorPanel() {
        document.querySelector('.adjust-color-panel').classList.add('active');
        document.querySelector('.modal').classList.add('active');
    }
    ;
}
;
class CloseAsidePanelButton extends Button {
    constructor(content, selector) {
        super(content, selector);
        this.btn.addEventListener('click', this.closeAsidePanel);
    }
    ;
    closeAsidePanel() {
        document.querySelector('.adjust-color-panel').classList.remove('active');
        document.querySelector('.modal').classList.remove('active');
    }
}
class SaveChangesButton extends Button {
    constructor(content, selector) {
        super(content, selector);
        this.btn.addEventListener('click', this.saveChanges);
    }
    saveChanges() {
        const adjustedRGBAColor = colorAdjustmentPanel.getRGBAColor();
        const currentRGBAColor = document.querySelector('[data-code-h1]').textContent;
        if (adjustedRGBAColor !== currentRGBAColor) {
            alert('Background color has been changed! Do you want to save changes?');
        }
        ;
        document.body.style.backgroundColor = adjustedRGBAColor;
        colorAdjustmentPanel.h1ColorCode.textContent = adjustedRGBAColor;
        document.querySelector('.adjust-color-panel').classList.remove('active');
        document.querySelector('.modal').classList.remove('active');
    }
}
export const setRandomColorBtn = new SetRandomColorButton('Set Random Color', '[data-set-random-color]');
export const showAdjustmentColorPanelBtn = new ShowAdjustmentColorPanelButton('Adjust Color', '[data-show-adjustment-color-panel]');
export const closeAsidePannelBtn = new CloseAsidePanelButton('close', '[data-close-panel]');
export const saveChangesBtn = new SaveChangesButton('Save Changes', '[data-save-changes]');
