import { Capabilities, Builder } from 'selenium-webdriver';
import ConfigManager from '../utils/data/configManager.js';

class BrowserFactory {
    static #instance = null;

    static createInstance() {
        if (!this.#instance) {
            if (ConfigManager.getConfigData().browser === 'chrome') {
                const chromeCapabilities = Capabilities.chrome();
                const chromeOptions = {'args': ['--incognito']};
                chromeCapabilities.set("goog:chromeOptions", chromeOptions);
                this.#instance = new Builder().forBrowser('chrome')
                .withCapabilities(chromeCapabilities)
                .build();

                if (ConfigManager.getConfigData().isMaximize) {
                    this.#instance.manage()
                    .window()
                    .maximize();
                }

                Object.freeze(this.#instance);
            } else if (ConfigManager.getConfigData().browser === 'firefox') {
                const firefoxCapabilities = Capabilities.firefox();
                const firefoxOptions = {'args': ['-private']};
                firefoxCapabilities.set("moz:firefoxOptions", firefoxOptions);
                this.#instance = new Builder().forBrowser('firefox')
                .withCapabilities(firefoxCapabilities)
                .build();

                if (ConfigManager.getConfigData().isMaximize) {
                    this.#instance.manage()
                    .window()
                    .maximize();
                }

                Object.freeze(this.#instance);
            }
        }
    }

    static get instance() {
        if (this.#instance) return this.#instance;
    }

    static set instance(value) {
        this.#instance = value;
    }
}

export default BrowserFactory;