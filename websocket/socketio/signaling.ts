import { Socket } from "socket.io";



//Two or more people speaking to each other in the same server
export const handlingSignalingServices = (socket: Socket) => {

    //Offer - Initialising a coversation for
    socket.on("offer", (data) => {
        console.log("Offer is received", data)
        socket.broadcast.emit("offer", data)
    })

    //Answer = When the other party(ies) except the offer
    socket.on("answer", (data) => {
        socket.broadcast.emit("answer", data)
    })

    //ICE Candidate
    socket.on("ice-candidate", (data) => {
        socket.emit("ice-candidate", data)
        
    })


}