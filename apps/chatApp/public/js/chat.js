const socket = io()
// const socket = io('http://localhost:3000/chatApp');
// const io = require('socket.io-client');



// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count)
// })

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages') // location to render template

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML // to render templates correctly
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true}) 

const autoscroll = () => {
    // New messafe element
    const $newMessage = $messages.lastElementChild //grab element as a child which would be the newest message

    //Height of the last message
    const newMessageStyles = getComputedStyle($newMessage) //get the value of margin spacing
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin //offsetHeight read-only property returns the height of an element


    // console.log(newMessageStyles)

    //Visible height
    const visibleHeight = $messages.offsetHeight
    
    // Height of messages container
    const containerHeight = $messages.scrollHeight // total height are able to scroll

    //How far have i scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight // scrollTop return the amount of dictance we've scrolled from the top of the content to the topp of scrollbar

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
} 

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, { //html store the final html will be render in the browser
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html) // allow to insert other html adjacent to the element have selected in a message
    autoscroll()
})

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })
socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ room, users }) => {
    console.log(room)
    console.log(users)
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')
    //disable
    const message = e.target.elements.message.value
 
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable
        
        if(error) {
            return console.log(error)
        }
        
        console.log('Message delivered!')
    })
    // socket.emit('sendMessage', message, (message) => {
    //     console.log('The message was delivered!', message)
    // })
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    $sendLocationButton.setAttribute('disable', 'disable')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('sendlocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if(error) {
        alert(error)
        location.href='/'
    }
})