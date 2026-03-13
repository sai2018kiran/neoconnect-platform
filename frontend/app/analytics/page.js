"use client"

import {useEffect,useState} from "react"
import axios from "axios"
import {BarChart,Bar,XAxis,YAxis,PieChart,Pie,Cell} from "recharts"

export default function AnalyticsPage(){

const [cases,setCases] = useState([])

useEffect(()=>{
fetchCases()
},[])

const fetchCases = async()=>{
const res = await axios.get("https://neoconnect-platform.onrender.com/api/cases")
setCases(res.data)
}

// Department counts
const departmentData = Object.values(

cases.reduce((acc,c)=>{

if(!acc[c.department]){

acc[c.department] = {department:c.department,count:0}

}

acc[c.department].count++

return acc

},{})

)

// Status counts
const statusData = Object.values(

cases.reduce((acc,c)=>{

if(!acc[c.status]){

acc[c.status] = {status:c.status,count:0}

}

acc[c.status].count++

return acc

},{})

)
// hotspot detection
const hotspots = Object.values(

    cases.reduce((acc,c)=>{
    
    const key = c.department + "-" + c.category
    
    if(!acc[key]){
    
    acc[key] = {
    department:c.department,
    category:c.category,
    count:0
    }
    
    }
    
    acc[key].count++
    
    return acc
    
    },{}
    
    )
    
    ).filter(h=>h.count>=5)

return(

<div className="p-10">
{hotspots.length > 0 && (

<div className="bg-red-200 text-red-800 p-4 mb-6 rounded">

⚠ Hotspot detected: Multiple complaints from same department

</div>

)}
<h1 className="text-3xl font-bold mb-10">
Analytics Dashboard
</h1>

<h2 className="text-xl mb-4">
Cases by Department
</h2>

<BarChart width={500} height={300} data={departmentData}>

<XAxis dataKey="department"/>
<YAxis/>
<Bar dataKey="count"/>

</BarChart>

<h2 className="text-xl mt-10 mb-4">
Cases by Status
</h2>

<PieChart width={400} height={300}>

<Pie
data={statusData}
dataKey="count"
nameKey="status"
cx="50%"
cy="50%"
outerRadius={100}
label
/>

</PieChart>

</div>

)

}
