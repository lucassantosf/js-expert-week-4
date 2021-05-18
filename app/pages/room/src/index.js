import { constants } from "../../_shared/constants.js"
import SocketBuilder from "../../_shared/socketBuilder.js"

const socketBuilder = new SocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.room
})

const socket = socketBuilder
    .setOnUserConnected((user)=>console.log('user connected',user))
    .setOnUserDisconnected((user)=>console.log('user disconnected',user))
    .build()


const room = {
    id: Date.now(),
    topic: 'Js Expert'
}

const user = {
    username: 'lucas ferreira',
    img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-256.png' 
}

socket.emit(constants.events.JOIN_ROOM, {user,room})
