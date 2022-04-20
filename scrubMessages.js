class scrubMessages {
  setup() {
    var notallowed = ["transport close", "hbcjhgvf"]
    this.notallowed = notallowed
  }
  scrub(msg) {
    if (this.notallowed[0].hasOwnProperty(msg)) {
     return `${msg} ` 
    } else {
      return msg
    }
  }
}
scrubber = new scrubMessages
scrubber.setup();
module.exports = scrubMessages;