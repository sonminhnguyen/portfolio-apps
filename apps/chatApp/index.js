const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./src/utils/messages')
const { addUser, removeUser, getUser,getUsersInRoom } = require('./src/utils/user')
const { getuid } = require('process')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3001
const publicDirectoryPath = path.join(__dirname, './public')

app.use(express.static(publicDirectoryPath))

// let count = 0 

io.on('connection', (socket) => { 
    // console.log('New WebSocket connection')

    // socket.emit('message', 'Welcome!')
    
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options}) //unique identifier for that particular connection

        if (error) {
            return callback(error)
        }

        socket.join(user.room) //socket.join allow to join a given chat room

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()

        //socket.emit, io.emit, socket.broadcast.emit    send to every room
        //io.to.emit, socket.broadcast.to.emit     send only to client on a room
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
        // callback('Delivered!')
    })

    socket.on('sendlocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     // socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })
})
server.listen(3001);
module.exports = app