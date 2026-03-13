"use client"

import {useEffect,useState} from "react"
import axios from "axios"
import {BarChart,Bar,XAxis,YAxis} from "recharts"

export default function PollPage(){

const [polls,setPolls] = useState([])

useEffect(()=>{
fetchPolls()
},[])

const fetchPolls = async()=>{
const res = await axios.get("https://neoconnect-platform.onrender.com/api/polls")
setPolls(res.data)
}

const vote = async(pollId,index)=>{
await axios.post("https://neoconnect-platform.onrender.com/api/polls/vote",{
pollId,
optionIndex:index,
userId:"user1"
})

fetchPolls()
}

return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Polls
</h1>

{polls.map((poll)=>(

<div key={poll._id} className="border p-4 mb-6">

<h2 className="font-bold mb-3">
{poll.question}
</h2>

{poll.options.map((opt,index)=>(

<button
key={index}
className="bg-blue-500 text-white px-3 py-1 mr-2"
onClick={()=>vote(poll._id,index)}
>

{opt.text}

</button>

))}

<BarChart width={400} height={200} data={poll.options}>
<XAxis dataKey="text"/>
<YAxis/>
<Bar dataKey="votes"/>
</BarChart>

</div>

))}

</div>

)

}
