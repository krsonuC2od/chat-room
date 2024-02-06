import React from "react";
import { useEffect , useState , useMemo} from 'react'
import {io} from "socket.io-client"
import {Container , TextField, Typography,Button, Stack,IconButton,Paper,Box } from '@mui/material'
// import { Box, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Home = () => {

  const [message , setMessage] = useState('');
  const [room , setRoom] = useState('');
  const [roomName , setRoomName] = useState('');
  const [socketID, setSocketID] = useState('');
  const [messages,setMessages]=useState([]);



  const socket = useMemo(()=>io("http://localhost:9090"),[]);
  useEffect(()=>{
    socket.on("connect",()=>{
      setSocketID(socket.id);
      console.log("connected",socket.id)
    })
     socket.on("receive-message",(msg)=>{
      setMessages((messages)=>[...messages,msg])
      console.log(msg);
     })

    socket.on('welcome',(m)=>{
      console.log(m)
    })

    socket.on('join-room',(room)=>{
      setRoomName(room);
    })
    return () =>{
      socket.disconnect();
    }
  },[])

  // handle form data
  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit('message',  {message,room});
    setMessage("")
  }

  //handle join room
  const handleJoinRoom = (e)=>{
    e.preventDefault()
    socket.emit('join-room',roomName)
    setRoomName("");
  }
  return (
    <Container maxWidth="sm" >
    
    <Typography variant='h5' component="div" >Room Id : {socketID}</Typography>
    <Box
        flex="1"
        overflow="auto"
        marginBottom="10px"
        padding="10px"
        component={Paper}
      >
        {/* Chat messages go here */}
        <div>
          <div>User 1: Hello!</div>
          <div>User 2: Hi there!</div>
          {/* Add more messages as needed */}
          <Stack>
          {messages.map((m,i)=>(
            <Typography variant='p' component="div" >{m}</Typography>
      ))}
        </Stack>
        </div>
      </Box>
    <form onSubmit={handleJoinRoom}>
    <h5>Join Room</h5>
    <TextField label="Room name" value={roomName} onChange={(e)=>{setRoomName(e.target.value)}} ></TextField>
    <Button type="submit" variant="contained" color="primary">Join</Button>
    
    </form>

    <form onSubmit={handleSubmit}>
    <TextField label="Type a message..." value={message} onChange={(e)=>{setMessage(e.target.value)}} ></TextField>
    <TextField label="Room ID..." value={room} onChange={(e)=>{setRoom(e.target.value)}} ></TextField>
    
    <IconButton type="submit" color="primary" aria-label="Send">
        <SendIcon />
       </IconButton>
    </form>
   
    
    </Container>
  
  )
}

export default Home;
