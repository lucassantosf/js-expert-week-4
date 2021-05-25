import Attendee from "./entities/attendee.js"
import getTemplate from "./templates/attendeeTemplate.js"

const imgUser = document.getElementById("imgUser")
const roomTopic = document.getElementById("pTopic")
const gridAttendees = document.getElementById("gridAttendees")
const gridSpeakers = document.getElementById("gridSpeakers")

export default class View{
    static updateUserImage({ img, username }){
        imgUser.src = img
        imgUser.alt = username
    }
    
    static updateRoomTopic({ topic }){
        roomTopic.innerHTML = topic
    }
    
    static updateAttendeesOnGrid(users){
        users.forEach(item=>View.addAttendeeOnGrid(item))
    } 

    static _getExistingItemOnGrid({id,baseElement = document}){
        const existingItem = baseElement.querySelector(`[id="${id}"]`)
        return existingItem
    }
    
    static removeItemFromGrid(id){
        const existingElement = View._getExistingItemOnGrid({id})
        existingElement?.remove()
    }

    static addAttendeeOnGrid(item, removeFirst = false){
        const attendee = new Attendee(item)
        const id = attendee.id
        const htmlTemplate = getTemplate(attendee)
        const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees
 
        if(removeFirst){
            View.removeItemFromGrid(id)
            baseElement.innerHTML += htmlTemplate
            return;
        }

        const existingItem = View._getExistingItemOnGrid({id, baseElement})
        if(existingItem){
            existingItem.innerHTML = htmlTemplate
            return;
        }

        baseElement.innerHTML += htmlTemplate

    }
}


{/* <div class="room-card__user">
        <div class="room-card__user__img">
            <img src="./../../assets/avatars/ivete-souza.png" alt="Ivete Souza">
        </div>
        <p class="room-card__user__name">
        Ivete Souza
        </p>
    </div> */}