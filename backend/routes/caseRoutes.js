const express = require("express")
const router = express.Router()

const Case = require("../models/Case")

// CREATE COMPLAINT
router.post("/", async (req, res) => {

try {

const year = new Date().getFullYear()
const unique = Date.now()

const trackingId = `NEO-${year}-${unique}`

const newCase = new Case({
...req.body,
trackingId
})

await newCase.save()

res.json(newCase)

} catch (error) {

res.status(500).json({
message: "Error creating case",
error
})

}

})


// GET ALL CASES
router.get("/", async (req, res) => {

try {

const cases = await Case.find().sort({ createdAt: -1 })

res.json(cases)

} catch (error) {

res.status(500).json({
message: "Error fetching cases",
error
})

}

})


// UPDATE CASE STATUS
router.put("/:id/status", async (req, res) => {

try {

const { status } = req.body

const updated = await Case.findByIdAndUpdate(
req.params.id,
{ status },
{ new: true }
)

res.json(updated)

} catch (error) {

res.status(500).json({
message: "Error updating case status",
error
})

}

})

module.exports = router
