"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function CasesPage(){

const [cases,setCases] = useState([])

useEffect(()=>{
fetchCases()
},[])

const fetchCases = async()=>{
const res = await axios.get("http://localhost:5000/api/cases")
setCases(res.data)
}

const updateStatus = async(id,status)=>{

await axios.put(`http://localhost:5000/api/cases/${id}/status`,{
status
})

fetchCases()

}

return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Case Management
</h1>

<table className="border w-full">

<thead className="bg-gray-200">

<tr>
<th className="p-2">Tracking ID</th>
<th className="p-2">Category</th>
<th className="p-2">Department</th>
<th className="p-2">Status</th>
<th className="p-2">Update</th>
</tr>

</thead>

<tbody>

{cases.map((c)=>(

<tr key={c._id} className="border">

<td className="p-2">{c.trackingId}</td>
<td className="p-2">{c.category}</td>
<td className="p-2">{c.department}</td>

<td className="p-2">{c.status}</td>

<td className="p-2">

<select
className="border p-1"
onChange={(e)=>updateStatus(c._id,e.target.value)}
>

<option>Select</option>
<option>New</option>
<option>Assigned</option>
<option>In Progress</option>
<option>Pending</option>
<option>Resolved</option>
<option>Escalated</option>

</select>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}