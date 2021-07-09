const express = require('express')
const cors = require('cors')
const events = require('events')

const PORT = process.env.PORT || 5000

const emitter = new events.EventEmitter()

const app = express()

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/new-messages', (req, res) => {
    const message = req.body
    emitter.emit('newMessage', message)
    res.status(200)

})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})