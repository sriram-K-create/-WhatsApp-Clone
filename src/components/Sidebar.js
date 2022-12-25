import { Avatar, Icon, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert, Room, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import "../css/Sidebar.css";
import SidebarChat from './SidebarChat';

import db from "../firebase";
import { useStateValue } from '../StateProvider';

function Sidebar() {
    const [rooms , setRooms] = useState([]);
    const [{user} , dispatch] = useStateValue();

    useEffect(()=>{
        db.collection("Rooms").onSnapshot((snapshot)=>
            setRooms(
                snapshot.docs.map((doc) =>({
                    id : doc.id,
                    data : doc.data(),
                }))
            ))
    } , [])
    return (

        <div className = "sidebar">
            <div className = "sidebar_header" >

                <Avatar src = {user?.photoURL}/>
                <div className = "sidebar_headerRight" >
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                    <Chat /> 
                    </IconButton>
                    <IconButton>
                        <MoreVert/>

                    </IconButton>

                </div>
            </div>
            <div className = "sidebar_search">

                <div className = "sidebar_searchContainer">

                    <SearchOutlined></SearchOutlined>
                    <input placeholder = "Search or start a new chat" type = "text"></input>
                    
                </div>

            </div>
            <div className = "sidebar_chats">
                <SidebarChat addNewChat = {true}/>

                {rooms.map((room) =>(
                    
                    <SidebarChat key = {room.id} id = {room.id}  name = {room.data.name}/>
                ))}

            </div>
        </div>
    )
}

export default Sidebar
