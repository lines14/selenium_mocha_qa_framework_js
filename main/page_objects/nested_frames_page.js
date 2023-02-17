const BaseForm = require('../framework/base_form');
const Element = require('../framework/base_element_children/element');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class NestedFramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Nested Frames"]'), 'nested frames page');
        this.firstFrame = new Element(By.xpath('//*[@id="frame1"]'), 'first frame');
        this.secondFrame = new Element(By.xpath('/html/body/iframe'), 'second frame');
        this.firstFrameText = new Element(By.xpath('//body'), 'first frame text');
        this.secondFrameText = new Element(By.xpath('/html/body/p'), 'second frame text');
        this.button = new Button(By.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[3]'), 'frames button');
    }
    async nestedFramesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async goIntoFirstFrame() {
        return await this.firstFrame.goIntoFrame();
    }
    async getFirstFrameText() {
        return await this.firstFrameText.getText();
    }
    async goIntoSecondFrame() {
        return await this.secondFrame.goIntoFrame();
    }
    async getSecondFrameText() {
        return await this.secondFrameText.getText();
    }
    async clickFramesButton() {
        await this.button.clickButton();
    }
    // async onButtonClickConfirmBoxWillAppearButton() {
    //     await this.button2.clickButton();
    // }
    // async confirmTextIsDisplayed() {
    //     return await this.confirmText.boolElementIsDisplayed();
    // }
    // async onButtonClickPromptBoxWillAppearButton() {
    //     await this.button3.clickButton();
    // }
}

module.exports = new NestedFramesPage();