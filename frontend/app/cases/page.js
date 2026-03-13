"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function CasesPage(){

const [cases,setCases] = useState([])

useEffect(()=>{
fetchCases()
},[])

const fetchCases = async()=>{
const res = await axios.get("https://neoconnect-platform.onrender.com/api/cases")
setCases(res.data)
}

const updateStatus = async(id,status)=>{

await axios.put(`https://neoconnect-platform.onrender.com/api/cases/${id}/status`,{
status
})

fetchCases()

}

return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Case Management
</h1>

<div className="overflow-x-auto">

<table className="w-full border border-gray-300 table-fixed">

<thead className="bg-gray-200">

<tr>
<th className="p-3 text-center">Tracking ID</th>
<th className="p-3 text-center">Category</th>
<th className="p-3 text-center">Department</th>
<th className="p-3 text-center">Status</th>
<th className="p-3 text-center">Update</th>
</tr>

</thead>

<tbody>

{cases.map((c)=>(

<tr key={c._id} className="border-t text-center">

<td className="p-3">{c.trackingId}</td>
<td className="p-3">{c.category}</td>
<td className="p-3">{c.department}</td>
<td className="p-3">{c.status}</td>

<td className="p-3">

<select
className="border rounded px-2 py-1"
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

</div>

)

}
