import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "../css/SidebarChat.css"
import db from "../firebase";
import {Link} from "react-router-dom"

function SidebarChat({addNewChat , id , name}) {

    const [seed , setSeed] = useState('');
    
    function createChat(){
        const roomName =  prompt("Enter name for the chat");
        if(roomName){

            db.collection("Rooms").add({
                name : roomName
            })
        }

    }
    const [message, setMessage] = useState("");


    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
        if(id){
            db.collection("Rooms").doc(id).collection("messages").orderBy('timestamp' , 'desc').onSnapshot(snapshot =>(
                setMessage(snapshot.docs.map(doc=>doc.data()))
            ))

        }

    } , [id])

    return !addNewChat ?  (
        <Link to = {`/rooms/${id}`} >
            <div className = "sidebarChat">
            <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}  />
                <div className = "sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{message[0]?.message}</p>

                </div>
            </div>
        </Link>
    ) : 
    (
        <div className = "sidebarChat" onClick = {createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
