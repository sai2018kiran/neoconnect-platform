const mongoose = require("mongoose")

const PollSchema = new mongoose.Schema({

question: String,

options: [
{
text: String,
votes: {
type: Number,
default: 0
}
}
],

voters: [String]

})

module.exports = mongoose.model("Poll", PollSchema)