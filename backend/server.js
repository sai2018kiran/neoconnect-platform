const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cron = require("node-cron")

require("dotenv").config()

const Case = require("./models/Case")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

// ROUTES
app.use("/api/cases", require("./routes/caseRoutes"))
app.use("/api/polls", require("./routes/pollRoutes"))


// 7-Day Escalation Rule
cron.schedule("0 0 * * *", async () => {

console.log("Checking for escalation...")

const cases = await Case.find({
status: { $in: ["Assigned","In Progress"] }
})

cases.forEach(async (c)=>{

const days = (Date.now() - new Date(c.createdAt)) / (1000*60*60*24)

if(days > 7){

c.status = "Escalated"

await c.save()

console.log(`Case escalated: ${c.trackingId}`)

}

})

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})