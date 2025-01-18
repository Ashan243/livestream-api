import io from "socket.io"



export type ClientSignal = {to: string, signal: any}
export type RecieveSignal = {from: string, signal: any}
export interface ClientToServerEvents{
    joinRoom: (roomId: string) => void;
    sendSignal: (data: ClientSignal) => void
}

export interface ServerToClientEvents{
    userJoined: (userId: string) => void
    receiveSignal: (data: RecieveSignal) => void

}
