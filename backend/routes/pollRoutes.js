const express = require("express")
const router = express.Router()

const Poll = require("../models/Poll")

// create poll
router.post("/", async(req,res)=>{

const poll = new Poll(req.body)

await poll.save()

res.json(poll)

})

// vote
router.post("/vote", async(req,res)=>{

const {pollId,optionIndex,userId} = req.body

const poll = await Poll.findById(pollId)

if(poll.voters.includes(userId))
return res.json("Already voted")

poll.options[optionIndex].votes++

poll.voters.push(userId)

await poll.save()

res.json(poll)

})

// get polls
router.get("/", async(req,res)=>{

const polls = await Poll.find()

res.json(polls)

})

module.exports = router