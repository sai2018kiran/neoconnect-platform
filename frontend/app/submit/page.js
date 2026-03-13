"use client"

import { useState } from "react"
import axios from "axios"

export default function SubmitPage(){

const [category,setCategory] = useState("")
const [department,setDepartment] = useState("")
const [location,setLocation] = useState("")
const [severity,setSeverity] = useState("")
const [description,setDescription] = useState("")
const [anonymous,setAnonymous] = useState(false)

const submitCase = async () => {

await axios.post("http://localhost:5000/api/cases",{

category,
department,
location,
severity,
description,
anonymous

})

alert("Complaint submitted!")

}

return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Submit Complaint
</h1>

<input
className="border p-2 mb-3 w-full"
placeholder="Category"
onChange={(e)=>setCategory(e.target.value)}
/>

<input
className="border p-2 mb-3 w-full"
placeholder="Department"
onChange={(e)=>setDepartment(e.target.value)}
/>

<input
className="border p-2 mb-3 w-full"
placeholder="Location"
onChange={(e)=>setLocation(e.target.value)}
/>

<input
className="border p-2 mb-3 w-full"
placeholder="Severity"
onChange={(e)=>setSeverity(e.target.value)}
/>

<textarea
className="border p-2 mb-3 w-full"
placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
/>

<label className="block mb-3">

<input
type="checkbox"
onChange={(e)=>setAnonymous(e.target.checked)}
/>

<span className="ml-2">
Submit anonymously
</span>

</label>

<button
className="bg-blue-500 text-white px-4 py-2 rounded"
onClick={submitCase}
>

Submit

</button>

</div>

)

}