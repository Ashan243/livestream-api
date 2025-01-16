import io from "socket.io"


type VideoStreamData = {
    videoStreamPackets: ArrayBuffer
    message: string
}
enum Reason {
    SIGNAL_FAILED = "sg",
    MANUAL_DISCONNECTION = "mg"
}

export interface ClientToServerEvents{

    videoStream: (VideoStreamData: any) => void;
    chatMessage: (message: string) => void
    disconnectManual: (reason?: Reason ) => void
}

export interface ServerToClientEvents{
    videoStream: (VideoStreamData: any) => void;
    chatMessage: (message: string) => void
    disconnectManual: (reason?: Reason ) => void
}
