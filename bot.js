const scrubMessages = require('./scrubMessages.js')
const date = require('./dateAndTime.js')
const scrubber = new scrubMessages()
scrubber.setup()

class bot {
  setup() {
    var serverStarted = date.currentDateAndTime
    this.serverStarted = serverStarted
  }
  checkForBotMessages(msg, name) {
    if (msg == '!dateAndTime') {
      var currentDateAndTime = date.currentDateAndTime
      var response = {"msg": msg, "bot": currentDateAndTime}
      return response
    } else if (msg == '!uptime') {
      var serverStarted = this.serverStarted
      var response = {"msg": msg, "bot": `server started: ${serverStarted}`}
      return response
    } else if (msg == '!e') {
      var response = {"msg": msg, "bot": `eeeee`}
      return response
    } else {
      var scrubbed = scrubber.scrub(msg)
      var response = {"msg": scrubbed};
      return response
    }
  }
}
module.exports = bot;