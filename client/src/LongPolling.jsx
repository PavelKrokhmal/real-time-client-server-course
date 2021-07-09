import React, {useState, useEffect} from 'react'
import axios from 'axios'

axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-transform'
axios.defaults.headers.get['Pragma'] = 'no-cache'
axios.defaults.headers.get['Expires'] = '0'

axios.defaults.headers.post['Cache-Control'] = 'no-cache, no-transform'
axios.defaults.headers.post['Pragma'] = 'no-cache'
axios.defaults.headers.post['Expires'] = '0'

function LongPulling() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
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

export default LongPulling
