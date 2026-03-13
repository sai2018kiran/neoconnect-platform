const express = require("express")
const router = express.Router()

const Case = require("../models/Case")
const generateTrackingId = require("../utils/trackingId")

// create complaint
router.post("/", async(req,res)=>{

try{

const count = await Case.countDocuments()

const trackingId = generateTrackingId(count)

const newCase = new Case({
...req.body,
trackingId
})

await newCase.save()

res.json(newCase)

}
catch(error){

res.status(500).json(error)

}

})


// get all cases
router.get("/", async(req,res)=>{

const cases = await Case.find()

res.json(cases)

})


// update case status
router.put("/:id/status", async (req,res)=>{

    try{
    
    const {status} = req.body
    
    const updated = await Case.findByIdAndUpdate(
    req.params.id,
    {status},
    {new:true}
    )
    
    res.json(updated)
    
    }catch(error){
    
    res.status(500).json(error)
    
    }
    
    })
    
module.exports = router