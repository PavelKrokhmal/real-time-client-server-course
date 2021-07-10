const ws = require('ws')

const PORT = process.env.PORT || 5000

const wsServer = new ws.Server({
    port: PORT,
}, () => {
    console.log('Server started on port: ' + PORT)
})


wsServer.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'connection':
                broadcastMessage(message)
                break;
            case 'message':
                broadcastMessage(message)       
                break;
            default:
                break;
        }
    })
})

function broadcastMessage(message) {
    wsServer.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}