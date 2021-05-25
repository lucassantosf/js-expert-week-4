import Atendee from "../entities/atendee.js"
import Room from "../entities/room.js"
import { constants } from "../util/constants.js"

export default class LobbyController {
    #users = new Map()

    constructor({activeRooms, roomsListener}) {
        this.activeRooms = activeRooms
        this.roomsListener = roomsListener
     }

    onNewConnection(socket) {
        const { id } = socket
        console.log('[lobby] connection stablished with', id) 
    }

    #updateLobbyRooms(socket,activeRooms){
        socket.emit(constants.event.LOBBY_UPDATED,activeRooms)
    }

    // disconnect(socket){
    //     console.log('disconnect!!!',socket.id)
    //     this.#logoutUser(socket)
    // }

    // #logoutUser(socket){
    //     const userId = socket.id
    //     const user = this.#users.get(userId)
    //     const roomId = user.roomId
        
    //     //remover user da lista de usuarios ativos
    //     this.#users.delete(userId)

    //     //caso seja um usuario sujeira que estava em uma sala que nao mais existe
    //     if(!this.rooms.has(roomId)){
    //         return;
    //     }

    //     const room = this.rooms.get(roomId)
    //     const toBeRemoved = [...room.users].find(({id})=>id===userId)
        
    //     //remove o usuario da sala
    //     room.users.delete(toBeRemoved)

    //     //senao tiver mais nenhum usuario na sala, a sala morre
    //     if(!room.users.size){
    //         this.rooms.delete(roomId)
    //         return 
    //     }

    //     const disconnectedUserWasAnOwner = userId === room.owner.id
    //     const onlyOneUserLeft = room.users.size === 1   

    //     //validar se tem somente 1 usuario ou se o usuario era o dono da sala
    //     if(onlyOneUserLeft || disconnectedUserWasAnOwner){
    //         room.owner = this.#getNewRoomOwner(room,socket)
    //     }

    //     //atualiza a room no final
    //     this.rooms.set(roomId,room)

    //     //notifica a sala que o usuario se desconectou
    //     socket.to(roomId).emit(constants.event.USER_DISCONNECTED, user)
    // }

    // #notifyUserProfileUpgrade(socket,roomId,user){
    //     socket.to(roomId).emit(constants.event.UPGRADE_USER_PERMISSION,user)
    // }

    // #getNewRoomOwner(room,socket){
    //     const users = [...room.users.values()]
    //     const activeSpeakers = users.find(user=>user.isSpeaker)
    //     //se quem desconectou era o dono, passa a lideranca para o proximo
    //     //senao houvers speakers, ele pega o attendee mais antigo (primeira posicao)
    //     const [newOwner] = activeSpeakers ? [activeSpeakers] : users
    //     newOwner.isSpeaker = true

    //     const outdatedUser = this.#users.get(newOwner.id)
    //     const updatedUser = new Attendee({
    //         ...outdatedUser,
    //         ...newOwner,
    //     })

    //     this.#users.set(newOwner.id,updatedUser)

    //     this.#notifyUserProfileUpgrade(socket,room.id,newOwner)

    //     return newOwner
    // }


    // joinRoom(socket, { user, room }) {
    //     const userId = user.id = socket.id
    //     const roomId = room.id

    //     const updatedUserData = this.#updateGlobalUserData(
    //         userId, 
    //         user, 
    //         roomId
    //     )        
    //     const updatedRoom = this.#joinUserRoom(socket,updatedUserData,room)       
    //     this.#notifyUsersOnRoom(socket,roomId,updatedUserData)
    //     this.#replyWithActiveUsers(socket,updatedRoom.users)
    // }

    // #replyWithActiveUsers(socket,users){
    //     const event = constants.event.LOBBY_UPDATED
    //     socket.emit(event,[...users.values()])
    // }

    // #notifyUsersOnRoom(socket,roomId,user){
    //     const event = constants.event.USER_CONNECTED
    //     socket.to(roomId).emit(event,user)
    // }

    // #joinUserRoom(socket,user,room){
    //     const roomId = room.id
    //     const existingRoom = this.rooms.has(roomId)
    //     const currentRoom = existingRoom ? this.rooms.get(roomId) : {}
    //     const currentUser = new Atendee({
    //         ...user,
    //         roomId
    //     })

    //     //definir quem é o dono da sala
    //     const [owner,users] = existingRoom ? 
    //         [currentRoom.owner,currentRoom.users]:
    //         [currentUser, new Set()]  

    //     const updatedRoom = this.#mapRoom({
    //         ...currentRoom,
    //         ...room,
    //         owner,
    //         users: new Set([...users,...[currentUser]])
    //     })

    //     this.rooms.set(roomId,updatedRoom)
    //     socket.join(roomId)

    //     return this.rooms.get(roomId)
    // }

    // #mapRoom(room){
    //     const users = [...room.users.values()]
    //     const speakersCount = users.filter(user=>user.isSpeaker).length
    //     const featuredAttendees = users.slice(0,3)
    //     const mappedRoom = new Room({
    //         ...room,
    //         featuredAttendees,
    //         speakersCount,
    //         atendeesCount:room.users.size
    //     })
    //     return mappedRoom
    // }


    // #updateGlobalUserData(userId, userData = {}, roomId = '') { 
    //     const user = this.#users.get(userId) ?? {}
    //     const existingRoom = this.rooms.has(roomId)

    //     const updatedUserData = new Atendee({
    //         ...user,
    //         ...userData,
    //         roomId,
    //         //se for o unico na sala
    //         isSpeaker: !existingRoom
    //     })

    //     this.#users.set(userId,updatedUserData)

    //     return this.#users.get(userId)
    // }

    getEvents() {
        const functions = Reflect.ownKeys(LobbyController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => [name, this[name].bind(this)])

        return new Map(functions)
    }
}