import io from "socket.io"


export interface ClientToServerEvents{

    joinRoom: (roomId: string) => void;
    sendSignal: (data: {to: string, signal: any}) => void

}

export interface ServerToClientEvents{
    userJoined: (userId: string) => void
    receiveSignal: (data: {from: string; signal: any}) => void

}
