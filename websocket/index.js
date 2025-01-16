"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const errorcodes_1 = __importDefault(require("./utils/errorcodes"));
//List of subscribe events
var SubscribeEvents;
(function (SubscribeEvents) {
    SubscribeEvents["JOIN"] = "join";
    SubscribeEvents["LEAVE"] = "leave";
    SubscribeEvents["CREATE_ROOM"] = "createRoom";
})(SubscribeEvents || (SubscribeEvents = {}));
//Iniitial Code 
const server = new ws_1.default.WebSocketServer({ port: 3000 }); // Creates a new instance of the Websocket Server 
const clients = []; //Client Websocket Object Array
///The Connection event listener that listens for new client side users join the websocket server
//On connect we would write all of the code that happen to a client to prepare or server usage
server.on("connection", (ws, req) => {
    //Verify a user
    const authToken = req.headers["x-token"];
    if (!authToken) {
        //Log error with winston
        //Connect datadog api here to pick up on error
        //emit data to client for the UI logic render for UX
        ws.close(errorcodes_1.default.NO_AUTH_TOKEN);
    }
    //req.header["x-forward-to"] 
    console.log("Client has connected");
    const client = { ws, subscribedEvents: new Set() }; //Create a new client object for each new users
    clients.push(client); //Push each new client to our clients array i.e the list of people connected to the websocket server
});
server.on("");
