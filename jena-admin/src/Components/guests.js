import React,{useState} from 'react'

export default function Guests(props) {

    const [name,setName] = useState("")
    const [shown,setShown] = useState(false)

    const deleted = () => {
        props.call(props.id)
    }
    const add = ()=>{
        props.add(props.party, name)
        console.log(props.party)
    }
    return (
        <div onMouseEnter={() => setShown(true)} onMouseLeave={()=>setShown(false)}>
            <hr/>
        <div style={{display:"block"}}>
            <div style={{float:"right", display:"flex", justifyItems:"center"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
                    {shown ? <input style={{width:"100px", height: "10px",marginBottom:"5px",marginRight:"20px"}} value={name} placeholder="Enter Guest to Add" onChange={e=>setName(e.target.value)} /> : null}
                    <button style={{marginRight: "20px", width: "100px", fontSize:"8px"}} onClick={add}>Add Guest to Party</button>
                </div>
                <button style={{marginRight:"20px"}} onClick={deleted}>Delete</button>
                {props.attending ? 
                    <div style={{display:"inline-block", width:"20px", height:"20px", backgroundColor:"green"}}/>
                    :
                    <div style={{display:"inline-block", width:"20px", height:"20px", backgroundColor:"red"}}/>
                }
            </div>
            <h3>{props.name}</h3>
        </div>
            <hr/>
        </div>
    )
}
