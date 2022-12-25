import { Avatar, IconButton } from '@material-ui/core'
import { MoreVert, SearchOutlined , Mic, AttachFile  } from '@material-ui/icons';
import React  ,{useState , useEffect} from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import {useParams} from "react-router-dom";
import db from "../firebase";
import "../css/Chat.css"
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
function Chat() {
    const [seed , setSeed] = useState('');
    const [input , setInput] = useState('');
    const [messages , setMessages] = useState([]);

    const [roomName , setRoomName] = useState('');
    const [{user} , dispatch] = useStateValue();
    const {roomId} = useParams();
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    } , [roomId])

    useEffect(()=>{

        if(roomId){
            
            db.collection("Rooms").doc(roomId).onSnapshot((snapshot)=> setRoomName(snapshot.data().name));
            db.collection("Rooms").doc(roomId).collection("messages").orderBy('timestamp' , 'asc').onSnapshot((snapshot)=>{
              return setMessages(snapshot.docs.map(doc =>{
                  return doc.data();
              }))  
            })
        }

    } , [roomId]); 
    
    const sendMessage = (e)=>{

        e.preventDefault();
        console.log("You have typed -> ",input);
        if(input.length > 0){
            db.collection("Rooms").doc(roomId).collection("messages").add({
                name : user.displayName,
                message: input,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
    
            })
        }
        setInput('');
    }

    return (
        <div className = "chat">
            <div className = "chat_header">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className = "chat_headerInfo">
                    <h3> {roomName}</h3>
                    <p>Last seen at  {messages.length >0 ? new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString(undefined, {
                    timeZone: "Asia/Kolkata" 
                }) : ""}</p>

                </div>
                <div className ='chat_headerRight' >
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    
                    <IconButton>
                        <MoreVert/>

                    </IconButton>

                </div>

            </div>
            <div className = "chat_body" >
            {messages.map((message)=>{
                return (
                    <p className = {`chat_message ${message.name === user.displayName&&"chat_reciever"}`}>
                    <span className = "chat_name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className = "chat_timestamp">{new Date(message.timestamp?.toDate()).toLocaleString(undefined, {
                    timeZone: "Asia/Kolkata" 
                })}</span>
                    </p>

                )
            })}
            </div>
                

            <div className = "chat_footer">
            <IconButton>
                <InsertEmoticonIcon/>
            </IconButton>
            <IconButton>
                <AttachFile/>

            </IconButton>
                <form className = "chat_footerText" >
                    <input type = "text" value = {input}  onChange = {(e)=>{
                        setInput(e.target.value);
                    }} placeholder = "Start typing something">

                    </input>
                    <button onClick ={sendMessage}  type = "submit">Send a message</button>
                </form>
                <IconButton>

                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
