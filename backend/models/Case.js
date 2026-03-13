const mongoose = require("mongoose")

const CaseSchema = new mongoose.Schema({

trackingId: String,

category: String,
department: String,
location: String,
severity: String,

description: String,

anonymous: Boolean,

status:{
type:String,
enum:["New","Assigned","In Progress","Pending","Resolved","Escalated"],
default:"New"
},

assignedTo:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Case",CaseSchema)