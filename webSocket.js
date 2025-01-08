const WebSocket = require('ws')
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')


let webSocketServer


const initializeSocket = (server) => {
    webSocketServer = new WebSocket.Server({ server })

    webSocketServer.on('connection', (ws) => {
        console.log('Client Connected')

        ws.on('message', async (msg) => {
            try {
                const data = JSON.parse(msg)
                if (data.event == 'join') {
                    const { userId, userType } = data

                    if (userType == 'user') {
                        await userModel.findByIdAndUpdate(userId, { socketId: ws.id })
                    }
                    else if (userType == 'captain') {
                        await captainModel.findByIdAndUpdate(userId, { socketId: ws.id })
                    }
                }
                else if (data.event == 'update-location-captain') {
                    const { userId, location } = data

                    if (!location || !location.latitude || !location.longitude) {
                        return ws.send(JSON.stringify({ event: 'error', message: 'Invalid Location data' }))
                    }
                    await captainModel.findByIdAndUpdate(userId, {
                        location: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    })
                }
            } catch (error) {
                console.error('Error handling message:', error);
                ws.send(JSON.stringify({ event: 'error', message: 'Invalid message format' }));

            }
        })

        ws.on('close', () => {
            console.log('Client disconnected')
        })
    })
}


const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject)
    if (webSocketServer) {
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.id === socketId) {
                client.send(JSON.stringify(messageObject))
            }
        })
    } else {
        console.log("websocket server not initialized")
    }
}

module.exports = { initializeSocket, sendMessageToSocketId }