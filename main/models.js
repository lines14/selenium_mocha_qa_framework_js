class Models{
    constructor(){
        this.name
        this.platforms
        this.releaseDate
        this.feedback
        this.price
    }
    set nameInToInstance(newName){
        this.name = newName
    }
    set platformsInToInstance(newPlatforms){
        this.platforms = newPlatforms
    }
    set releaseDateInToInstance(newReleaseDate){
        this.releaseDate = newReleaseDate
    }
    set feedbackInToInstance(newFeedback){
        this.feedback = newFeedback
    }
    set priceInToInstance(newPrice){
        this.price = newPrice
    }
}

module.exports = Models;