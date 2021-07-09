import {useState, useEffect} from 'react'
import axios from 'axios'

// axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-transform'
// axios.defaults.headers.get['Pragma'] = 'no-cache'
// axios.defaults.headers.get['Expires'] = '0'

// axios.defaults.headers.post['Cache-Control'] = 'no-cache, no-transform'
// axios.defaults.headers.post['Pragma'] = 'no-cache'
// axios.defaults.headers.post['Expires'] = '0'

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {

        const eS = new EventSource(`http://localhost:5000/connect`)
        eS.onmessage = function (event) {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
    }

    const sendMessage = async () => {
        if (value) {
            await axios.post('http://localhost:5000/new-messages', {
                message: value,
                id: Date.now()
            }, {timeout: 3000})
        }
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <h1>Event source</h1>
                    <input type="text" value={value} onChange={(event) => setValue(event.target.value)}></input>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {
                        messages.map(message => (
                            <div className="message" key={message.id}>
                                {message.message}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EventSourcing
