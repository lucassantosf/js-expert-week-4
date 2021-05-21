import Atendee from "./atendee.js"

export default class Room{
    constructor({id, topic, atendeesCount, speakersCount, featuredAttendees, owner, users}){
        this.id = id 
        this.topic = topic 
        this.atendeesCount = atendeesCount 
        this.speakersCount = speakersCount 
        this.featuredAttendees = featuredAttendees?.map(attendee => new Atendee(attendee)) 
        this.owner = new Atendee(owner) 
        this.users = users
    }
}