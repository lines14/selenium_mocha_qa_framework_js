const BaseForm = require('../framework/base_form');
const Element = require('../framework/base_element_children/element');
const {By} = require('selenium-webdriver');

class FramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Frames"]'), 'frames page');
        this.firstFrame = new Element(By.css('#frame1'), 'first frame');
        this.secondFrame = new Element(By.css('#frame2'), 'second frame');
        this.frameText = new Element(By.xpath('//*[@id="sampleHeading"]'), 'frame text');
    }
    async framesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async goIntoFirstFrame() {
        return await this.firstFrame.goIntoFrame();
    }
    async getFirstFrameText() {
        return await this.frameText.getText();
    }
    async goIntoSecondFrame() {
        return await this.secondFrame.goIntoFrame();
    }
    async getSecondFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new FramesPage();