class Randomizer {
    async getRandomElement(...allElementsLists) {
        const baseElementsList = allElementsLists[0].slice(0, allElementsLists[0].length);
        const exceptionsList = allElementsLists[1];
    
        let element;
        do {
            element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
        } while ((exceptionsList.map(elem => elem.elementId)).includes(element.elementId));

        return element;
    }

    async getRandomString(hasUpperCase, hasNumber, hasCyrillic, chosenLetter, minLength=0, maxLength=10) {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const cyrillicLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      
        let length = await this.getRandomNumber(minLength, maxLength);
      
        let randomString = '';
      
        if (chosenLetter !== false) {
            randomString += chosenLetter;
        }
      
        let requiredCharacters = '';
        if (hasUpperCase) {
            requiredCharacters += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
        }

        if (hasNumber) {
            requiredCharacters += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        if (hasCyrillic) {
            requiredCharacters += cyrillicLetters.charAt(Math.floor(Math.random() * cyrillicLetters.length));
        }

        randomString += requiredCharacters;
      
        const characters = (hasUpperCase ? upperCaseLetters : '') + lowerCaseLetters + (hasNumber ? numbers : '') + (hasCyrillic ? cyrillicLetters : '');
        const charactersLength = characters.length;
        const randomLength = length - randomString.length;

        for (let i = 0; i < randomLength; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return await this.stringShuffler(randomString);
    }

    async getRandomNumber(maxLength=9, minLength=1) {
        return Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    }

    async stringShuffler(inputString) {
        let array = inputString.split('');
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array.join('');
    }
}

export default new Randomizer();