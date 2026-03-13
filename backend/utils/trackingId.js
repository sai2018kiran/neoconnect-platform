function generateTrackingId(count){

    const year = new Date().getFullYear()
    
    return `NEO-${year}-${String(count+1).padStart(3,"0")}`
    
    }
    
    module.exports = generateTrackingId