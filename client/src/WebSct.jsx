import {useState, useEffect, useRef} from 'react'
import axios from 'axios'

// axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-transform'
// axios.defaults.headers.get['Pragma'] = 'no-cache'
// axios.defaults.headers.get['Expires'] = '0'

// axios.defaults.headers.post['Cache-Control'] = 'no-cache, no-transform'
// axios.defaults.headers.post['Pragma'] = 'no-cache'
// axios.defaults.headers.post['Expires'] = '0'

const WebSct = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const [userName, setUserName] = useState('')

    function connect () {
        socket.current = new WebSocket('ws://localhost:5000')
        
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                userName,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            console.log('Connection is OK!')
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Socket was closed')
        }

        socket.current.onerror = () => {
            console.log('Socket error!')
        } 
    }


    const sendMessage = async () => {
        if (value) {
            const message = {
                userName,
                message: value,
                id: Date.now(),
                event: 'message'
            }

            socket.current.send(JSON.stringify(message))
            setValue('')
        }
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input type="text" placeholder="Enter your name" value={userName} onChange={(event) => setUserName(event.target.value)}></input>
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <h1>Web socket</h1>
                    <input type="text" value={value} onChange={(event) => setValue(event.target.value)}></input>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {
                        messages.map(message => (
                            <div key={message.id}>
                                {
                                    message.event === 'connection'
                                    ? <div className="connection_message">User {message.userName} connected!</div>
                                    : <div className="message">[{message.userName}]: {message.message}</div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WebSct