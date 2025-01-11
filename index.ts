import ws from "ws"


//List of subscribe events
enum SubscribeEvents {
    JOIN = "join",
    LEAVE = "leave",
    CREATE_ROOM = "createRoom"
}

interface IClient {
    ws: WebSocket; // Websocket for User
    subscribedEvents: Set<SubscribeEvents> //Store Subscribed events
}
//Iniitial Code 
const server = new ws.WebSocketServer({port:3000}) // Creates a new instance of the Websocket Server 
const clients: IClient[] = [] //Client Websocket Object Array



///The Connection event listener that listens for new client side users join the websocket server
server.on("connection", (ws: WebSocket) =>{
    console.log("Client has connected")

    const client: IClient = {ws, subscribedEvents: new Set() } //Create a new client object for each new users
    clients.push(client) //Push each new client to our clients array i.e the list of people connected to the websocket server

})



